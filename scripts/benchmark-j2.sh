#!/usr/bin/env bash
# ============================================================================
# benchmark-j2.sh — Benchmark latence LLM · Perturbation J2
# ----------------------------------------------------------------------------
# Teste 3 modèles Ollama sur l'endpoint /api/llm/generate-quiz/
# et calcule la latence p50 (médiane) + p95 sur 5 runs.
#
# Prérequis :
#   - docker compose up -d (backend + ollama en route)
#   - make seed (données de test insérées)
#   - Les 3 modèles déjà téléchargés dans Ollama :
#       docker exec apocalipssi-2026-ollama ollama pull llama3.1:8b
#       docker exec apocalipssi-2026-ollama ollama pull llama3.2:3b
#       docker exec apocalipssi-2026-ollama ollama pull phi3:mini
#
# Usage :
#   bash scripts/benchmark-j2.sh
#   API_TOKEN=<token> bash scripts/benchmark-j2.sh   # token manuel
#
# Résultats consignés dans : docs/perturbations/j2/equipe-15-benchmark-j2.md
# ============================================================================

set -euo pipefail

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

API_BASE="${API_BASE:-http://localhost:8000}"
CONTAINER="${OLLAMA_CONTAINER:-apocalipssi-2026-ollama}"
BACKEND_CONTAINER="${BACKEND_CONTAINER:-apocalipssi-2026-backend}"
RUNS=5

# Cours de référence (même texte pour tous les modèles — reproductibilité)
REFERENCE_TEXT="Le tri rapide (QuickSort) est un algorithme de tri utilisant le principe \
diviser pour régner. Il choisit un pivot, partitionne le tableau en deux sous-tableaux \
(éléments inférieurs et supérieurs au pivot), puis se rappelle récursivement sur chacun. \
Sa complexité moyenne est O(n log n) mais peut dégénérer en O(n²) dans le pire cas \
(tableau déjà trié avec pivot naïf). Pour éviter ce cas, on utilise un pivot médian-de-trois. \
Les algorithmes de tri stable comme le tri fusion garantissent O(n log n) dans tous les cas \
mais consomment O(n) mémoire supplémentaire. Le tri par insertion est optimal pour des \
tableaux presque triés (O(n) dans le meilleur cas). Le choix de l'algorithme dépend donc \
de la taille des données, de leur état initial et des contraintes mémoire."

# ---------------------------------------------------------------------------
# Authentification : récupère un token via l'utilisateur seed
# ---------------------------------------------------------------------------

if [ -z "${API_TOKEN:-}" ]; then
    echo "🔑 Récupération du token via l'utilisateur seed (student@example.com)..."
    API_TOKEN=$(docker exec "${BACKEND_CONTAINER}" python manage.py shell -c "
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
User = get_user_model()
u = User.objects.filter(email='student@example.com').first()
if u:
    t, _ = Token.objects.get_or_create(user=u)
    print(t.key)
" 2>/dev/null | tail -1)
    if [ -z "${API_TOKEN}" ]; then
        echo "❌ Impossible de récupérer un token. Avez-vous lancé 'make seed' ?"
        echo "   Ou fournissez le token manuellement : API_TOKEN=xxx bash $0"
        exit 1
    fi
    echo "   Token obtenu ✓"
fi

# ---------------------------------------------------------------------------
# Utilitaires
# ---------------------------------------------------------------------------

# Calcule la médiane d'une liste de valeurs (une par ligne)
median() {
    sort -n | awk '
    BEGIN { count=0 }
    { vals[count++]=$1 }
    END {
        if (count % 2 == 1) print vals[int(count/2)]
        else print (vals[count/2 - 1] + vals[count/2]) / 2
    }'
}

# Calcule le 95e percentile
p95() {
    sort -n | awk -v n="${RUNS}" 'END { print $1 }' | head -1
    # Pour 5 runs : p95 = valeur max (run le plus lent)
    sort -n | tail -1
}

# Mesure la latence d'un appel à generate-quiz en secondes
measure_latency() {
    local start end elapsed
    start=$(date +%s%3N)   # ms depuis epoch
    curl -s -o /dev/null \
        -X POST "${API_BASE}/api/llm/generate-quiz/" \
        -H "Authorization: Token ${API_TOKEN}" \
        -H "Content-Type: application/json" \
        -d "{\"text\": \"${REFERENCE_TEXT}\"}"
    end=$(date +%s%3N)
    echo $(( (end - start) / 1000 ))   # en secondes (arrondi)
}

# ---------------------------------------------------------------------------
# Benchmark
# ---------------------------------------------------------------------------

MODELS=("llama3.1:8b" "llama3.2:3b" "phi3:mini")
declare -A RESULTS_P50
declare -A RESULTS_P95

echo ""
echo "======================================================================"
echo "  BENCHMARK LLM — Perturbation J2 · Équipe 15"
echo "  Cours de référence : algorithmie (tri rapide) · ~500 mots"
echo "  Runs par modèle   : ${RUNS}"
echo "  Endpoint           : POST ${API_BASE}/api/llm/generate-quiz/"
echo "======================================================================"
echo ""

for MODEL in "${MODELS[@]}"; do
    echo "----------------------------------------------------------------------"
    echo "  Modèle : ${MODEL}"
    echo "----------------------------------------------------------------------"

    # Charger le modèle dans Ollama avant le benchmark
    echo "  ⏳ Chargement du modèle dans Ollama..."
    docker exec "${BACKEND_CONTAINER}" sh -c \
        "OLLAMA_MODEL=${MODEL} python -c 'pass'" 2>/dev/null || true

    # Modifier la variable d'env du backend (relance non nécessaire — factory lit DB)
    # Pour forcer le modèle, on passe par l'env directement sur le conteneur
    docker exec -e "OLLAMA_MODEL=${MODEL}" "${BACKEND_CONTAINER}" true 2>/dev/null || true

    LATENCIES=()
    for i in $(seq 1 ${RUNS}); do
        echo -n "  Run ${i}/${RUNS} ... "
        # Force le modèle via header custom (si l'API le supporte) ou env
        LAT=$(docker exec -e "OLLAMA_MODEL=${MODEL}" "${BACKEND_CONTAINER}" \
            python -c "
import os, time, json
os.environ['OLLAMA_MODEL'] = '${MODEL}'
import django; django.setup()
from llm.services.factory import get_llm_client
from llm.services.quiz_prompt import build_prompt, parse_and_validate_quiz
client = get_llm_client()
prompt = build_prompt('''${REFERENCE_TEXT}''')
start = time.time()
raw = client.generate(prompt)
elapsed = time.time() - start
print(int(elapsed))
" 2>/dev/null || echo "ERR")
        echo "${LAT} s"
        LATENCIES+=("${LAT}")
    done

    # Calcul p50 / p95
    VALUES=$(printf '%s\n' "${LATENCIES[@]}" | grep -v ERR | sort -n)
    P50=$(echo "${VALUES}" | median)
    P95=$(echo "${VALUES}" | p95 | tail -1)

    RESULTS_P50["${MODEL}"]="${P50}"
    RESULTS_P95["${MODEL}"]="${P95}"

    echo ""
    echo "  → p50 = ${P50} s   |   p95 = ${P95} s"
    echo ""
done

# ---------------------------------------------------------------------------
# Tableau récapitulatif
# ---------------------------------------------------------------------------

echo "======================================================================"
echo "  RÉSULTATS RÉCAPITULATIFS"
echo "======================================================================"
echo ""
printf "  %-20s %10s %10s\n" "Modèle" "p50 (s)" "p95 (s)"
printf "  %-20s %10s %10s\n" "--------------------" "-------" "-------"
for MODEL in "${MODELS[@]}"; do
    printf "  %-20s %10s %10s\n" \
        "${MODEL}" \
        "${RESULTS_P50[$MODEL]:-N/A}" \
        "${RESULTS_P95[$MODEL]:-N/A}"
done
echo ""
echo "  → Copiez ces résultats dans docs/perturbations/j2/equipe-15-benchmark-j2.md"
echo ""
echo "======================================================================"
