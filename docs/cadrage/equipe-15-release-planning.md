# Release Planning - EduTutor IA
**Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum**

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 15 |
| **Membres** | Yoann CURTY, Zouayobo DALI, Killian OCTAU, Antoine BLAIN, Maxence GIROUD, Hyndi FANNIR, BOUYABRI Mohamed |
| **Sprint concerné** | Cadrage (J1 matin) |
| **Version** | v1.1 (modifié suite perturbation J1 -14h00) |
| **Date de remise** | 29/06/2026 15h00 |
| **Statut** | Draft |

---

## RELEASE PLANNING - SEMAINE APOCAL'IPSSI 2026

7 sprints × demi-journée · cadrage matinal · soutenance vendredi
**Équipe de 7 personnes -Capacité totale semaine : 203 h-pers (~50–60 SP)**

| Sprint | Jour | Horaires | Capacité (h-pers) | Vélocité cible (SP) | Objectif sprint | Stories engagées | Release / Jalon |
|---|---|---|---|---|---|---|---|
| **Cadrage** | Lundi matin | 9h00 – 13h30 | 24,5 | n.c. | Produire les 7 artefacts agiles (Vision Board, Personas, Customer Journey, Story Map, Release Planning, Product Backlog, Sprint Backlog) | n.c. | 📋 Validation PO 14h00 |
| **Sprint 1** | Lundi PM | 14h00 – 18h00 | 28 | 11 | Setup technique + démarrage MVP · F1 inscription email, F2 upload cours/PDF · **modélisation entité Classe** (prérequis teacher) | **US-01**, **US-02**, **US-T01** † | 📋 Sprint Review 18h |
| **Sprint 2** | Mardi matin | 9h00 – 12h30 | 24,5 | 8–10 | Génération quiz F3 (Llama 3.1 8B via Ollama local) · ADR fournisseur LLM suite perturbation J2 (latence) | **US-03** | ⚡ Perturbation J2 à 10h |
| **Sprint 3** | Mardi PM | 14h00 – 18h00 | 28 | 10 | Correction + scoring F4/F5 · intégration ADR-J2 · **dashboard classe enseignant** | **US-04**, **US-05**, **US-25** † | 📋 Sprint Review 18h |
| **Sprint 4** | Mercredi matin | 9h00 – 12h30 | 24,5 | 8–10 | Historique F6 + sécurisation anti-prompt injection (perturbation J3) · durcissement `parse_and_validate_quiz` · **alertes décrocheurs enseignant** | **US-06**, **US-26** † + patch sécurité | ⚡ Perturbation J3 à 10h |
| **Sprint 5** | Mercredi PM | 14h00 – 18h00 | 28 | 8–10 | Conformité RGPD SAR (perturbation J3-bis) · export données utilisateur · finalisation MVP F1–F6 · pages légales complétées | **US-12** + correctifs MVP | ⚡ J3-bis 14h · 🚀 Release 1 (MVP) 17h45 |
| **Sprint 6** | Jeudi matin | 9h00 – 12h30 | 24,5 | 8 | Stories Release 2 retenues (Vision Board candidats 1 & 2) · adaptation suite crise utilisateur J4 | **US-09** ★, **US-11** ★ | ⚡ Perturbation J4 à 10h |
| **Sprint 7** | Jeudi PM | 14h00 – 17h00 | 21 | 6–8 | Finalisation Release 2 · post-mortem J4 · démo bout-en-bout prête pour soutenance | **US-14** ★ + post-mortem | 🚀 Release 2 17h |
| **Soutenance** | Vendredi | Selon planning | n.c. | n.c. | Pitch 15 min + démo live MVP + Release 2 + retour réflexif sur les 5 perturbations + Q/R jury | n.c. | 🎓 Soutenance + délibération |
| **TOTAL semaine** | | | **203** | **~50–60 SP** | Capacité totale = 203,0 h-pers (équipe de 7 personnes) | | |

> ★ = story alignée avec les candidats Release 2 du Vision Board (Artefact 1 §4.3)

---

### Détail des stories engagées par sprint

| Sprint | US | Titre | Lien code |
|---|---|---|---|
| Sprint 1 | US-01 | Inscription + connexion par email (Django Auth) | `backend/accounts/views.py` · `frontend/src/pages/` |
| Sprint 1 | US-02 | Upload PDF ≤ 5 Mo OU saisie texte ≥ 200 car. | `backend/llm/pdf_utils.py` · `frontend/src/pages/UploadPage` |
| Sprint 1 | **US-T01** † | Modéliser entité `Classe` + `User.role` (prérequis US-25/26/27/28) | `backend/accounts/models.py` · migration Django |
| Sprint 2 | US-03 | Génération auto 10 QCM via Ollama Llama 3.1 8B | `backend/llm/services/ollama_client.py` · `quiz_prompt.py` |
| Sprint 3 | US-04 | Soumission + correction automatique (1 bonne réponse) | `backend/quizzes/views.py` · `frontend/src/pages/QuizPage` |
| Sprint 3 | US-05 | Score /10 + détail bonnes/mauvaises réponses | `backend/quizzes/serializers.py` · `frontend/src/pages/QuizPage` |
| Sprint 3 | **US-25** † | Dashboard classe enseignant (scores + taux complétion 28 étudiants) | `backend/quizzes/views.py` · `frontend/src/pages/TeacherDashboard` |
| Sprint 4 | US-06 | Historique persistant des quiz par utilisateur | `backend/quizzes/models.py::Quiz` · `frontend/src/pages/HistoryPage` |
| Sprint 4 | **US-26** † | Alertes décrocheurs (score moyen < 5/10 sur 3 derniers quiz) | `backend/quizzes/` · tâche cron + email alert |
| Sprint 4 | Patch sécu | Anti-prompt injection -durcissement validation sortie LLM | `backend/llm/services/quiz_prompt.py::parse_and_validate_quiz` |
| Sprint 5 | US-12 | Export RGPD complet (JSON + CSV, Art. 15/20) | `backend/accounts/` · endpoint à créer |
| Sprint 5 | Correctifs | Pages légales (CGU, confidentialité, cookies, mentions) | `frontend/src/pages/legal/` |
| Sprint 6 | US-09 ★ | Niveau de difficulté + nb questions (5–20) | `backend/llm/services/quiz_prompt.py` · champ `difficulty` sur `Quiz` |
| Sprint 6 | US-11 ★ | Explication de la bonne réponse après correction | `backend/quizzes/models.py::Question` · champ `explanation` |
| Sprint 7 | US-14 ★ | Partage d'un quiz par lien public | `backend/quizzes/models.py::Quiz` · champ `share_token` |

---

### Légende jalons

| Icône | Type | Définition |
|---|---|---|
| 📋 Sprint Review | Démo des stories à la fin du sprint + validation PO |
| ⚡ Perturbation | Événement imprévu déclenché par l'équipe pédagogique |
| 🚀 Release | Livraison incrément potentiellement déployable (tag Git + démo enregistrable) |
| 🎓 Soutenance | Pitch + démo + retour réflexif + Q/R jury (vendredi) |

---

## BURNUP GLOBAL - SEMAINE APOCAL'IPSSI 2026

Trajectoire des story points livrés vs scope total sur les 7 sprints.

| Sprint | Fin de sprint | SP livrés (idéal) | SP livrés (réel) | Scope total |
|---|---|---|---|---|
| Sprint 0 | Lun 13h30 | 0 | — | **56** (scope initial cadrage) |
| Sprint 1 | Lun 18h | 11 | *à compléter* | **59** *(+3 SP US-T01 · perturbation J1)* |
| Sprint 2 | Mar 12h30 | 19 | *à compléter* | 59 |
| Sprint 3 | Mar 18h | 30 | *à compléter* | 59 *(+5 SP US-25 · perturbation J1)* |
| Sprint 4 | Mer 12h30 | 36 | *à compléter* | 59 *(+3 SP US-26 · perturbation J1)* |
| Sprint 5 | Mer 18h | 44 | *à compléter* | 59 + perturbations cumulées J3/J3-bis |
| Sprint 6 | Jeu 12h30 | 52 | *à compléter* | 59 + perturbations J3/J3-bis/J4 |
| Sprint 7 | Jeu 17h | 59 | *à compléter* | 59 + toutes perturbations |

---

## ✅ Grille d'auto-évaluation

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| Les 7 sprints sont planifiés avec jour, horaires et capacité (h-pers) chiffrée | ☑ Oui | Tableau Release Planning : 7 sprints + Cadrage + Soutenance, capacités calculées sur 7 pers. |
| L'équipe taille est explicite (7 personnes), pas de capacité « floue » | ☑ Oui | 7 personnes × 4h = 28 h-pers (PM) · × 3,5h = 24,5 h-pers (AM) · × 3h = 21 h-pers (Sprint 7) |
| Chaque sprint a un objectif clair, mesurable, livrable en démo | ☑ Oui | Colonne « Objectif sprint » : verbe d'action + feature(s) + jalon associé |
| Chaque sprint liste au moins 1 user story engagée (tag US-XX du Product Backlog) | ☑ Oui | Stories engagées US-01→US-14 + patch sécurité + correctifs -tableau de détail §2 |
| La Release 1 (MVP) est explicitement positionnée à la fin du Sprint 5 (mercredi 17h45) | ☑ Oui | Sprint 5 : 🚀 Release 1 (MVP) 17h45 |
| La Release 2 est explicitement positionnée à la fin du Sprint 7 (jeudi 17h) | ☑ Oui | Sprint 7 : 🚀 Release 2 17h |
| Les 5 perturbations sont positionnées sur le planning aux bons créneaux | ☑ Oui | J2 (Sprint 2) · J3 (Sprint 4) · J3-bis (Sprint 5) · J4 (Sprint 6) · J1 déjà intégrée en cadrage |
| La feuille Burnup global est remplie avec un scope initial chiffré (~50–60 SP) | ☑ Oui | Scope initial = 56 SP -justification de l'estimation en note sous le tableau |
| Le Release Planning a été co-construit en équipe (toutes les voix entendues) | ☑ Partiel | À valider collectivement avant soumission PO |
