# ADR-0003 : Sécurisation anti-prompt injection sur la génération de QCM

**Projet EduTutor IA · Équipe 15 · Semaine APOCAL'IPSSI 2026**

---

## 1. Métadonnées

| Champ | Valeur |
|---|---|
| **Numéro** | ADR-0003 |
| **Titre** | Architecture défensive contre le prompt injection (perturbation J3) |
| **Statut** | Accepté |
| **Date** | 01/07/2026 |
| **Auteurs** | Killian OCTAU, Antoine BLAIN, Hyndi FANNIR · avec l'équipe 15 |
| **Version** | v1.0 |
| **Lié à** | [ADR-0002](./ADR-0002-migration-modele-llm-j2.md) - modèle `phi3:mini` plus sensible aux instructions adversariales |

---

## 2. Contexte

### 2.1 Situation factuelle

Le mercredi 01/07/2026 à 10h00, un beta-testeur a réussi une **prompt injection** via un cours uploadé.
Un paragraphe dissimulé (taille réduite, couleur proche du fond) demandait au LLM de toujours marquer
la réponse A comme correcte (`correct_index: 0`).

Résultat observé : **10 questions avec `correct_index = 0`** - score 10/10 garanti en cliquant
systématiquement sur A, sans maîtrise du cours.

### 2.2 Cause racine

Trois faiblesses cumulées dans le code pré-J3 :

1. **Fusion system + user** sur Ollama `/api/generate` : le cours et les consignes système formaient un seul bloc texte.
2. **Validation structurelle seule** dans `quiz_prompt.py` : 10 questions × 4 options validées, mais pas la plausibilité des `correct_index`.
3. **Aucun test adversarial en CI** : la faille n'était pas détectée automatiquement.

### 2.3 Contraintes

- Délai PO : patch livrable **avant Sprint Review** (mercredi soir)
- Pas de changement de fournisseur LLM (Ollama local, cf. ADR-0002)
- Effort estimé équipe : **~3 h** (hors rédaction doc)
- Le correctif doit s'appliquer à **tous** les clients LLM via `quiz_prompt.py` (principe DRY du kit)

---

## 3. Options envisagées

| Option | Description | Effort | Efficacité | Risque |
|---|---|---|---|---|
| A | Statu quo + documentation « usage responsable » | Nul | ❌ Nulle | Critique pour la crédibilité pédagogique |
| B | Durcissement du prompt système seul | Faible | Faible | Contournable par injections sophistiquées |
| C | **Prompt + séparation roles + validation post-LLM + retry** | Moyen | Bonne sur attaques naïves | Acceptable pour le MVP |
| D | Second LLM « juge » + sanitisation agressive du texte source | Élevé | Élevée | Hors délai sprint ; risque de tronquer du contenu pédagogique légitime |

---

## 4. Décision retenue

**Option C - architecture en 4 couches, centralisée dans `backend/llm/services/quiz_prompt.py`.**

### 4.1 Les 4 couches implémentées

| Couche | Mécanisme | Fichier |
|---|---|---|
| 1 | Séparation stricte `role: system` / `role: user` | `build_messages()` |
| 2 | Instructions défensives (cours = donnée non fiable) | `SYSTEM_PROMPT` |
| 3 | Validation stricte + heuristique anti-triche (`correct_index` uniforme) | `parse_and_validate_quiz()` |
| 4 | Retry automatique (max 2 nouvelles tentatives) | `generate_quiz_with_retry()` |

**Ollama** migre de `/api/generate` vers `/api/chat` pour bénéficier de la séparation system/user.
Les clients OpenAI-compatible héritent du même flux.

### 4.2 Tests et CI

- 5 scénarios adversariaux dans `backend/llm/tests/test_adversarial.py`
  (clair, blanc-sur-blanc, changement de rôle, injection JSON, encodage)
- Workflow dédié : `.github/workflows/adversarial-tests.yml` (pytest à chaque push)

### 4.3 Justification

- Option B insuffisante seule : un petit modèle (`phi3:mini`) peut encore obéir à une injection bien formulée.
- Option D reportée post-MVP : coût latence ×2 et complexité disproportionnée pour un sprint de 3 h.
- La couche 3 attrape l'attaque observée en J3 **même si le LLM a obéi** à l'injecteur.
- Factorisation dans `quiz_prompt.py` : un seul point de maintenance pour 9 backends LLM.

### 4.4 Mesures de mitigation des limites connues

- Heuristique `correct_index` : ne détecte pas une répartition équilibrée 3-3-2-2 (contournement possible).
- Documentées dans `docs/note_securite_J3.md` pour transparence jury.
- Revue ADR prévue si signalements > seuil (cf. KPIs).

---

## 5. Conséquences

### 5.1 Positives

- Attaque J3 reproduite → **rejetée** par la validation post-LLM
- Tests adversariaux automatisés en CI (exigence perturbation)
- Séparation system/user sur Ollama (alignement avec clients cloud)
- Retry limite les faux positifs ponctuels du petit modèle

### 5.2 Négatives

- Latence potentielle +0–22 s en cas de retries (3 appels max)
- Faux positifs possibles si le cours génère légitimement des questions très homogènes
- Injections sophistiquées (distribution équilibrée des `correct_index`) non couvertes
- `anthropic_client.py` et `gemini_client.py` n'utilisent pas encore `generate_quiz_with_retry()` (dettes techniques mineures)

---

## 6. KPIs à surveiller post-décision

| KPI | Seuil cible | Seuil d'alerte | Action si dépassement |
|---|---|---|---|
| Taux d'échec validation post-LLM | < 8 % | > 15 % sur 1 semaine | Audit prompt + assouplir heuristique si faux positifs |
| Latence p95 avec retries | < 25 s | > 40 s sur 3 jours | Réduire `MAX_LLM_RETRIES` ou optimiser modèle |
| Tests adversariaux CI | 100 % verts | 1 échec | Blocage merge jusqu'à correction |
| Signalements « quiz truqué » | 0 | ≥ 1 confirmé | Envisager ADR-0005 (LLM juge ou entropie minimale) |

**Date de revue ADR** : S+1 après mise en production, avec PO et référent sécurité équipe.

---

## Références

- Note de sécurité J3 : [`docs/note_securite_J3.md`](../note_securite_J3.md)
- Tutorial tests adversariaux : [`docs/04-testing.md`](../04-testing.md)
- Code : `backend/llm/services/quiz_prompt.py`, `backend/llm/tests/test_adversarial.py`
- ADR-0002 (modèle en service) : [`docs/adr/ADR-0002-migration-modele-llm-j2.md`](./ADR-0002-migration-modele-llm-j2.md)
