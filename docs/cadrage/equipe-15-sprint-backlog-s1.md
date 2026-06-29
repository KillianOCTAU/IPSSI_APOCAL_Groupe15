# Sprint Backlog - Sprint 1
**Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum**

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 15 |
| **Membres** | Yoann CURTY, Zouayobo DALI, Killian OCTAU, Antoine BLAIN, Maxence GIROUD, Hyndi FANNIR, BOUYABRI Mohamed |
| **Sprint concerné** | Sprint 1 |
| **Version** | v1.0 (initiale) |
| **Date de remise** | 29/06/2026 18h00 |
| **Statut** | Draft |

---

## MÉTADONNÉES DU SPRINT

| Champ | Valeur |
|---|---|
| **Numéro de sprint** | Sprint 1 |
| **Date** | Lundi 30/06/2026 |
| **Équipe** | 7 personnes |
| **Capacité totale** | 7 × 4 h = **28 h-pers** |
| **Vélocité cible** | 8–10 SP (US-01 = 3 SP · US-02 = 5 SP = **8 SP total**) |
| **Objectif sprint** | Setup technique + démarrage MVP : F1 inscription email fonctionnelle, F2 upload cours (PDF + texte) opérationnel, tests verts en CI |
| **Scrum Master** | [ Prénom NOM ] |
| **Product Owner** | [ Prénom NOM ] |

---

## SPRINT BACKLOG

3 à 5 tâches par story · estimation en heures (1–3 h chacune) · total ≤ capacité sprint
**Estimation totale : 16 h · Capacité : 28 h-pers · Marge : 12 h** (setup Docker, pair-programming, onboarding kit)

### US-01 - F1 : Inscription + connexion par email

*En tant qu'étudiant·e, je veux créer un compte avec email et mot de passe, afin de sauvegarder mes quiz et y revenir.*

| US | ID tâche | Tâche technique | Assigné | Estim. (h) | Restant (h) | Statut |
|---|---|---|---|---|---|---|
| US-01 | **T-01.1** | Audit `accounts/models.py` : vérifier le modèle User (email comme identifiant, champs `email_verified`, `created_at`) ; corriger ou compléter si champ manquant ; lancer `docker exec ... python manage.py migrate` | Yoann | 1 | 1 | Todo |
| US-01 | **T-01.2** | Test + correction endpoint `POST /api/accounts/signup/` : validation email unique, mdp ≥ 8 car., messages d'erreur en français, réponse 201 avec token ; tester via Swagger UI `localhost:8000/api/docs` | Zouayobo | 2 | 2 | Todo |
| US-01 | **T-01.3** | Test flux complet validation email : inscription → email dans logs Docker (`docker logs ... --tail 40`) → clic lien → `email_verified=True` → redirect `/upload` ; corriger si lien expiré ou URL incorrecte | Killian | 1 | 1 | Todo |
| US-01 | **T-01.4** | Finition page React `/signup` : messages d'erreur visibles sous chaque champ, bouton « S'inscrire » désactivé pendant l'appel API (évite double soumission), redirect vers `/upload` après succès, mobile-first | Antoine | 2 | 2 | Todo |
| US-01 | **T-01.5** | Tests pytest `accounts/tests.py` (signup OK, email dupliqué, mdp trop court) + Vitest composant `/signup` (rendu, soumission, message d'erreur) + CI vert (`make test`) | Maxence | 1 | 1 | Todo |

**Sous-total US-01 : 7 h estimées**

---

### US-02 - F2 : Upload cours (PDF ≤ 5 Mo ou texte ≥ 200 car.)

*En tant qu'étudiant·e, je veux uploader un PDF ou saisir un texte de cours, afin de ne pas avoir à recopier mon support.*

| US | ID tâche | Tâche technique | Assigné | Estim. (h) | Restant (h) | Statut |
|---|---|---|---|---|---|---|
| US-02 | **T-02.1** | Audit `quizzes/models.py` (modèle `Quiz` : FK User, champ `source_text`, `title`, `created_at`) + `llm/serializers.py` (`GenerateQuizSerializer`) ; vérifier contraintes et valeurs par défaut ; migrer si nécessaire | Yoann | 1 | 1 | Todo |
| US-02 | **T-02.2** | Test + correction endpoint `POST /api/llm/generate-quiz/` mode PDF : limite 5 Mo appliquée (`MAX_UPLOAD_SIZE`), extraction texte via `llm/pdf_utils.py` (`pypdf`, pas PyPDF2), gestion erreur PDF corrompu ou protégé (réponse 400 claire) | Zouayobo | 2 | 2 | Todo |
| US-02 | **T-02.3** | Test + correction endpoint `POST /api/llm/generate-quiz/` mode texte : validation `len(text) >= 200`, trim des espaces, message d'erreur explicite si texte trop court ; vérifier `LLM_BACKEND=mock` pour tester sans Ollama | Killian | 1 | 1 | Todo |
| US-02 | **T-02.4** | Finition page React `/upload` : dropzone drag-and-drop fonctionnelle + textarea, barre de progression animée pendant la génération LLM (45–90 s en Ollama local - voir friction Journey Map Léa étape 3), message rassurant « génération en cours… ~1 min » | Antoine | 3 | 3 | Todo |
| US-02 | **T-02.5** | Tests pytest endpoint upload (PDF OK, PDF trop grand, texte trop court) + Vitest composant `/upload` (affichage dropzone, textarea, bouton) + mise à jour `README.md` section upload | Maxence | 1 | 1 | Todo |

**Sous-total US-02 : 8 h estimées**

---

**TOTAL SPRINT 1 : 15 tâches · 15 h estimées · 28 h-pers capacité · marge 13 h**

> La marge de 13 h est intentionnelle : Sprint 1 = premier sprint, temps de setup Docker, pair-programming, lecture du kit, familiarisation avec l'archi Django ↔ React.
> Si US-01 + US-02 sont terminées avant 17h → tirer une tâche de US-03 depuis le Product Backlog.

---

## BURNDOWN - SPRINT 1

Trajectoire des heures restantes lundi 14h00 → 18h00 (sprint de 4 h)

> **Burndown vs Burnup :** le Burndown trace les h-pers restantes (descendant). Pour un sprint court de 4 h, c'est l'indicateur le plus actionnable - si Réel > Idéal à 16h00, re-planifier immédiatement.
> **Lecture :** idéal = descente linéaire de 15h → 0h. Réel = à reporter à chaque daily (ou heure ronde).

| Moment du sprint | H restantes (idéal) | H restantes (réel) | Δ réel–idéal | Commentaire |
|---|---|---|---|---|
| **14h00 - Début sprint** | 15 | - | - | Début sprint, toutes tâches en Todo |
| **15h00 - Daily intermédiaire** | 11 | *à compléter* | *à calculer* | 1/4 du sprint écoulé - point d'équipe |
| **16h00 - Mi-sprint** | 7 | *à compléter* | *à calculer* | Mi-sprint, point de vigilance |
| **17h00 - Avant clôture** | 3 | *à compléter* | *à calculer* | Dernière heure, finition tests |
| **18h00 - Fin sprint / Review** | 0 | *à compléter* | *à calculer* | Sprint Review + démo PO |

**Lecture de la courbe :**

| Situation | Interprétation | Action |
|---|---|---|
| Réel ≈ Idéal | Sprint sous contrôle, vélocité conforme | Continuer |
| Réel > Idéal | Retard → daily : re-planifier ou retirer une tâche non critique | Escalader au SM |
| Réel < Idéal | Avance → tirer T-03.x depuis le Product Backlog | Prévenir le PO |
| Courbe plate | Tâches bloquées (Docker, Ollama, merge conflict) | Escalader immédiatement au SM |

---

## ✅ Grille d'auto-évaluation

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| Métadonnées sprint complètes (numéro, date, équipe, capacité, vélocité, objectif, SM/PO) | ☑ Oui | Section Métadonnées complète - SM/PO à nommer par l'équipe |
| Stories engagées tirées du Product Backlog avec leur ID (US-XX) | ☑ Oui | US-01 (F1) + US-02 (F2) - cohérentes avec Product Backlog §MUST et Release Planning Sprint 1 |
| Chaque story est décomposée en 3–5 tâches techniques atomiques (1–3 h chacune) | ☑ Oui | US-01 : 5 tâches (T-01.1→T-01.5) · US-02 : 5 tâches (T-02.1→T-02.5) · max 3 h chacune |
| Chaque tâche a un ID (T-XX.Y) et un libellé clair et actionnable | ☑ Oui | IDs T-01.1 à T-02.5 · libellés avec verbe + fichier + commande concrète |
| Chaque tâche est assignée à une personne (pas de tâche orpheline) | ☑ Partiel | [ Prénom ] à remplacer lors du Sprint Planning - auto-assignation en équipe |
| Estimation horaire totale ≤ capacité du sprint (marge raisonnable conservée) | ☑ Oui | 15 h estimées ≤ 28 h-pers capacité · marge 13 h pour onboarding Sprint 1 |
| Burndown initialisé avec heures idéales par moment du sprint | ☑ Oui | 5 points horaires : 15h → 11h → 7h → 3h → 0h |
| Burndown mis à jour à chaque daily (colonne Réel renseignée) | ☐ Partiel | Colonne « Réel » à remplir en direct pendant le sprint |
| Sprint Review programmée en fin de sprint avec démo PO | ☑ Oui | 18h00 - démo US-01 (inscription bout-en-bout) + US-02 (upload PDF + texte) |
| Le Sprint Backlog a été co-construit en Sprint Planning (toutes les voix entendues) | ☑ Partiel | À valider en équipe avant 14h00 - assignation des [ Prénom ] |

