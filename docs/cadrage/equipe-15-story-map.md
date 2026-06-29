# Story Map — EduTutor IA
**Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum**

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 15 |
| **Membres** | Yoann CURTY, Zouayobo DALI, Killian OCTAU, Antoine BLAIN, Maxence GIROUD, Hyndi FANNIR, BOUYABRI Mohamed |
| **Sprint concerné** | Cadrage (J1 matin) |
| **Version** | v1.0 (initiale) |
| **Date de remise** | 29/06/2026 13h00 |
| **Statut** | Draft |

---

## Story Map

| Niveau MoSCoW | 1. S'inscrire | 2. Uploader un cours | 3. Générer un quiz | 4. Passer le quiz | 5. Consulter résultats | 6. Gérer son compte (RGPD) |
|---|---|---|---|---|---|---|
| **MUST — MVP Release 1** *(Sprint 1–5)* | **US-01** F1 — Inscription email + mot de passe (Django Auth standard) | **US-02** F2 — Upload PDF ≤ 5 Mo OU saisie texte ≥ 200 caractères | **US-03** F3 — Génération automatique de 10 QCM via Llama 3.1 8B (Ollama local) | **US-04** F4 — Soumission + correction automatique (1 bonne réponse / QCM) | **US-05** F5 — Score /10 + détail des bonnes et mauvaises réponses | **US-06** F6 — Historique persistant des quiz par utilisateur (date, cours, score) |
| **SHOULD — Release 2** *(Sprint 6–7)* | **US-07** Reset password par email (lien magique valide 24 h) | **US-08** Multi-cours : bibliothèque personnelle de cours uploadés | **US-09** ★ Choix du niveau de difficulté + nombre de questions (5–20) — *Vision Board candidat 2* | **US-10** Mode timer optionnel par question (10–30 s configurable) | **US-11** ★ Explication de la bonne réponse après correction — *Vision Board candidat 1* | **US-12** Export RGPD complet (JSON + CSV, Art. 15/20) — *lié perturbation J3-bis* |
| **COULD — Release 2 si temps** *(Sprint 7 ou backlog futur)* | **US-13** Login social Google / Apple OAuth | **US-14** ★ Partage d'un quiz par lien public (sans compte obligatoire) — *Vision Board bonus* | **US-15** Mode questions ouvertes (correction LLM avec barème) | **US-16** Mode flashcards type Anki (révision espacée) | **US-17** Identification automatique des lacunes par chapitre | **US-18** Suppression compte + données (RGPD Art. 17, droit à l'oubli) |
| **WON'T (this time)** *(décision explicite — à documenter)* | **US-19** SSO entreprise SAML / OIDC (B2B Release 3+) | **US-20** Source vidéo ou audio (transcription Whisper — coût/complexité prohibitif) | **US-21** Compétition multi-joueurs (hors cible primaire Léa) | **US-22** Mode IA conversationnelle type chatbot (hors scope Khanmigo) | **US-23** Stats temps réel collectives (besoin marginal MVP) | **US-24** Personnalisation thème UI (thème sombre déjà livré dans le kit) |

> ★ = story alignée avec les candidats Release 2 sélectionnés dans l'Artefact 1 (Vision Board §4.3)

---

## Légende MoSCoW

| Niveau | Définition | Engagement |
|---|---|---|
| **MUST** | Sans cette story, le produit n'a pas de sens | Sprint 1–5 (Release 1, mercredi soir) |
| **SHOULD** | Important, à inclure si capacité disponible | Sprint 6–7 (Release 2, jeudi soir) |
| **COULD** | Bonus apprécié si temps en surplus | Sprint 7 seulement si R1 livrée vite |
| **WON'T** | Décision **explicite** de ne pas faire cette release — à documenter dans l'ADR | Backlog Release 3+ ou jamais |

---

## Cohérence avec les autres artefacts

| US | Lié à | Référence |
|---|---|---|
| US-01 à US-06 | Features F1–F6 imposées | Vision Board §4.2 · kit `backend/accounts/` + `backend/llm/` |
| US-09 | Vision Board candidat 2 (niveaux de difficulté) | `docs/08-mvp2-idees.md` #4 · `llm/services/quiz_prompt.py` |
| US-11 | Vision Board candidat 1 (explication des réponses) | `docs/08-mvp2-idees.md` #5 · champ `explanation` à ajouter sur `Question` |
| US-14 | Vision Board bonus (partage de quiz) | `docs/08-mvp2-idees.md` #14 · champ `share_token` à ajouter sur `Quiz` |
| US-12 + US-18 | Perturbation J3-bis (RGPD/données personnelles) | `docs/08-mvp2-idees.md` #12 · pages légales vierges dans le kit |
| US-10 | Journey Map Léa étape 4 (engagement usage régulier) | Artefact 3 §1 étape 4 |
| US-19 | WON'T → Journey Map David étape 2 (SAML = B2B Release 3+) | Artefact 3 §3 étape 5 |

---

## ✅ Grille d'auto-évaluation

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| 6 activités utilisateur clairement nommées en colonnes (axe parcours) | ☑ Oui | Colonnes 1–6 : S'inscrire · Uploader · Générer · Passer · Résultats · Compte |
| 4 niveaux MoSCoW présents en lignes (MUST / SHOULD / COULD / WON'T) | ☑ Oui | 4 lignes avec définition et engagement sprint |
| MVP MUST contient bien les 6 features F1-F6 imposées (vérifiable au Vision Board) | ☑ Oui | US-01→US-06 = F1→F6, tracées dans le tableau de cohérence |
| SHOULD R2 contient au moins 3 stories alignées avec les 10 pistes Release 2 officielles | ☑ Oui | US-09 (#4 niveaux) · US-11 (#5 explication) · US-12 (#12 export RGPD) · US-10 (timer) |
| COULD R2 contient au moins 3 stories nice-to-have crédibles | ☑ Oui | US-13 (OAuth) · US-14 (partage) · US-15 (questions ouvertes) · US-16 (Anki) |
| WON'T contient au moins 2 stories explicitement reportées avec justification | ☑ Oui | US-19 (SAML B2B R3+) · US-20 (Whisper coûteux) · US-21 (multi-joueurs hors cible) · US-24 (thème sombre déjà livré) |
| Chaque story est taguée avec un ID (US-XX) pour traçabilité Product Backlog | ☑ Oui | US-01 à US-24 — 24 stories taguées |
| La Story Map a été co-créée en équipe (toutes les voix entendues, pas un solo) | ☑ Partiel | À valider collectivement avant soumission PO |
| La cohérence MVP F1-F6 ↔ Vision Board ↔ Customer Journey est vérifiée | ☑ Oui | Tableau de cohérence §5 — liens explicites vers les 3 artefacts |

