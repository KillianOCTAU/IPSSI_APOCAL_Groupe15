# Fiches Personas — EduTutor IA
**Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum**

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 15 |
| **Membres** | Yoann CURTY, Zouayobo DALI, Killian OCTAU, Antoine BLAIN, Maxence GIROUD, Hyndi FANNIR,  BOUYABRI Mohamed |
| **Sprint concerné** | Cadrage (J1 matin) |
| **Version** | v1.0 (initiale) |
| **Date de remise** | 29/06/2026 13h00 |
| **Statut** | Draft |

---

## 1. Persona primaire — Étudiant·e du supérieur

### 1.1. Identité

| Attribut | Détail |
|---|---|
| **Nom / Prénom** | Léa Martin (fictif) |
| **Âge** | 20 ans |
| **Profession** | Étudiante en L2 droit, Paris II Panthéon-Assas |
| **Localisation** | Paris 5ᵉ · trajet quotidien RER B 35 min |
| **Situation** | Boursière échelon 4, colocation 3 personnes |
| **Photo / avatar** | <img src="../img/lea_profile_picture.png" alt="Avatar de Léa Martin" width="120" /> |

### 1.2. Contexte d'usage

- Smartphone Android personnel (Samsung A53), wifi domestique fluide, 4G dans le RER
- Laptop emprunté à la BU 2 fois/semaine (pas d'ordinateur perso)
- Travaille en silence chez elle ou en BU, écoute parfois Lo-Fi via Spotify
- Révise principalement en soirée 19h–22h et le dimanche après-midi
- **Volume horaire de révision : ~8h/semaine**, dont ~3h perdues à chercher ou adapter des fiches trouvées en ligne. Ne sait jamais si le contenu correspond au programme de son année en cours.

### 1.3. Compétences numériques

- Power user smartphone (Instagram, TikTok, BlaBlaCar, Doctolib, ENT université)
- Autonome sur Moodle et l'ENT université, importe fichiers PDF/Word sans souci
- A testé ChatGPT 4–5 fois pour des résumés, sans en faire un usage régulier
- Allergique aux installations CLI ou paramétrages techniques avancés
- **Utilise Notion pour prendre ses cours et les partager via Google Drive** avec ses camarades ; à l'aise pour exporter en PDF depuis Notion ou Word — c'est exactement le format attendu par F2 (`upload PDF ≤ 5 Mo`)

### 1.4. Frustrations / pain points (chiffrés)

- Perd ~3h/semaine à chercher des fiches de révision sur internet, qualité aléatoire
- Les fiches trouvées en ligne sont rarement à jour avec sa promo (cours change chaque année)
- Se sent surchargée à 3 semaines des partiels, sans plan de révision personnalisé
- Ne sait pas mesurer si elle « connaît » un chapitre ou si elle « croit » le connaître
- **A essayé ChatGPT pour générer des quiz sur ses cours de droit, mais les questions sortaient du cours (jurisprudences inventées, dates fausses)** → perte de confiance totale dans les outils IA non ancrés sur son document. C'est précisément le pain point qu'adresse `parse_and_validate_quiz` + l'injection du corpus complet dans le prompt.

### 1.5. Objectifs (jobs-to-be-done, SMART)

- Générer un quiz de révision sur n'importe quel chapitre de son cours en **moins de 5 minutes**
- Identifier ses lacunes par chapitre **2 semaines avant les partiels** (vs 3 jours avant aujourd'hui)
- Gagner **~2h/semaine** sur la recherche de supports (vs 3h aujourd'hui)
- **Pouvoir réviser dans le RER sans connexion** (Ollama tourne en local sur le serveur de l'appli — pas de dépendance réseau côté client) — critère différenciateur direct vs Quizlet AI ou Wilgo

### 1.6. Critères de succès personnels (point de vue Léa)

- « Si je gagne au moins 1h/semaine sur ma préparation, j'adopte. »
- « Si ça plante 1 fois en bibliothèque devant mes amies, je n'y reviens jamais. »
- « Si je peux l'utiliser dans le RER sans wifi, c'est un game changer. »
- **« Si les questions sont vraiment tirées de MON cours de droit et pas inventées par l'IA, j'ai enfin confiance dans un outil de révision. »** — ce critère justifie directement l'ancrage RAG sur le corpus fourni et la validation stricte des sorties LLM.

---

## 2. Persona secondaire — Enseignant·e (persona émergente J1)

### 2.1. Identité

| Attribut | Détail |
|---|---|
| **Nom / Prénom** | Mme Sophie Lefèvre (persona officielle perturbation J1) |
| **Âge** | 42 ans |
| **Profession** | Professeure de Communication, BTS, lycée privé sous contrat |
| **Localisation** | Lyon · trajet voiture 25 min · établissement Lyon 6ᵉ |
| **Situation** | Mariée, 2 enfants (12 et 15 ans), salaire ~2 700 € net/mois |
| **Photo / avatar** | <img src="../img/sohpie_lefèvre.png" alt="Avatar de Sophie Lefèvre" width="120" /> |

### 2.2. Contexte d'usage

- 28 étudiants dans sa classe BTS Communication 1ʳᵉ année
- 6h de cours/semaine + ~3h de préparation + ~3h de correction = **12h/semaine de charge effective**
- Salle informatique disponible mais réseau lent (4G partagée pour les étudiants)
- Smartphones Android personnels chez les étudiants (mix de modèles 2018–2023)
- **Prépare ses cours sur son MacBook Air personnel depuis chez elle, transfère sur clé USB vers la salle informatique** — n'a pas accès à un serveur de l'établissement depuis chez elle. L'interface web d'EduTutor (React + Django API) est donc son seul point d'accès, depuis n'importe quel navigateur.

### 2.3. Compétences numériques

- Power user Word + Excel, autonome sur Moodle et Pronote
- Pas développeuse, allergique aux installations CLI
- Découvre l'IA générative (a testé ChatGPT 2 fois)
- Suit l'actualité edtech via Twitter/X et la newsletter Café Pédagogique
- **A suivi une formation PAFPEN « Numérique en classe » en 2023** : sait utiliser des outils en ligne simples (Canva, Wooclap, Kahoot) mais n'ira jamais au-delà d'un formulaire web. Seuil de tolérance à la complexité : si ça prend plus de 3 clics pour générer un quiz, elle abandonne.

### 2.4. Frustrations / pain points (chiffrés)

- Corrige 28 copies × 3 quiz/semaine = **~12h de correction/mois**
- Préparation chronophage : créer 1 quiz cohérent avec ses propres cours prend **~90 minutes** (Word, mise en forme, vérification, export)
- Pas de variation des questions : les étudiants se passent les corrigés sur WhatsApp entre les sessions → elle doit recréer un quiz différent à chaque cours
- Frustration d'avoir des quiz « plats » alors qu'elle aimerait varier niveaux et types
- **Les étudiants se passent les réponses sur un groupe WhatsApp de promo entre deux sessions de cours.** Elle a besoin de quiz différents à chaque séance — EduTutor peut générer une variante en 60 s à partir du même cours, ce qu'elle ne peut pas faire manuellement.

### 2.5. Objectifs (jobs-to-be-done, SMART)

- Générer **1 quiz personnalisé en moins de 5 minutes** sur n'importe quel chapitre de son cours
- Personnaliser : niveau, nombre de questions, type (QCM / vrai-faux / questions ouvertes) — *piste Release 2 : niveaux de difficulté (#4) + types de questions (#6)*
- Suivre l'engagement de la classe (qui a répondu, score moyen, lacunes communes) — *piste Release 2 : tableau de bord agrégé enseignant*
- **Exporter le quiz en PDF ou Word** pour l'imprimer ou le poster sur Pronote sans obliger les étudiants à créer un compte — *piste Release 2 : partage de quiz par lien (#14) + export PDF*

### 2.6. Critères de succès personnels (point de vue Sophie)

- « Si je gagne 1h/semaine sur ma préparation, j'adopte définitivement. »
- « Si ça plante 1 fois en cours devant 28 ados, je n'y reviens jamais. »
- « Si je peux exporter en Word pour l'imprimer en salle des profs, c'est parfait. »
- **« Si mes étudiants passent le quiz sur leur téléphone sans me demander comment ça marche, c'est gagné. »** — ce critère valide directement l'impératif mobile-first et l'UX zéro-friction de l'interface React.

---

## 3. Persona tertiaire — Établissement scolaire (acheteur B2B)

### 3.1. Identité

| Attribut | Détail |
|---|---|
| **Nom / Prénom** | M. David Chen (fictif) |
| **Âge** | 51 ans |
| **Profession** | Directeur des études, lycée privé sous contrat (1 200 élèves) |
| **Localisation** | Lyon 6ᵉ · même établissement que Mme Lefèvre |
| **Situation** | Marié, enfants grands, 25 ans d'expérience dans l'enseignement |
| **Photo / avatar** | <img src="../img/david_chen.png" alt="Avatar de David Chen" width="120" /> |

### 3.2. Contexte d'achat

- Budget edtech ~12 000 €/an pour l'ensemble du lycée (10 €/élève × 1 200)
- Cycle d'achat : **6 mois minimum** (validation pédagogique → DPO → comptabilité → CA)
- Décide en concertation avec 3 acteurs : conseil pédagogique, DPO, gestionnaire financier
- Choisit les outils edtech **1 fois/an**, en mai/juin pour la rentrée de septembre
- **L'établissement appartient à un réseau de 12 lycées Ogec (Ouest/Rhône).** Toute décision d'achat peut être mutualisée sur 12 établissements si la pilote est concluante — un contrat cadre signé représenterait ~14 400 élèves. Ce levier B2B est direct.

### 3.3. Compétences numériques

- Utilisateur courant ENT/Pronote, gère les comptes profs et élèves
- Pas technique, fait confiance au DSI mutualisé du réseau Ogec
- Lit les CGV/CGU, exige des engagements RGPD écrits (DPA signable)
- **A géré la migration vers Pronote en 2019** pour tout le lycée : sait qu'un déploiement sans documentation technique claire conduit à 6 mois de support douloureux. Exige un `docs/` complet et un interlocuteur technique joignable — le dossier `docs/11-deploiement-vps-ovh.md` répond directement à cette attente.

### 3.4. Frustrations / pain points

- A déjà signé pour 2 outils edtech qui ont fermé en cours d'année (risque pérennité)
- DPO refuse systématiquement les outils utilisant OpenAI ou des LLM US (transferts hors UE)
- Pression du conseil d'administration pour démontrer une « stratégie IA pédagogique »
- Profs râlent quand on impose un nouvel outil → besoin d'adhésion préalable (Mme Lefèvre doit tirer, pas être poussée)
- **Un outil de quiz en ligne utilisé par 400 élèves a fermé en mars 2025** en milieu d'année scolaire, laissant les profs sans solution du jour au lendemain. Ce traumatisme rend la pérennité et l'hébergement autonome (Docker auto-hébergé) non-négociables — EduTutor sur VPS propre répond exactement à ce besoin.

### 3.5. Objectifs (jobs-to-be-done)

- Disposer d'un outil edtech IA **RGPD conforme**, signable sans risque juridique (Ollama local = aucune donnée hors UE)
- **Tarification prévisible par élève / par an**, sans surprise au renouvellement
- Adhésion d'**au moins 30 % des profs** dès la première année (sinon échec budgétaire)
- **Disposer d'une documentation technique suffisante** pour que le DSI mutualisé déploie EduTutor sur le VPS du réseau Ogec sans support externe — `docs/11-deploiement-vps-ovh.md` + Docker Compose sont la réponse directe.

### 3.6. Critères de succès personnels (point de vue David)

- « Si le DPO valide les CGV en 30 min de lecture, c'est un signal positif. »
- « Si 5 profs me demandent spontanément d'élargir l'usage, je signe le renouvellement. »
- « Si je peux dire au CA "on est en avance sur l'IA" sans mentir, c'est gagné. »
- **« Si je peux proposer la solution aux 11 autres lycées du réseau Ogec sans tout recommencer à zéro, EduTutor devient notre standard de groupe. »** — ce critère justifie l'investissement dans l'architecture Docker mutualisable et la documentation de déploiement VPS.

---

## 4. Anti-personas (qui n'est PAS la cible)

### 4.1. Anti-persona du persona Étudiant

**Élève de primaire ou de collège (< 15 ans).** EduTutor exige un cours fourni en PDF ou texte de niveau supérieur, et suppose l'autonomie pour uploader, contextualiser et interpréter un résultat noté /10. Ce profil n'a ni le matériel pédagogique adapté, ni l'autonomie numérique requise. Ne pas chercher à simplifier l'outil pour les attirer : cela dégraderait l'expérience de la cible primaire sans créer de valeur mesurable.

### 4.2. Anti-persona du persona Enseignant

**Enseignant·e du primaire ou autodidacte en formation continue.** Le bénéfice central — générer des quiz pour évaluer une classe de 28 étudiants plusieurs fois par semaine — n'existe pas dans ces contextes. Le primaire impose des formats pédagogiques très différents (oral, manipulation, dessin) incompatibles avec un QCM texte. L'autodidacte n'a pas de classe à évaluer. Élargir l'offre dans cette direction diluerait le positionnement sans ROI produit.

### 4.3. Anti-persona du persona Établissement

**École internationale ou startup edtech déjà partenaire OpenAI / Anthropic, sans contrainte RGPD.** Notre différenciation est précisément le local-first et la souveraineté des données. Une structure qui valorise un partenariat OpenAI n'achètera jamais EduTutor, et inversement — ce n'est pas un marché à courir. De même, une école qui externalise toute sa stack IA dans le cloud US ne verra aucune valeur dans Ollama local. Ne pas tenter de convaincre : ce serait un signe d'absence de positionnement.

---

## ✅ Grille d'auto-évaluation

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| Les 3 personas sont nommés concrètement (prénom + nom + âge précis) | ☑ Oui | Léa Martin 20 ans · Sophie Lefèvre 42 ans · David Chen 51 ans |
| Chaque persona comporte les 6 dimensions complétées | ☑ Oui | Sections 1.1→1.6, 2.1→2.6, 3.1→3.6 |
| Le contexte précise un volume horaire et un environnement physique | ☑ Oui | §1.2 : 8h/semaine, RER + BU · §2.2 : 12h/semaine, salle info + MacBook · §3.2 : cycle 6 mois, réseau Ogec |
| Les compétences numériques sont nuancées | ☑ Oui | §1.3 : power user mobile, allergique CLI · §2.3 : PAFPEN 2023, seuil 3 clics · §3.3 : migration Pronote 2019 |
| Les frustrations sont chiffrées (heures, nombres, fréquences) | ☑ Oui | §1.4 : 3h/semaine perdues · §2.4 : 12h/mois correction, 90 min/quiz · §3.4 : 2 outils fermés, 400 élèves impactés |
| Les objectifs respectent au moins partiellement le format SMART | ☑ Oui | §1.5 : 5 min, 2 semaines avant, 2h gagnées · §2.5 : 5 min, 1h/semaine · §3.5 : 30 % adoption, 6 mois |
| Les critères de succès sont formulés au "je" (point de vue persona) | ☑ Oui | Chaque §x.6 contient au moins 4 citations entre guillemets |
| Les 3 anti-personas sont décrits avec justification | ☑ Oui | §4.1, 4.2, 4.3 : profil exclu + raison explicite + conséquence produit |
| Document relu et validé par l'équipe complète | ☑ Partiel | À valider collectivement avant soumission PO |
