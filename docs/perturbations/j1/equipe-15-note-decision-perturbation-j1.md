# Note de décision - Perturbation J1
**Projet EduTutor IA · Équipe 15 · Semaine APOCAL'IPSSI 2026**

---

## IDENTIFICATION

| Champ | Valeur |
|---|---|
| **Équipe n°** | 15 |
| **Membres** | Yoann CURTY, Zouayobo DALI, Killian OCTAU, Antoine BLAIN, Maxence GIROUD, Hyndi FANNIR, BOUYABRI Mohamed |
| **Perturbation** | J1 - Persona enseignante (Mme Lefèvre) |
| **Reçue le** | Lundi 30/06/2026 à 14h00 |
| **Décision prise le** | Lundi 30/06/2026 à 15h00 |
| **Statut** | Validé équipe |

---

## 1. Contexte de la perturbation

Le sponsor a transmis à 14h00 le message suivant :

> « Bonne nouvelle ! Votre démo de cadrage de ce matin a beaucoup plu au sponsor. Il en a parlé pendant le déjeuner à son amie **Mme Sophie Lefèvre, 42 ans, enseignante en BTS Communication à Lyon**. Elle est enthousiaste : *"C'est exactement l'outil qu'il me faut pour suivre la progression de mes 28 étudiants en révision d'examens. Je veux pouvoir voir leurs scores, repérer ceux qui décrochent, et leur envoyer des conseils."*
> Le sponsor vous demande d'intégrer cette cible secondaire dans votre cadrage et dans votre Release 1. »

**Besoins exprimés par Mme Lefèvre :**
1. Voir les scores de ses 28 étudiants
2. Identifier ceux qui décrochent
3. Leur envoyer des conseils

---

## 2. Décision - Hiérarchie des personas

### Décision retenue : **2 personas co-primaires**

| Rang | Persona | Statut avant J1 | Statut après J1 |
|---|---|---|---|
| **Co-primaire 1** | Léa Martin (étudiante, 20 ans) | Primaire | Inchangée |
| **Co-primaire 2** | Mme Sophie Lefèvre (enseignante, 42 ans) | Secondaire | **Promue co-primaire** |
| Tertiaire | M. David Chen (directeur, 51 ans) | Tertiaire | Inchangé |

### Règle d'arbitrage (obligatoire avec 2 co-primaires)

> **En cas de conflit UX entre les deux personas, Léa (Persona 1) prime.**
> Justification : le MVP étudiant (F1–F6) est déjà engagé et en cours de développement en Sprint 1. Toute décision qui dégraderait l'expérience autonome de Léa pour satisfaire le besoin de supervision de Mme Lefèvre serait rejetée en Sprint Review.

### Alternatives écartées

| Alternative | Raison du rejet |
|---|---|
| Mme Lefèvre seule primaire | Invaliderait les 25 SP déjà engagés sur le MVP étudiant - recommencer à zéro = anti-pattern agile |
| Mme Lefèvre secondaire (inchangée) | Ne répond pas à la demande explicite du sponsor ; laisserait ses besoins core sans couverture R1 |

---

## 3. Priorisation MoSCoW des stories enseignant

| US | Libellé (résumé) | MoSCoW | SP | Sprint | Justification |
|---|---|---|---|---|---|
| **US-T01** | Modéliser entité `Classe` + `User.role` | MUST (tech) | 3 | S1 | Prérequis bloquant pour toutes les stories teacher - sans migration Django en S1, US-25/26 ne peuvent pas démarrer en S3 |
| **US-25** | Dashboard classe (scores + taux complétion) | MUST | 5 | S3 | Besoin core Mme Lefèvre n°1 ("voir leurs scores") - sans dashboard, la persona co-primaire n'a aucune valeur dans R1 |
| **US-26** | Alertes décrocheurs (score < 5/10) | MUST | 3 | S4 | Besoin core Mme Lefèvre n°2 ("repérer ceux qui décrochent") - couplé au dashboard, faible effort additionnel |
| **US-27** | Envoyer un conseil à un étudiant | SHOULD | 5 | S6 | Besoin n°3 de Mme Lefèvre, mais implémentable via email externe en attendant - non bloquant pour R1 |
| **US-28** | Historique quiz par étudiant de la classe | COULD | 3 | S7 | Nice-to-have : apporte de la granularité au dashboard mais n'est pas un besoin exprimé explicitement par Mme Lefèvre |

**Total stories teacher ajoutées : 5 · Total SP : 19 SP**

---

## 4. Analyse d'impact sur le scope et la capacité

### Trade-off : neutralité budgétaire en SP

| Action | SP | Direction |
|---|---|---|
| US-T01 + US-25 + US-26 intègrent R1 (MUST) | +11 SP | ↑ Entrée |
| US-16 (flashcards Anki, 8 SP) sort de R1 → R2 | −8 SP | ↓ Sortie |
| **Delta net R1** | **+3 SP** | Acceptable |

**Scope engagé R1 : 56 SP → 59 SP** (+5 % - dans la marge de vélocité de l'équipe)

### Impact par sprint

| Sprint | Avant J1 | Après J1 | Delta |
|---|---|---|---|
| S1 | US-01 + US-02 = 8 SP | + US-T01 = **11 SP** | +3 |
| S3 | US-04 + US-05 = 6 SP | + US-25 = **11 SP** | +5 |
| S4 | US-06 = 3 SP | + US-26 = **6 SP** | +3 |
| S6 | US-09 + US-11 | + US-27 si capacité | optionnel |

### Prérequis technique critique (signalé par revue indépendante)

US-25 et US-26 supposent une entité `Classe` dans le schéma Django qui n'existe pas dans le kit. Insérer cette migration en S3 sans préparation provoquerait des régressions sur US-01/02/03 déjà livrés.

**Solution retenue : US-T01 en Sprint 1** - la modélisation `Classe` est traitée comme une dette technique prioritaire dès S1, avant que la fonctionnalité teacher soit développée.

---

## 5. Récapitulatif des fichiers modifiés

Tous les artefacts du cadrage modifiés en v1.1 le 30/06/2026 à 15h00. Les contenus étudiants (Léa Martin) sont **strictement conservés** - seuls des éléments enseignant ont été ajoutés.

| Fichier | Version avant | Version après | Nature de la modification |
|---|---|---|---|
| `equipe-15-personas.md` | v1.0 | v1.1 | Titres : "primaire" → "co-primaire 1" · "secondaire" → "co-primaire 2" · Ajout règle d'arbitrage |
| `equipe-15-customer-journey-maps-v1.0.md` | v1.0 | v1.1 | Titres mis à jour · Étape 4 Mme Lefèvre enrichie (dashboard + alertes) |
| `equipe-15-story-map-v1.0.md` | v1.0 | v1.1 | Colonne 7 "Suivre sa classe" ajoutée · US-25/26 en MUST · US-27 SHOULD · US-28 COULD · US-29 WON'T · US-16 étiqueté → R2 |
| `equipe-15-product-backlog.md` | v1.0 | v1.1 | EP-07 ajouté · US-T01 + US-25 + US-26 en MUST · US-27 en SHOULD · US-28 en COULD · US-16 → R2 · Scope 56 → 59 SP |
| `equipe-15-release-planning-v1.0.md` | v1.0 | v1.1 | S1 +US-T01 · S3 +US-25 · S4 +US-26 · burnup scope 56 → 59 SP |
| `equipe-15-product-vision-board-v1.0.md` | v1.0 | v1.1 | §2.1 "Cible primaire" → "Cible co-primaire 1" · §2.2 "Cible secondaire" → "Cible co-primaire 2" + note J1 · §3.2 2 nouveaux besoins enseignant (dashboard + alertes) · §4.2 mention F7/F8 ajoutées R1 |

---

## 6. Critères d'acceptation de la perturbation (auto-évaluation)

| CA | Description | Couvert ? | Preuve |
|---|---|---|---|
| **CA-J1-1** | Fiche persona Mme Lefèvre avec 6 dimensions | ✅ | `equipe-15-personas.md` §2 - 6 sections (identité, contexte, compétences, frustrations, objectifs, critères succès) |
| **CA-J1-2** | Customer Journey Mme Lefèvre, 5 étapes min | ✅ | `equipe-15-customer-journey-maps-v1.0.md` §2 - 5 étapes Découverte → Recommandation |
| **CA-J1-3** | Story Map actualisée avec stories enseignant | ✅ | `equipe-15-story-map-v1.0.md` v1.1 - colonne 7 avec US-25/26/27/28/29 |
| **CA-J1-4** | 3+ nouvelles US au format INVEST | ✅ | US-25, US-26, US-27, US-28 (4 US) - format INVEST complet |
| **CA-J1-5** | Priorisation MoSCoW visible et argumentée | ✅ | Section 3 de cette note + colonnes MoSCoW dans le backlog |
| **CA-J1-6** | Note de décision écrite et argumentée | ✅ | Ce document |
| **CA-J1-7** | Artefacts existants conservés (non écrasés) | ✅ | Contenu Léa Martin intact dans tous les artefacts · git history préserve v1.0 |
