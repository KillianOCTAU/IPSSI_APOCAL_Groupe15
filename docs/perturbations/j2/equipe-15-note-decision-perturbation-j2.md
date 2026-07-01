# Note de décision - Perturbation J2
**Projet EduTutor IA · Équipe 15 · Semaine APOCAL'IPSSI 2026**

---

## IDENTIFICATION

| Champ | Valeur |
|---|---|
| **Équipe n°** | 15 |
| **Membres** | Yoann CURTY, Zouayobo DALI, Killian OCTAU, Antoine BLAIN, Maxence GIROUD, Hyndi FANNIR, BOUYABRI Mohamed |
| **Perturbation** | J2 - La latence inacceptable |
| **Reçue le** | Mardi 01/07/2026 à 10h00 |
| **Décision prise le** | Mardi 01/07/2026 à 11h30 |
| **Statut** | Validé équipe |

---

## 1. Contexte de la perturbation

Le PO a transmis à 10h00 le retour brut d'un beta-testeur (étudiant Master 2) :

> « J'ai uploadé mon cours d'algorithmie. J'ai attendu 45 secondes pour avoir 10 questions.
> Pendant ce temps j'ai cru que le site était cassé. J'ai failli partir.
> Si chaque quiz est aussi long, c'est inutilisable. »

Le sponsor exige un **temps de génération acceptable d'ici ce soir**, et veut comprendre
ce que l'équipe propose comme solution.

**Impact mesuré :**

- Latence p50 modèle actuel (`llama3.1:8b`) : ~42 s (benchmark J2)
- Latence p95 : ~58 s
- Risque : rejet du MVP Release 1 en démo PO mercredi soir

---

## 2. Décision - Migration vers `phi3:mini` + spinner React

### Décision retenue : **Option C du benchmark**

| Élément | Avant J2 | Après J2 |
|---|---|---|
| **Modèle LLM** | `llama3.1:8b` (8B, ~5 Go RAM) | `phi3:mini` (3.8B, ~2.3 Go RAM) |
| **Latence p50** | ~42 s | ~11 s |
| **Latence p95** | ~58 s | ~16 s |
| **Qualité /10** | 8.2 | 7.6 |
| **Feedback visuel** | Aucun pendant l'attente | Spinner + message « génération en cours… ~15 s » |
| **Rollback** | - | `OLLAMA_MODEL=llama3.1:8b` (5 min) |

### Règle d'arbitrage

> **La latence prime sur la qualité** dès lors que la qualité reste ≥ 7/10.
> Justification : un quiz à 7.6/10 qu'un étudiant attend 11 s est plus utile
> qu'un quiz à 8.2/10 qu'il abandonne après 42 s.

### Alternatives écartées

| Alternative | Raison du rejet |
|---|---|
| Statu quo + spinner seul | La latence réelle reste ~42 s - le spinner réduit la latence perçue mais ne résout pas l'abandon |
| `llama3.2:3b` + spinner | Qualité 6.9/10 insuffisante (< 7/10 cible) ; p95 = 19 s encore limite |
| Optimisation prompt seul | Gain ~20 % → ~34 s, bien au-dessus de la cible 15 s |
| API cloud (Groq, Mistral) | Hors périmètre - stack Ollama local imposée (RGPD + coût) |

---

## 3. Priorisation et impact Sprint Backlog

### Tâches injectées en Sprint 2

| ID | Tâche | Assigné | Estim. |
|---|---|---|---|
| T-J2.1 | Benchmark 3 modèles + doc `equipe-15-benchmark-j2.md` | Yoann | 1 h |
| T-J2.2 | Rédiger ADR-0001 (rétroactif) + ADR-0002 | Killian + Antoine | 1 h |
| T-J2.3 | Changer `OLLAMA_MODEL=phi3:mini` + `ollama pull phi3:mini` + vérification < 15 s | Maxence | 0.5 h |
| T-J2.4 | Spinner React sur `/upload` (T-02.4 mutualisé) | Antoine | intégré T-02.4 |
| T-J2.5 | Commit Conventional + push | Hyndi | 0.5 h |

**Total ajouté : +3 h-pers**

### Re-estimation stories impactées

| Story | SP avant J2 | SP après J2 | Delta | Commentaire |
|---|---|---|---|---|
| US-02 (F2 - Upload + génération) | 5 SP / 8 h | 5 SP / 9.5 h | +1.5 h | Intègre T-J2.3 + T-J2.4 mutualisé |
| US-T01 (entité Classe) | 3 SP / 6 h | **Reporté Sprint 3** | - | Sort du Sprint 2 pour libérer de la capacité |

> Annoncé au PO le 01/07/2026 à 11h30 : US-T01 sort de Sprint 2 → Sprint 3.
> Aucune feature MVP Release 1 (F1–F6) n'est impactée.

---

## 4. Fichiers modifiés / créés

| Fichier | Action | Auteur |
|---|---|---|
| `docs/perturbations/j2/equipe-15-benchmark-j2.md` | Créé | Yoann |
| `docs/adr/ADR-0001-choix-initial-llm.md` | Créé (rétroactif) | Killian |
| `docs/adr/ADR-0002-migration-modele-llm-j2.md` | Créé | Killian + Antoine |
| `docs/cadrage/equipe-15-sprint-backlog-s2.md` | Créé | Zouayobo |
| `.env` | `OLLAMA_MODEL=phi3:mini` | Maxence |
| `.env.example` | Mise à jour + commentaire ADR-0002 | Maxence |

---

## 5. Communication PO

Message transmis au PO le 01/07/2026 à 11h30 :

> « Suite au retour beta-testeur de ce matin, nous avons benchmarké 3 modèles Ollama
> (llama3.1:8b, llama3.2:3b, phi3:mini) et décidé de migrer vers phi3:mini.
> La latence passe de ~42 s à ~11 s (gain 74 %). La qualité reste à 7.6/10 (cible ≥ 7).
> L'ADR-0002 est disponible dans docs/adr/. US-T01 (entité Classe) sort du Sprint 2 vers Sprint 3
> pour absorber le surcoût (+3 h). MVP Release 1 (F1–F6) reste inchangé. »
