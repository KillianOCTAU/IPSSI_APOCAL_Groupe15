# Sprint Backlog - Sprint 3
**Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum**

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 15 |
| **Membres** | Yoann CURTY, Zouayobo DALI, Killian OCTAU, Antoine BLAIN, Maxence GIROUD, Hyndi FANNIR, BOUYABRI Mohamed |
| **Sprint concerné** | Sprint 3 |
| **Version** | v1.0 (post-perturbations J3 + J3-bis) |
| **Date de remise** | 01/07/2026|
| **Statut** | Clôturé (avec carry-over S4) |

---

## MÉTADONNÉES DU SPRINT

| Champ | Valeur |
|---|---|
| **Numéro de sprint** | Sprint 3 |
| **Date** | Mercredi 01/07/2026 |
| **Équipe** | 7 personnes |
| **Capacité totale** | 7 × 4 h = **28 h-pers** |
| **Vélocité cible** | 10–13 SP (US-04 + US-05 + US-25 + carry-over US-T01) |
| **Objectif sprint** | Correction + scoring F4/F5 · dashboard classe enseignant · durcissement sécurité LLM (J3) · export RGPD SAR (J3-bis) |
| **Scrum Master** | Hyndi FANNIR |
| **Product Owner** | Mostapha Bachir ADDI |

> ⚡ **Sprint 3 impacté par deux perturbations le 01/07/2026** :
> - **J3** - prompt injection sur génération QCM → injection +3 h (ADR-0003)
> - **J3-bis** - demande SAR Hugo Petit (Art. 15 RGPD) → injection +2,5 h (ADR-0004), **US-12 avancée depuis Sprint 5**

---

## SPRINT BACKLOG

### Carry-over Sprint 2 - US-T01 : Modéliser entité `Classe`

*Reportée depuis S2 (perturbation J2). Bloquante pour US-25.*

| US | ID tâche | Tâche technique | Assigné | Estim. (h) | Restant (h) | Statut |
|---|---|---|---|---|---|---|
| US-T01 | **T-T01.1** | Ajouter `User.role` ∈ {`student`, `teacher`} + modèle `Classe` (FK enseignant, M2M étudiants) dans `accounts/models.py` ; migration Django | Yoann | 1.5 | 1.5 | Todo |
| US-T01 | **T-T01.2** | Endpoint `GET /api/classes/` : retourne la classe de l'enseignant authentifié (403 si `role=student`) | Zouayobo | 1 | 1 | Todo |
| US-T01 | **T-T01.3** | Tests pytest modèle + endpoint + fixture `bootstrap_demo` (28 étudiants Mme Lefèvre) | Maxence | 0.5 | 0.5 | Todo |

**Sous-total US-T01 : 3 h - non terminé (reporté Sprint 4)**

---

### US-04 - F4 : Soumission + correction automatique

*En tant qu'étudiant·e, je veux soumettre mes réponses et obtenir une correction automatique.*

| US | ID tâche | Tâche technique | Assigné | Estim. (h) | Restant (h) | Statut |
|---|---|---|---|---|---|---|
| US-04 | **T-04.1** | Vérifier endpoint `POST /api/quizzes/<id>/answer/` : compare `selected_index` vs `correct_index`, persiste `selected_index` sur chaque `Question` | Killian | 1 | 0 | **Done** |
| US-04 | **T-04.2** | Finition `QuizPage.tsx` : sélection radio par question, bouton « Valider » désactivé si < 10 réponses, gestion erreur API | Antoine | 1.5 | 0 | **Done** |
| US-04 | **T-04.3** | Tests pytest `quizzes/tests.py` (score 10/10, 0/10, partiel 5/10) + Vitest soumission mockée | Maxence | 1 | 0 | **Done** |

**Sous-total US-04 : 3.5 h - terminé**

---

### US-05 - F5 : Score /10 + détail bonnes/mauvaises réponses

*En tant qu'étudiant·e, je veux voir mon score /10 et le détail de mes réponses.*

| US | ID tâche | Tâche technique | Assigné | Estim. (h) | Restant (h) | Statut |
|---|---|---|---|---|---|---|
| US-05 | **T-05.1** | Bloc résultat `QuizPage.tsx` : score /10 coloré (vert ≥ 7, ambre ≥ 4, rouge < 4) + scroll auto en haut | Antoine | 1 | 0 | **Done** |
| US-05 | **T-05.2** | Détail par question : icône ✓/✗, bonne réponse mise en évidence, `selected_index` affiché si erreur | Antoine | 1 | 0 | **Done** |
| US-05 | **T-05.3** | Persistance score sur modèle `Quiz.score` ; vérifier historique alimenté pour `DashboardPage` | Killian | 0.5 | 0 | **Done** |

**Sous-total US-05 : 2.5 h - terminé**

---

### US-25 - Dashboard classe enseignant *(perturbation J1)*

*En tant qu'enseignante, je veux consulter le tableau de bord de ma classe.*

| US | ID tâche | Tâche technique | Assigné | Estim. (h) | Restant (h) | Statut |
|---|---|---|---|---|---|---|
| US-25 | **T-25.1** | Endpoint `GET /api/classes/<id>/dashboard/` : score moyen + taux complétion par étudiant, tri score croissant | Zouayobo | 2 | 2 | Todo |
| US-25 | **T-25.2** | Page React `/teacher/dashboard` : tableau 28 lignes, colonnes nom / score moyen / taux complétion, guard `role=teacher` | Antoine | 2 | 2 | Todo |
| US-25 | **T-25.3** | Tests pytest agrégation + Vitest rendu tableau + lien nav visible uniquement pour enseignant | Maxence | 1 | 1 | Todo |

**Sous-total US-25 : 5 h - non terminé (bloqué par US-T01, reporté Sprint 4)**

---

### Injection J3 - Sécurisation anti-prompt injection (Perturbation J3, ADR-0003)

*Tâches ajoutées suite à la perturbation du 01/07/2026 à 10h00 (attaque `correct_index: 0` systématique).*

| US | ID tâche | Tâche technique | Assigné | Estim. (h) | Restant (h) | Statut |
|---|---|---|---|---|---|---|
| - | **T-J3.1** | Rédiger `docs/perturbations/j3/note_securite_J3.md` + `ADR-0003-securisation-prompt-injection-j3.md` | Killian + Antoine | 0.5 | 0 | **Done** |
| - | **T-J3.2** | Refactor `ollama_client.py` : passage à `/api/chat` avec `build_messages()` (séparation system / user) ; aligner `openai_compatible.py` | Zouayobo | 1 | 0 | **Done** |
| - | **T-J3.3** | Durcir `parse_and_validate_quiz()` : rejet si ≥ 10 questions partagent le même `correct_index` ; distribution minimale sur 2 indices | Maxence | 1 | 0 | **Done** |
| - | **T-J3.4** | Tests adversariaux `test/test_adversarial.py` (5 scénarios) + workflow CI `.github/workflows/adversarial-tests.yml` | Maxence | 1 | 0 | **Done** |
| - | **T-J3.5** | Commit `feat(llm): harden quiz validation per ADR-0003` + démo replay attaque rejetée en Review | Hyndi | 0.5 | 0 | **Done** |

**Sous-total injection J3 : 4 h - terminé**

---

### Injection J3-bis - Export RGPD SAR (Perturbation J3-bis, ADR-0004)

*Tâches ajoutées suite à la perturbation du 01/07/2026 à 14h00 (demande Hugo Petit, Art. 15). **US-12 avancée depuis Sprint 5.***

| US | ID tâche | Tâche technique | Assigné | Estim. (h) | Restant (h) | Statut |
|---|---|---|---|---|---|---|
| US-12 | **T-J3b.1** | Modèle `DataRequest` (audit trail) + endpoint `GET /api/accounts/me/export/` → ZIP (`quiz.json`, `reponses.csv`, `audit.json`) | Yoann | 1.5 | 0 | **Done** |
| US-12 | **T-J3b.2** | Composant `ExportDataButton.tsx` sur `ProfilePage` : téléchargement ZIP, états loading/erreur/succès | Antoine | 1 | 0 | **Done** |
| US-12 | **T-J3b.3** | Rédiger `ADR-0004-export-rgpd-sar-j3bis.md` + `politique_retention_J3bis.md` + `reponse_hugo_petit.md` | Hyndi + Zouayobo | 1 | 0 | **Done** |
| US-12 | **T-J3b.4** | Tests pytest `accounts/tests.py` (export auth, contenu ZIP, `export_hash`) + pages légales CGU/confidentialité/cookies | Killian | 1 | 0 | **Done** |

**Sous-total injection J3-bis : 4.5 h - terminé (US-12 livrée en avance)**

---

### Reporté en Sprint 4

| Story | SP | Raison du report | Sprint cible |
|---|---|---|---|
| **US-T01** - Modéliser entité `Classe` | 3 SP | Non démarré - capacité absorbée par J3 + J3-bis (+7,5 h) | Sprint 4 |
| **US-25** - Dashboard classe enseignant | 5 SP | Dépendance bloquante US-T01 | Sprint 4 |
| **US-06** - Historique quiz | 3 SP | Plan initial Sprint 4 - inchangé | Sprint 4 |
| Patch sécu J3 | - | **Livré en S3** (anticipation Sprint 4) | - |

---

## RÉCAPITULATIF CAPACITÉ SPRINT 3

| Bloc | Heures estimées | Heures consommées | Statut |
|---|---|---|---|
| US-T01 carry-over | 3 h | 0 h | Reporté S4 |
| US-04 (F4 correction) | 3.5 h | 3.5 h | **Done** |
| US-05 (F5 scoring) | 2.5 h | 2.5 h | **Done** |
| US-25 dashboard enseignant | 5 h | 0 h | Reporté S4 |
| Injection J3 (sécurité LLM) | 4 h | 4 h | **Done** |
| Injection J3-bis (export RGPD) | 4.5 h | 4.5 h | **Done** |
| **Total engagé** | **22.5 h** | **14.5 h livrées** | |
| Capacité sprint | 28 h-pers | | |
| **Marge utilisée / restante** | | **8 h consommées sur marge** (replanification PO) | |

> **Bilan vélocité :** 6 SP livrés (US-04 + US-05) + US-12 en avance (5 SP) + patch sécurité J3. **8 SP reportés** (US-T01 + US-25). Trade-off validé : conformité RGPD et sécurité prioritaires pour Release 1 (mercredi soir).

---

## BURNDOWN - SPRINT 3

Trajectoire des heures restantes mercredi

| Moment du sprint | H restantes (idéal) | H restantes (réel) | Δ réel–idéal | Commentaire |
|---|---|---|---|---|
| **Début sprint** | 22.5 | 22.5 | 0 | Plan initial : US-04/05/25 + carry-over US-T01 |
| **Post J3-bis** | 20.5 | 18 | −2.5 | Replanification : J3-bis injecté, US-25 sortie |
| **Mi-sprint** | 11.25 | 8 | −3.25 | Export RGPD + durcissement LLM en cours |
| **Avant clôture** | 5.6 | 3 | −2.6 | Tests adversariaux + ADR-0003/0004 rédigés |
| **Pré-Review** | 2.8 | 1.5 | −1.3 | US-T01 + US-25 reportées, démo préparée |
| **Fin sprint / Review** | 0 | 1.5 | +1.5 | Carry-over US-T01 + US-25 → Sprint 4 |

**Lecture :** retard apparent de 1,5 h en fin de sprint = dette technique US-T01/US-25 non démarrée. Les perturbations J3/J3-bis ont été absorbées dans la marge (+7,5 h injectées, +14,5 h livrées sur le créneau).


## ✅ Grille d'auto-évaluation

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| Métadonnées sprint complètes (numéro, date, équipe, capacité, vélocité, objectif) | ☑ Oui | Section Métadonnées complète |
| Stories engagées tirées du Product Backlog avec leur ID (US-XX) | ☑ Oui | US-04, US-05, US-25 + carry-over US-T01 + US-12 (avance) |
| Chaque story décomposée en 3–5 tâches techniques atomiques | ☑ Oui | T-04.x, T-05.x, T-25.x, T-J3.x, T-J3b.x |
| Perturbations J3 et J3-bis documentées avec ADR | ☑ Oui | ADR-0003 + ADR-0004 · notes dans `docs/perturbations/j3/` |
| Replanification et stories reportées explicites | ☑ Oui | US-T01 + US-25 → Sprint 4, annoncé PO |
| Burndown mis à jour avec colonne Réel renseignée | ☑ Oui | 6 points horaires avec valeurs réelles |
| Sprint Review programmée avec démo PO | ☑ Oui | démo correction/score + export RGPD + replay attaque J3 rejetée |
| Lien avec décisions techniques (ADR) | ☑ Oui | ADR-0003 (injection) + ADR-0004 (SAR) référencés |
