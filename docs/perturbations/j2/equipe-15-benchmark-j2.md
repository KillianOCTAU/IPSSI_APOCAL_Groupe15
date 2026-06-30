# Benchmark LLM - Perturbation J2
**Projet EduTutor IA · Équipe 15 · Semaine APOCAL'IPSSI 2026**

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 15 |
| **Membres** | Yoann CURTY, Zouayobo DALI, Killian OCTAU, Antoine BLAIN, Maxence GIROUD, Hyndi FANNIR, BOUYABRI Mohamed |
| **Perturbation** | J2 - Latence inacceptable |
| **Date** | 01/07/2026 |
| **Version** | v1.0 |

---

## 1. Contexte

Le mardi 01/07/2026 à 10h00, le PO a transmis le retour suivant d'un beta-testeur :

> « J'ai uploadé mon cours d'algorithmie. J'ai attendu 45 secondes pour avoir 10 questions. Pendant ce temps j'ai cru que le site était cassé. J'ai failli partir. »

Le modèle en production est `llama3.1:8b` via Ollama local. L'objectif du benchmark est de trouver un modèle alternatif ramenant la latence **sous 15 secondes** sur le même cours de référence, sans sortir du périmètre Ollama local (contrainte RGPD et stack imposée).

---

## 2. Protocole

| Paramètre | Valeur |
|---|---|
| **Endpoint testé** | `POST /api/llm/generate-quiz/` |
| **Cours de référence** | Cours algorithmie (tri rapide, complexité O(n log n)) · ~500 mots |
| **Nombre de runs** | 5 runs par modèle |
| **Environnement** | CPU 8 cœurs · 16 Go RAM · Ollama via Docker · pas de GPU dédié |
| **Métriques** | Latence wall-clock en secondes · p50 = médiane · p95 = 95e percentile |
| **Qualité** | Score /10 basé sur 50 questions générées (factualité + clarté + ambiguïté) |
| **Modèles testés** | `llama3.1:8b` (baseline), `llama3.2:3b`, `phi3:mini` |

---

## 3. Résultats

### 3.1 Tableau récapitulatif

| Modèle | Taille | p50 (s) | p95 (s) | RAM | Qualité /10 | Verdict |
|---|---|---|---|---|---|---|
| `llama3.1:8b` *(baseline)* | 8B | **~42 s** | ~58 s | ~5 Go | 8.2 | ❌ Trop lent |
| `llama3.2:3b` | 3B | ~14 s | ~19 s | ~2 Go | 6.9 | ⚠️ Limite |
| `phi3:mini` | 3.8B | **~11 s** | ~16 s | ~2.3 Go | 7.6 | ✅ Retenu |

### 3.2 Détail des runs par modèle

**`llama3.1:8b` - baseline**

| Run | Latence (s) |
|---|---|
| Run 1 | 44 |
| Run 2 | 41 |
| Run 3 | 58 |
| Run 4 | 39 |
| Run 5 | 43 |
| **p50** | **42** |
| **p95** | **58** |

**`llama3.2:3b`**

| Run | Latence (s) |
|---|---|
| Run 1 | 15 |
| Run 2 | 13 |
| Run 3 | 19 |
| Run 4 | 12 |
| Run 5 | 14 |
| **p50** | **14** |
| **p95** | **19** |

**`phi3:mini`**

| Run | Latence (s) |
|---|---|
| Run 1 | 12 |
| Run 2 | 11 |
| Run 3 | 16 |
| Run 4 | 10 |
| Run 5 | 11 |
| **p50** | **11** |
| **p95** | **16** |

---

## 4. Analyse des trade-offs

| Critère | `llama3.1:8b` | `llama3.2:3b` | `phi3:mini` |
|---|---|---|---|
| Latence p50 | ❌ 42 s | ⚠️ 14 s | ✅ 11 s |
| Latence p95 | ❌ 58 s | ❌ 19 s | ⚠️ 16 s |
| Qualité /10 | ✅ 8.2 | ❌ 6.9 | ✅ 7.6 |
| RAM | ❌ 5 Go | ✅ 2 Go | ✅ 2.3 Go |
| Effort migration | - | Faible | Faible |

**Verdict** : `phi3:mini` offre le meilleur ratio latence/qualité. `llama3.2:3b` dépasse la cible p95 (19 s > 15 s) et dégrade davantage la qualité (6.9 vs 7.6). Décision documentée dans ADR-0002.


