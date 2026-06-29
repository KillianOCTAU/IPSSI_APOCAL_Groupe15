# Product Backlog — EduTutor IA
**Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum**

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 15 |
| **Membres** | Yoann CURTY, Zouayobo DALI, Killian OCTAU, Antoine BLAIN, Maxence GIROUD, Hyndi FANNIR, BOUYABRI Mohamed |
| **Sprint concerné** | Cadrage (J1 matin) |
| **Version** | v1.1 (modifié suite perturbation J1 — 14h00) |
| **Date de remise** | 29/06/2026 15h00 |
| **Statut** | Draft |

---

## EPICS - EduTutor IA

6 épopées correspondant aux activités utilisateur de la Story Map

| ID | Epic | Activité (Story Map) | Stories incluses | SP total |
|---|---|---|---|---|
| **EP-01** | Identification utilisateur | S'inscrire | US-01, US-07, US-13, US-19 | 24 |
| **EP-02** | Gestion de contenu | Uploader un cours | US-02, US-08, US-14, US-20 | 29 |
| **EP-03** | Génération de quiz | Générer un quiz | US-03, US-09, US-15, US-21 | 39 |
| **EP-04** | Passage de quiz | Passer le quiz | US-04, US-05, US-10, US-16, US-22 | 38 |
| **EP-05** | Suivi de progression | Consulter résultats | US-06, US-11, US-17, US-23 | 21 |
| **EP-06** | Conformité & administration | Gérer son compte (RGPD) | US-12, US-18, US-24 | 15 |
| **EP-07** † | Suivi de classe (enseignant) | Suivre sa classe | US-25, US-26, US-27, US-28 + US-T01 | 19 |
| | | | **TOTAL** | **187 SP** |

> Scope engagé (sprints 1–7) = **59 SP** — dont 8 SP teacher (US-25+US-26) ajoutés suite perturbation J1, en échange de US-16 sorti de R1 (trade-off neutre en capacité).
> † = Epic ajoutée suite perturbation J1 (Lundi 14h00).

---

## PRODUCT BACKLOG

29 user stories · 8 MUST (MVP F1–F6 + US-25 + US-26) · 7 SHOULD R2 · 7 COULD R2 · 6 WON'T · 1 US technique
★ = candidat Release 2 · † = ajouté perturbation J1
★ = candidat Release 2 sélectionné en Vision Board §4.3

### MUST - MVP Release 1 (Sprint 1–5)

| ID | Epic | User Story (INVEST) | Persona | SP | Critères d'acceptation (G / W / T) | DoR | DoD | Sprint | Statut |
|---|---|---|---|---|---|---|---|---|---|
| **US-01** | EP-01 | En tant qu'étudiant·e, je veux créer un compte avec email et mot de passe, afin de sauvegarder mes quiz et y revenir. | Étudiant·e | 3 | **G:** visiteur non authentifié sur `/signup` **W:** soumet email valide + mdp ≥ 8 car. **T:** compte créé, email de validation envoyé, redirect `/upload` | ☐ | ☐ | S1 | Todo |
| **US-02** | EP-02 | En tant qu'étudiant·e, je veux uploader un PDF ou saisir un texte de cours, afin de ne pas avoir à recopier mon support. | Étudiant·e | 5 | **G:** user authentifié sur `/upload` **W:** dépose PDF ≤ 5 Mo OU saisie texte ≥ 200 car. **T:** contenu extrait, stocké en base, bouton « Générer » visible | ☐ | ☐ | S1 | Todo |
| **US-03** | EP-03 | En tant qu'étudiant·e, je veux générer un quiz de 10 QCM en moins de 60 s, afin de réviser rapidement un chapitre. | Étudiant·e | 8 | **G:** un cours stocké pour l'user **W:** clique « Générer un quiz » sur `/quiz` **T:** 10 QCM générés en < 60 s via Llama 3.1 8B local, JSON validé par `parse_and_validate_quiz` | ☐ | ☐ | S2 | Todo |
| **US-04** | EP-04 | En tant qu'étudiant·e, je veux soumettre mes réponses et obtenir une correction automatique, afin de savoir où je me situe. | Étudiant·e | 3 | **G:** un quiz généré et affiché **W:** user soumet ses 10 réponses **T:** chaque réponse comparée, statut bon/mauvais enregistré en base | ☐ | ☐ | S3 | Todo |
| **US-05** | EP-04 | En tant qu'étudiant·e, je veux voir mon score /10 et le détail bonnes/mauvaises réponses, afin de mesurer ma progression. | Étudiant·e | 3 | **G:** un quiz soumis **W:** user arrive sur `/resultat` **T:** score /10 affiché + 10 questions avec bonne réponse mise en évidence | ☐ | ☐ | S3 | Todo |
| **US-06** | EP-05 | En tant qu'étudiant·e, je veux consulter l'historique de mes quiz passés, afin de suivre mon évolution dans le temps. | Étudiant·e | 3 | **G:** user authentifié sur `/history` **W:** la page se charge **T:** liste des quiz triés par date desc., avec titre / date / score / lien « Refaire » | ☐ | ☐ | S4 | Todo |
| **US-T01** † | EP-07 | *(Dette technique)* En tant qu'équipe, nous devons modéliser l'entité `Classe` et ses relations (`User.role`, `Enseignant→Classe`, `Étudiant→Classe`) avant tout développement enseignant. | Technique | 3 | Migration Django créée + testée ; `User.role` ∈ {`student`, `teacher`} ; endpoint `GET /api/classes/` retourne la classe de l'enseignant authentifié | ☐ | ☐ | S1 | Todo |
| **US-25** † | EP-07 | En tant qu'enseignante, je veux consulter le tableau de bord de ma classe avec le score moyen et le taux de complétion par étudiant, afin d'identifier en 3 clics qui a travaillé ce mois-ci. | Mme Lefèvre | 5 | **G:** enseignante connectée (`role=teacher`) sur `/teacher/dashboard` **W:** la page se charge **T:** tableau avec 1 ligne/étudiant, colonnes score moyen + taux complétion, tri par score croissant possible | ☐ | ☐ | S3 | Todo |
| **US-26** † | EP-07 | En tant qu'enseignante, je veux recevoir une alerte automatique quand un étudiant a un score moyen < 5/10 sur ses 3 derniers quiz, afin de cibler mon soutien sans éplucher 28 profils manuellement. | Mme Lefèvre | 3 | **G:** un étudiant de la classe a un score moyen < 5/10 sur ses 3 derniers quiz **W:** l'enseignante ouvre son dashboard **T:** l'étudiant apparaît avec un badge rouge « décrocheur » ; un email d'alerte a été envoyé à l'enseignante dans les 24 h | ☐ | ☐ | S4 | Todo |

**Sous-total MUST : 36 SP** *(25 SP étudiant + 11 SP enseignant — dont 3 SP dette technique US-T01)*

---

### SHOULD - Release 2 (Sprint 6–7)

| ID | Epic | User Story (INVEST) | Persona | SP | Critère type (1 par story) | DoR | DoD | Sprint | Statut |
|---|---|---|---|---|---|---|---|---|---|
| **US-07** | EP-01 | En tant qu'étudiant·e, je veux réinitialiser mon mot de passe via email, afin de récupérer mon compte sans support humain. | Étudiant·e | 3 | Lien magique valide 24 h, redirect `/reset-password`, ancien mdp invalidé immédiatement | ☐ | ☐ | S6 | Backlog |
| **US-08** | EP-02 | En tant qu'étudiant·e, je veux une bibliothèque de mes cours uploadés, afin de retrouver vite mes PDF d'un semestre. | Étudiant·e | 5 | Page `/library` liste les cours avec date, titre, nombre de quiz générés ; clic rouvre le quiz | ☐ | ☐ | S6 | Backlog |
| **US-09** ★ | EP-03 | En tant qu'étudiant·e, je veux choisir le niveau de difficulté et le nombre de questions (5–20), afin d'adapter le quiz à mon temps disponible. | Étudiant·e | 5 | 3 niveaux (facile / moyen / difficile) dans `quiz_prompt.py` + slider 5–20 questions sur le formulaire `/upload` | ☐ | ☐ | S6 | Backlog |
| **US-10** | EP-04 | En tant qu'étudiant·e, je veux un timer optionnel par question, afin de m'entraîner aux conditions d'examen. | Étudiant·e | 3 | Toggle ON/OFF + slider 10–30 s configurable ; compte à rebours visible ; réponse auto-soumise à 0 | ☐ | ☐ | S7 | Backlog |
| **US-11** ★ | EP-05 | En tant qu'étudiant·e, je veux voir l'explication de la bonne réponse après correction, afin de comprendre mes erreurs et mieux retenir. | Étudiant·e | 5 | Champ `explanation` ajouté sur `Question` (migration Django) ; LLM génère l'explication ; affiché après soumission pour chaque question incorrecte | ☐ | ☐ | S7 | Backlog |
| **US-12** | EP-06 | En tant qu'utilisateur·trice, je veux exporter toutes mes données en JSON et CSV, afin d'exercer mon droit d'accès Art. 15 RGPD. | Tous personas | 5 | Bouton « Exporter mes données » → ZIP contenant `quiz.json` + `reponses.csv` + `audit.json` ; endpoint `accounts/` protégé par auth | ☐ | ☐ | S5 | Backlog |
| **US-27** † | EP-07 | En tant qu'enseignante, je veux envoyer un message de conseil directement depuis le profil d'un étudiant, afin de maintenir le lien pédagogique sans sortir de l'application. | Mme Lefèvre | 5 | Bouton « Envoyer un conseil » sur le profil étudiant dans le dashboard ; message envoyé par email (pas de messagerie interne) ; confirmation d'envoi affichée | ☐ | ☐ | S6 | Backlog |

**Sous-total SHOULD : 31 SP**

---

### COULD - Release 2 si temps (Sprint 7 ou backlog futur)

| ID | Epic | User Story (INVEST) | Persona | SP | Critère type (1 par story) | DoR | DoD | Sprint | Statut |
|---|---|---|---|---|---|---|---|---|---|
| **US-13** | EP-01 | En tant qu'étudiant·e, je veux me connecter via Google ou Apple OAuth, afin d'éviter de gérer un énième mot de passe. | Étudiant·e | 5 | Boutons OAuth visibles sur `/login` + `/signup` ; provider configuré via `django-allauth` | ☐ | ☐ | n.c. | Backlog |
| **US-14** ★ | EP-02 | En tant qu'étudiant·e, je veux partager un quiz par lien public, afin de réviser en groupe sans que mes camarades créent un compte. | Étudiant·e | 8 | Champ `share_token` (UUID) sur `Quiz` ; route `/quiz/share/<token>` accessible sans auth ; lien copiable en 1 clic | ☐ | ☐ | n.c. | Backlog |
| **US-15** | EP-03 | En tant qu'enseignant·e, je veux générer des questions ouvertes corrigées par le LLM, afin de varier les types d'évaluation. | Enseignant·e | 13 | Mode « question ouverte » dans le prompt LLM + barème indicatif ; correction LLM avec score partiel possible | ☐ | ☐ | n.c. | Backlog |
| **US-16** | EP-04 | En tant qu'étudiant·e, je veux réviser en mode flashcards type Anki, afin de pratiquer la répétition espacée sur mes erreurs. | Étudiant·e | 8 | Mode flashcard sur `/review` ; algorithme répétition espacée J+1 / J+3 / J+7 sur les questions ratées | ☐ | ☐ | R2 | Backlog |
| **US-28** † | EP-07 | En tant qu'enseignante, je veux accéder à l'historique complet des quiz d'un étudiant de ma classe, afin d'identifier les lacunes récurrentes par chapitre avant les partiels. | Mme Lefèvre | 3 | Page `/teacher/student/<id>/history` listant tous les quiz de l'étudiant avec score, date, chapitre ; accessible uniquement si l'étudiant est dans la classe de l'enseignante | ☐ | ☐ | S7 | Backlog |
| **US-17** | EP-05 | En tant qu'étudiant·e, je veux que l'app identifie automatiquement mes lacunes par chapitre, afin de concentrer mes révisions. | Étudiant·e | 5 | Agrégation des scores < 5/10 par chapitre ; tag « lacune » visible sur `/dashboard` | ☐ | ☐ | n.c. | Backlog |
| **US-18** | EP-06 | En tant qu'utilisateur·trice, je veux supprimer mon compte et toutes mes données, afin d'exercer mon droit à l'oubli Art. 17 RGPD. | Tous personas | 5 | Bouton suppression avec confirmation 2-étapes dans `/profile` ; purge cron 30 j ; confirmation email | ☐ | ☐ | n.c. | Backlog |

**Sous-total COULD : 47 SP**

---

### WON'T - Décision explicite (ne pas faire cette release)

| ID | Epic | User Story (INVEST) | Persona | SP | Justification WON'T | Sprint | Statut |
|---|---|---|---|---|---|---|---|
| **US-19** | EP-01 | En tant que DSI d'établissement, je veux un SSO entreprise SAML / OIDC, afin d'intégrer EduTutor à mon AD/ENT. | Établissement | 13 | Reporté Release 3+ — cible B2B post-prototype ; complexité SAML disproportionnée pour la semaine | n.c. | Won't |
| **US-20** | EP-02 | En tant qu'étudiant·e, je veux importer un cours depuis une vidéo ou un audio, afin de réviser sans lire mes notes. | Étudiant·e | 13 | Transcription Whisper — coût GPU et complexité infrastructure prohibitifs pour le MVP | n.c. | Won't |
| **US-21** | EP-03 | En tant qu'étudiant·e, je veux affronter d'autres étudiants en mode compétition, afin d'ajouter du fun à la révision. | Étudiant·e | 13 | Hors cible primaire Léa (apprentissage personnel, pas gamification compétitive) ; concurrent type Kahoot | n.c. | Won't |
| **US-22** | EP-04 | En tant qu'étudiant·e, je veux discuter avec un chatbot IA pour explorer un sujet, afin d'apprendre par dialogue. | Étudiant·e | 21 | Mode IA conversationnelle — concurrent direct Khanmigo ; hors différenciateur « ancrage cours fourni » | n.c. | Won't |
| **US-23** | EP-05 | En tant qu'enseignant·e, je veux voir les stats de ma classe en temps réel pendant un quiz, afin de m'adapter en direct. | Enseignant·e | 8 | Besoin marginal MVP ; complexité WebSocket temps réel — backlog Release 3+ | n.c. | Won't |
| **US-24** | EP-06 | En tant qu'étudiant·e, je veux personnaliser les couleurs et le thème de l'interface, afin d'adapter l'app à mes préférences. | Étudiant·e | 5 | Thème sombre déjà livré dans le kit (`ThemeContext.tsx`) — aucune valeur additionnelle à court terme | n.c. | Won't |

**Sous-total WON'T : 73 SP**

---

**TOTAL : 29 stories · 187 SP scope global · Scope engagé sprints 1–7 = 59 SP**
*(+5 stories enseignant suite perturbation J1 : US-T01 + US-25 + US-26 + US-27 + US-28 · trade-off : US-16 sorti de R1 → R2)*

---

## DEFINITION OF READY (DoR) - avant Sprint Planning

Une story est READY (tirable en sprint) si **TOUS** ces critères sont cochés :

- [ ] User story rédigée au format INVEST (En tant que … je veux … afin de …)
- [ ] Persona identifié (Étudiant·e / Enseignant·e / Établissement / Tous)
- [ ] Priorité MoSCoW assignée et justifiée (Must / Should / Could / Won't)
- [ ] Critères d'acceptation explicites et testables (format Given/When/Then de préférence)
- [ ] Story estimée par l'équipe en story points (Planning Poker recommandé)
- [ ] Dépendances avec d'autres stories identifiées (et non-bloquantes au moment du sprint)
- [ ] Pas de question ouverte côté Product Owner (clarté du besoin)
- [ ] Maquettes / wireframes disponibles si la story comporte une interface (Figma, Excalidraw)

---

## DEFINITION OF DONE (DoD) -  pour clôturer une story

Une story est DONE (validée Sprint Review) si **TOUS** ces critères sont cochés :

- [ ] Tous les critères d'acceptation de la story sont satisfaits (vérifiables en démo)
- [ ] Code reviewé par au moins 1 autre membre de l'équipe (Pull Request approuvée)
- [ ] Tests pertinents ajoutés (`pytest` pour backend, `vitest` pour frontend, minimum unitaires)
- [ ] Lint et tests verts en CI (pipeline GitHub Actions au vert)
- [ ] Documentation à jour (README, docstrings, `/docs` si concept nouveau)
- [ ] Pas de TODO/FIXME laissé sans ticket de suivi (créer une issue si nécessaire)
- [ ] Story démontrée et acceptée par le PO en Sprint Review
- [ ] Code mergé sur la branche principale + tag Git si fin de release
- [ ] Pas de régression introduite (suite de tests intégrale au vert)

---

## ✅ Grille d'auto-évaluation

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| 29 user stories (8 MUST + 7 SHOULD + 7 COULD + 6 WON'T + 1 technique) | ☑ Oui | US-01 à US-28 + US-T01 · 5 nouvelles stories enseignant ajoutées suite perturbation J1 |
| Toutes les stories sont au format INVEST (En tant que … je veux … afin de …) | ☑ Oui | Chaque story rédigée avec persona + action + bénéfice mesurable |
| Chaque story a une priorité MoSCoW assignée et un persona ciblé | ☑ Oui | Colonne MoSCoW + Persona renseignées sur les 24 stories |
| Les 6 MUST correspondent exactement aux 6 features F1–F6 imposées | ☑ Oui | US-01=F1, US-02=F2, US-03=F3, US-04=F4, US-05=F5, US-06=F6 |
| Les 6 MUST ont des critères d'acceptation Given/When/Then complets | ☑ Oui | G/W/T rédigés pour US-01 à US-06 |
| Chaque story est rattachée à une Epic (EP-01 à EP-06) | ☑ Oui | Colonne Epic renseignée sur les 24 stories |
| Les story points sont estimés (au moins indicatifs) | ☑ Oui | SP estimés US-01→US-24 ; total 168 SP ; scope engagé 56 SP cohérent avec Release Planning |
| La DoR et la DoD sont rédigées et partagées par l'équipe | ☑ Oui | Sections DoR (8 critères) et DoD (9 critères) ci-dessus |
| Le Product Backlog est ordonné par valeur business + dépendances | ☑ Oui | MUST → SHOULD → COULD → WON'T ; dans chaque bloc, ordre sprint |
| Toutes les stories ont été passées au crible INVEST en équipe | ☑ Partiel | À valider collectivement avant soumission PO |

