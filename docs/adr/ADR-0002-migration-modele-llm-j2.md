# ADR-0002 : Migration du modèle LLM - `llama3.1:8b` → `phi3:mini`

**Projet EduTutor IA · Équipe 15 · Semaine APOCAL'IPSSI 2026**

---

## 1. Métadonnées

| Champ | Valeur |
|---|---|
| **Numéro** | ADR-0002 |
| **Titre** | Migration du modèle LLM par défaut : `llama3.1:8b` → `phi3:mini` |
| **Statut** | Accepté |
| **Date** | 30/06/2026 |
| **Auteurs** | Killian OCTAU, Antoine BLAIN · avec l'équipe 15 |
| **Version** | v1.0 |
| **Supersedes** | [ADR-0001](./ADR-0001-choix-initial-llm.md) - Choix initial `llama3.1:8b` au cadrage |

---

## 2. Contexte

### 2.1 Situation factuelle

Le mardi 01/07/2026, le PO a transmis le retour beta-test suivant :

> « J'ai uploadé mon cours d'algorithmie. J'ai attendu 45 secondes pour avoir 10 questions.
> Pendant ce temps j'ai cru que le site était cassé. J'ai failli partir.
> Si chaque quiz est aussi long, c'est inutilisable. »

Mesures effectuées (benchmark J2, cf. `equipe-15-benchmark-j2.md`) :

- Latence **p50 (médiane) : ~42 s**
- Latence **p95 : ~58 s**
- Modèle en service : `llama3.1:8b` via Ollama local (ADR-0001)
- Engagement observé : taux d'abandon estimé élevé sur quiz > 30 s d'attente

### 2.2 Impact si on ne décide rien

- Persona enseignante Mme Sophie Lefèvre (28 étudiants) : inutilisable en contexte classe
- Persona étudiante Léa Martin : expérience brisée, abandon avant correction

### 2.3 Contraintes

- Stack imposée : **Ollama local uniquement** - aucune API externe autorisée (RGPD, coût)
- Cible de latence PO : **< 15 s** sur le cours de référence
- Qualité minimale acceptable : **≥ 7/10** (scoring subjectif sur 50 questions)
- Décision attendue avant Sprint Review
- Migration doit être réversible en < 5 minutes (rollback via variable d'env)

---

## 3. Options envisagées

| Option | Description | Latence p50 | Qualité /10 | RAM | Effort | Risque |
|---|---|---|---|---|---|---|
| A | Statu quo `llama3.1:8b` + spinner seul | ~42 s | 8.2 | 5 Go | Nul | ❌ Élevé : latence réelle inchangée, spinner ne suffit pas |
| B | `llama3.2:3b` (Meta, 3B) + spinner | ~14 s | 6.9 | 2 Go | Faible |  Moyen : p95 = 19 s > cible, qualité limite |
| C | `phi3:mini` (Microsoft, 3.8B) + spinner | ~11 s | 7.6 | 2.3 Go | Faible |  Faible : p50 sous cible, qualité acceptable |
| D | Optimisation prompt seul (`llama3.1:8b`) | ~34 s | 8.0 | 5 Go | Moyen | ❌ Gain ~20 %, insuffisant |

---

## 4. Décision retenue

**Option C : migration vers `phi3:mini` + ajout spinner React.**

Les deux mesures sont complémentaires : `phi3:mini` réduit la latence réelle (~42 s → ~11 s, gain 74 %),
le spinner réduit la latence perçue. Le spinner seul (Option A) ne résout pas le problème fondamental.

### 4.1 Justification

- **Seule option ramenant p50 sous la cible de 15 s** (11 s mesurés vs. 42 s baseline)
- **Qualité 7.6/10 ≥ seuil minimum** de 7/10 discuté en daily
- Option B (`llama3.2:3b`) écartée : qualité 6.9/10 insuffisante pour la persona enseignante Mme Lefèvre
  (questions ambiguës détectées sur 4/50 vs. 1/50 pour `phi3:mini`)
- Option D écartée : gain de 20 % laisse la latence à ~34 s, bien au-dessus de la cible
- **Effort de migration minimal** : changement de variable d'env `OLLAMA_MODEL` + `ollama pull phi3:mini`
  (~30 min), zéro modification Python/React côté backend

### 4.2 Mesures de mitigation

- **Feature flag** : `OLLAMA_MODEL=phi3:mini` dans `.env` - rollback en 5 min vers `llama3.1:8b` si nécessaire
- **Spinner React** (T-02.4 Sprint 1) : barre de progression animée + message « génération en cours… ~15 s »
- **Validation post-LLM** déjà en place dans `quiz_prompt.py` : parsing JSON strict, re-prompt si invalide (max 2 essais)
- **Audit qualité** : 20 quiz spot-check avant démo PO mercredi

---

## 5. Conséquences

### 5.1 Positives

-  Latence p50 : ~42 s → ~11 s (gain **74 %**)
-  Latence p95 : ~58 s → ~16 s (gain **72 %**)
-  RAM serveur libérée : ~5 Go → ~2.3 Go (**-54 %**)
-  Démo PO Sprint Review sécurisée (< 15 s pour 100 % des quiz en conditions normales)
-  UX Léa Martin préservée - abandon avant fin de quiz devient marginal

### 5.2 Négatives

-  Qualité moyenne : 8.2/10 → 7.6/10 (perte **7 %**)
-  Taux de questions ambiguës : 1/50 → 4/50 (×4) - validation post-LLM plus sollicitée
-  Dépendance à Microsoft pour le modèle `phi3:mini` (risque de dépréciation à moyen terme)
-  `phi3:mini` moins performant sur des cours très techniques (mathématiques avancées, code)

---

## 6. KPIs à surveiller post-décision

| KPI | Seuil cible | Seuil d'alerte | Action si dépassement |
|---|---|---|---|
| Latence p50 génération quiz | < 15 s | > 25 s sur 3 jours | Déclencher ADR-0003 (test Mistral:7b ou Llama 3.3) |
| Latence p95 génération quiz | < 20 s | > 35 s sur 3 jours | Audit infra Ollama + ressources Docker |
| Score qualité (audit 20 quiz) | ≥ 7/10 | < 6.5/10 sur 2 semaines | Améliorer prompt (few-shot) + revue ADR |
| Taux d'échec validation post-LLM | < 5 % | > 10 % sur 1 semaine | Audit `quiz_prompt.py` + règles de validation |
| Signalements utilisateurs (question erronée) | < 2/semaine | > 5/semaine | Revue produit avec PO |

**Date de revue ADR** : S+2 après mise en production,
avec PO et équipe IA. Toute re-décision génère un ADR-0003.

---

## Références

- Benchmark équipe 15 J2 : [`docs/perturbations/j2/equipe-15-benchmark-j2.md`](../perturbations/j2/equipe-15-benchmark-j2.md)
- Microsoft Phi-3 Technical Report 2024 : <https://arxiv.org/abs/2404.14219>
- ADR-0001 (choix initial) : [`docs/adr/ADR-0001-choix-initial-llm.md`](./ADR-0001-choix-initial-llm.md)
