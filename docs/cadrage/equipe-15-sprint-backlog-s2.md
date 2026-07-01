# Sprint Backlog - Sprint 2
**Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum**

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 15 |
| **Membres** | Yoann CURTY, Zouayobo DALI, Killian OCTAU, Antoine BLAIN, Maxence GIROUD, Hyndi FANNIR, BOUYABRI Mohamed |
| **Sprint concerné** | Sprint 2 |
| **Version** | v1.1 (post-perturbation J2) |
| **Date de remise** | 01/07/2026 18h00 |
| **Statut** | En cours |

---

## MÉTADONNÉES DU SPRINT

| Champ | Valeur |
|---|---|
| **Numéro de sprint** | Sprint 2 |
| **Date** | Mardi 01/07/2026 |
| **Équipe** | 7 personnes |
| **Capacité totale** | 7 × 4 h = **28 h-pers** |
| **Vélocité cible** | 10–13 SP (carry-over S1 + stories J2) |
| **Objectif sprint** | Finaliser F1 + F2, intégrer migration LLM `phi3:mini` (ADR-0002), spinner React, tests verts CI |
| **Scrum Master** | Hyndi FANNIR  |
| **Product Owner** | Mostapha Bachir ADDI |

> ⚡ **Sprint 2 impacté par Perturbation J2** (01/07 10h00) : tâches LLM injectées,
> US-T01 reportée en Sprint 3 pour libérer de la capacité.

---

## SPRINT BACKLOG

### Carry-over Sprint 1 — US-01 : Inscription + connexion par email

*Stories non terminées en Sprint 1, reprises à l'identique.*

| US | ID tâche | Tâche technique | Assigné | Estim. (h) | Restant (h) | Statut |
|---|---|---|---|---|---|---|
| US-01 | **T-01.1** | Audit `accounts/models.py` : vérifier modèle User (email comme identifiant, `email_verified`, `created_at`) ; corriger si champ manquant ; lancer migrations | Yoann | 1 | *reporter de S1* | Todo |
| US-01 | **T-01.2** | Test + correction endpoint `POST /api/accounts/signup/` : validation email unique, mdp ≥ 8 car., messages d'erreur FR, réponse 201 avec token | Zouayobo | 2 | *reporter de S1* | Todo |
| US-01 | **T-01.3** | Test flux validation email bout-en-bout → `email_verified=True` → redirect `/upload` | Killian | 1 | *reporter de S1* | Todo |
| US-01 | **T-01.4** | Finition page React `/signup` : messages d'erreur sous chaque champ, bouton désactivé pendant appel API, redirect succès | Antoine | 2 | *reporter de S1* | Todo |
| US-01 | **T-01.5** | Tests pytest `accounts/tests.py` + Vitest composant `/signup` + CI vert (`make test`) | Maxence | 1 | *reporter de S1* | Todo |

**Sous-total US-01 : 7 h (carry-over)**

---

### Carry-over Sprint 1 — US-02 : Upload cours + génération quiz

*Re-estimée à 9.5 h après injection tâche migration LLM (T-J2.3 intégré).*

| US | ID tâche | Tâche technique | Assigné | Estim. (h) | Restant (h) | Statut |
|---|---|---|---|---|---|---|
| US-02 | **T-02.1** | Audit `quizzes/models.py` + `llm/serializers.py` ; vérifier contraintes et valeurs par défaut ; migrer si nécessaire | Yoann | 1 | *reporter de S1* | Todo |
| US-02 | **T-02.2** | Test + correction endpoint PDF : limite 5 Mo, extraction `pypdf`, gestion erreur PDF corrompu | Zouayobo | 2 | *reporter de S1* | Todo |
| US-02 | **T-02.3** | Test + correction endpoint texte : validation `len(text) >= 200`, trim espaces, message d'erreur explicite | Killian | 1 | *reporter de S1* | Todo |
| US-02 | **T-02.4** | Spinner React `/upload` : barre de progression animée + message « génération en cours… ~15 s » (remplace « ~1 min » — gain latence ADR-0002) | Antoine | 3 | *reporter de S1* | Todo |
| US-02 | **T-02.5** | Tests pytest upload (PDF OK, trop grand, texte court) + Vitest composant + `README.md` section upload | Maxence | 1 | *reporter de S1* | Todo |

**Sous-total US-02 : 8 h (carry-over) → re-estimé 9.5 h avec T-J2.3**

---

### Injection J2 — Migration LLM (Perturbation J2, ADR-0002)

*Tâches ajoutées suite à la perturbation du 01/07/2026 à 10h00.*

| US | ID tâche | Tâche technique | Assigné | Estim. (h) | Restant (h) | Statut |
|---|---|---|---|---|---|---|
| — | **T-J2.1** | Benchmark 3 modèles Ollama (données extrapolées sources publiques) + rédiger `docs/perturbations/j2/equipe-15-benchmark-j2.md` | Yoann | 1 | 1 | Todo |
| — | **T-J2.2** | Rédiger `ADR-0001-choix-initial-llm.md` (rétroactif) + `ADR-0002-migration-modele-llm-j2.md` dans `docs/adr/` | Killian + Antoine | 1 | 1 | Todo |
| — | **T-J2.3** | Changer `OLLAMA_MODEL=phi3:mini` dans `.env` + `docker exec ollama pull phi3:mini` + vérifier latence < 15 s sur cours de référence | Maxence | 0.5 | 0.5 | Todo |
| — | **T-J2.4** | Commit Conventional Commit `feat(llm): migrate to phi3:mini per ADR-0002` + push | Hyndi | 0.5 | 0.5 | Todo |

**Sous-total injection J2 : 3 h**

---

### Reporté en Sprint 3 — US-T01 : Modéliser entité Classe

*Sorti du Sprint 2 pour absorber le surcoût J2 (+3 h). Annoncé au PO le 01/07 à 11h30.*

| Story | SP | Raison du report | Sprint cible |
|---|---|---|---|
| US-T01 — Modéliser entité `Classe` | 3 SP | Capacité absorbée par injection J2 (+3 h) | Sprint 3 |

---

## RÉCAPITULATIF CAPACITÉ SPRINT 2

| Bloc | Heures |
|---|---|
| US-01 carry-over | 7 h |
| US-02 carry-over (re-estimé) | 9.5 h |
| Injection J2 | 3 h |
| **Total engagé** | **19.5 h** |
| Capacité sprint | 28 h-pers |
| **Marge disponible** | **8.5 h** (setup, tests d'intégration, review PO) |

---

## BURNDOWN — SPRINT 2

Trajectoire des heures restantes mardi 14h00 → 18h00

| Moment du sprint | H restantes (idéal) | H restantes (réel) | Δ réel–idéal | Commentaire |
|---|---|---|---|---|
| **14h00 - Début sprint** | 19.5 | — | — | Début sprint, toutes tâches en Todo |
| **15h00 - Daily intermédiaire** | 14.6 | *à compléter* | *à calculer* | Point sur migration LLM + US-01 |
| **16h00 - Mi-sprint** | 9.75 | *à compléter* | *à calculer* | Validation spinner + tests LLM |
| **17h00 - Avant clôture** | 4.9 | *à compléter* | *à calculer* | Dernière heure — finition tests CI |
| **18h00 - Fin sprint / Review** | 0 | *à compléter* | *à calculer* | Sprint Review + démo PO |

---

## ✅ Grille d'auto-évaluation

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| Métadonnées sprint complètes (numéro, date, équipe, capacité, vélocité, objectif) | ☑ Oui | Section Métadonnées complète |
| Stories carry-over identifiées avec leur ID (US-XX) | ☑ Oui | US-01 + US-02 clairement taggées carry-over |
| Tâches J2 injectées avec ID et assignation | ☑ Oui | T-J2.1 → T-J2.4 avec assignés et estimations |
| Re-estimation des stories impactées documentée | ☑ Oui | US-02 : 8 h → 9.5 h (motif : T-J2.3) |
| Story sortie du sprint documentée + sprint cible | ☑ Oui | US-T01 → Sprint 3, annoncé PO le 01/07 11h30 |
| Capacité totale ≤ 28 h-pers avec marge raisonnable | ☑ Oui | 19.5 h engagées / 28 h-pers · marge 8.5 h |
| Burndown initialisé avec heures idéales | ☑ Oui | 5 points horaires : 19.5 h → 0 h |
| Lien avec ADR de décision technique | ☑ Oui | ADR-0002 référencé dans tâches J2 et en-tête |
