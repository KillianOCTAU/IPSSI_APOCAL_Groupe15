# Product Vision Board - EduTutor IA
**Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum**

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 15 |
| **Membres** | Yoann CURTY, Zouayobo DALI, Killian OCTAU, Antoine BLAIN, Maxence GIROUD, Hyndi FANNIR,  BOUYABRI Mohamed |
| **Sprint concerné** | Cadrage (J1 matin) |
| **Version** | v1.1 |
| **Date de remise** | 29/06/2026 |
| **Statut** | Draft |

---

## 1. Vision

### 1.1. Vision EduTutor IA - version équipe 15

> Permettre à chaque étudiant·e du supérieur de transformer **en moins de 5 minutes** n'importe quel cours en quiz de révision personnalisé et à chaque enseignant·e de produire des évaluations variées sans effort tout en garantissant que **aucune donnée pédagogique ne quitte jamais leur établissement**.

**Justification :** La promesse centrale est double, vitesse pour l'étudiant (5 min vs 2-4 h de travail manuel) et souveraineté des données (Ollama local, zéro cloud obligatoire). Ces deux axes sont directement traçables dans le code : `llm/services/ollama_client.py` pour le local-first, `llm/services/quiz_prompt.py` pour la génération en une seule passe.

---

## 2. Target Group (cibles utilisateurs)

### 2.1. co-primaire 1 - Étudiant·e du supérieur

| Attribut | Détail |
|:--|---|
| **Profil** | 18-25 ans · L1-M2 (Bac+1 à Bac+5) · usage smartphone et laptop quotidien · budget limité |
| **Volume FR** | ~2,7M d'étudiants dans le supérieur (chiffres MESR 2024) |
| **Pain point** | 5h à 15h/semaine consacrées à chercher ou créer des supports de révision ; peu de feedback immédiat sur leurs lacunes |
| **Critère clé** | **Confidentialité des données** (ne veut pas que ses notes de cours soient aspirées par un cloud étranger) + **disponibilité hors connexion** (révision en transports) + **gratuité ou coût nul** |

### 2.2. co-primaire 2 - Enseignante Mme Lefèvre (persona émergente J1)

| Attribut | Détail |
|---|---|
| **Profil** | 35-55 ans · lycée privé sous contrat / BTS / supérieur · maîtrise modérée du numérique · charge de travail élevée |
| **Volume FR** | ~770 000 enseignants tous niveaux (Éducation nationale 2024) |
| **Pain point** | ~12h/mois en correction et préparation de supports d'évaluation variés ; manque de diversité dans les types de questions proposées aux élèves |
| **Critère clé** | **Interface simple** (sans courbe d'apprentissage), **conformité RGPD** (données élèves protégées), **export Word/PDF** pour intégration dans les outils existants |

### 2.3. Cible tertiaire - Établissement scolaire (acheteur B2B)

| Attribut | Détail |
|---|---|
| **Profil** | Direction de lycée privé · responsable pédagogique d'école supérieure · DSI d'ENT scolaire |
| **Volume FR** | ~7 500 lycées + ~3 500 établissements supérieurs |
| **Pain point** | Budget edtech contraint (< 5 €/élève/an) + obligation RGPD non négociable + risque juridique lié aux données élèves hébergées hors UE |
| **Critère clé** | **Décideur identifié** : chef d'établissement ou responsable pédagogique numérique · **cycle d'achat** : 3-6 mois (budget annuel) · **prérequis bloquant** : hébergement UE + DPA signable |

---

## 3. Needs (besoins résolus)

### 3.1. Besoins de la cible primaire 1 (Étudiant)

1. **Générer en moins de 5 min un quiz de révision** sur n'importe quel chapitre d'un cours fourni (PDF ≤ 5 Mo ou texte ≥ 200 caractères)
2. **Identifier ses lacunes par chapitre** avant un examen, sans correcteur humain - *page `/review`*
3. **Réviser hors-ligne** (transports, lieu sans wifi) grâce au modèle Ollama qui tourne localement
4. **Consulter son historique de progression** pour mesurer ses progrès dans le temps - *dashboard `/dashboard`*
5. **Obtenir un feedback immédiat** (bonne/mauvaise réponse, explication) après chaque question

### 3.2. Besoins de la cible primaire 2 (Enseignant)

1. **Préparer des supports d'évaluation variés** (quiz, QCM, questions ouvertes) en gagnant au moins **2h par semaine** sur la préparation
2. **Adapter automatiquement le niveau de difficulté** au niveau de la classe (L1 vs M2) - *piste Release 2 n°4 « Niveaux de difficulté »*
3. **Partager un quiz** avec ses étudiants par simple lien sans compte obligatoire - *piste Release 2 n°14 « Partage de quiz »*
4. **Garder la maîtrise des données de ses élèves** : aucun contenu de cours ne transite par un serveur hors UE

### 3.3. Besoins de la cible tertiaire (Établissement)

1. **Disposer d'un outil edtech RGPD conforme**, sans transfert de données hors UE - *garanti par le mode Ollama local*
2. **Tarification prévisible par élève / par an**, sans surprise budgétaire (modèle SaaS B2B ou licence annuelle)
3. **Déploiement simplifié** sur infrastructure propre (Docker Compose + VPS OVH) sans dépendance cloud propriétaire 

---

## 4. Product (le produit en 3-5 traits)

### 4.1. Caractéristiques signature d'EduTutor IA

1. **Génération de 10 QCM en moins de 60 s** à partir d'un cours fourni (PDF ou texte), corrigés et notés automatiquement
2. **100 % local via Ollama** (Llama 3.1 8B par défaut) - aucune donnée ne quitte le serveur de l'établissement 
3. **Interface mobile-first** et hors-ligne friendly, avec tableau de bord de progression et révision ciblée des erreurs
4. **Configuration LLM à chaud sans redéploiement** : un administrateur change de fournisseur ou de modèle depuis l'interface `/admin`, effet immédiat - *`llm/models.py` LLMConfig singleton*
5. **Pipeline de validation anti-hallucination** : toute sortie LLM est parsée et validée (10 questions, 4 options, index valide) avant d'atteindre l'utilisateur - *`llm/services/quiz_prompt.py::parse_and_validate_quiz`*

### 4.2. MVP must-have - Release 1 (mercredi soir)

| # | Feature | Statut kit |
|---|---|---|
| F1 | Inscription / connexion **par email** (Django Auth, validation email, reset MDP, profil) | ✅ Livré |
| F2 | Saisie d'un cours : upload PDF ≤ 5 Mo OU texte ≥ 200 caractères | ✅ Livré |
| F3 | Génération automatique d'un quiz de 10 QCM via LLM local (Ollama Llama 3.1 8B) | ✅ Livré |
| F4 | Soumission et correction automatique (une bonne réponse par QCM) | ✅ Livré |
| F5 | Affichage du score /10 + détail bonnes/mauvaises réponses | ✅ Livré |
| F6 | Historique persisté des quizz par utilisateur (date, cours, score) | ✅ Livré |

> ⚠️ Le kit livre ~30 % du MVP « câblé ». Les finitions UX, les pages légales (RGPD, CGU, mentions, cookies), le durcissement sécurité (prompt injection → perturbation J3) et le choix définitif du fournisseur LLM (ADR → perturbation J2) restent à compléter.

### 4.3. Pistes Release 2 - Sélection équipe 15 (2 candidates + 1 bonus)

| Priorité | Piste (catalogue `docs/08-mvp2-idees.md`) | Complexité | Justification |
|---|---|---|---|
| 🥇 **Candidate 1** | **#5 Explication des réponses** | 🟡 Moyenne | Transforme le quiz d'un simple outil d'évaluation en vrai outil d'apprentissage ; demande un second champ LLM dans le prompt - faisable en 1 sprint |
| 🥈 **Candidate 2** | **#4 Niveaux de difficulté** | 🟡 Moyenne | Répond directement au besoin enseignant (adapter au niveau de la classe) ; ne nécessite que d'enrichir `quiz_prompt.py` et un champ `difficulty` sur `Quiz` |
| 🥉 **Bonus** | **#14 Partage de quiz** | 🟡 Moyenne | Crée de la viralité organique (lien de partage) et répond au besoin enseignant de diffuser un quiz sans obliger les élèves à créer un compte |

---

## 5. Business Goals (objectifs de succès)

### 5.1. Objectifs d'adoption

| KPI | Cible | Échéance |
|---|---|---|
| Étudiants actifs hebdomadaires (WAU) | **500 WAU** | T+6 mois |
| Étudiants actifs hebdomadaires (WAU) | **2 000 WAU** | T+12 mois |
| Taux de rétention J+7 | **≥ 35 %** des inscrits reviennent dans la semaine suivant l'inscription | T+6 mois |
| Quizz générés par semaine | **≥ 1 500 quiz/semaine** | T+9 mois |

### 5.2. Objectifs de satisfaction

| KPI | Cible | Échéance |
|---|---|---|
| Net Promoter Score (NPS) | **NPS > 35** (cible standard edtech : NPS > 30) | T+9 mois |
| Qualité contenu | **< 5 %** de quiz signalés « erreur factuelle » | T+6 mois |
| Temps moyen de génération | **< 90 s** pour 10 QCM en mode Ollama local | Dès Release 1 |

### 5.3. Objectifs business (long terme)

| KPI | Cible | Échéance |
|---|---|---|
| Contrats B2B établissements | **≥ 3 établissements** sous contrat | T+12 mois |
| Coût d'acquisition (CAC) | **CAC < 8 €** par utilisateur converti (canal organique + bouche-à-oreille) | T+12 mois |
| Modèle de revenus | **Freemium** : usage illimité Ollama local gratuit ; plan « Pro établissement » à 3 €/élève/an avec support + hébergement géré | T+6 mois |

---

## 6. Différenciateurs vs concurrents

### 6.1. Cartographie des concurrents

| Concurrent | Positionnement | Limite identifiée |
|---|---|---|
| **Wilgo.ai** | Compagnon IA français pour étudiants, interface conversationnelle | Cloud, dépendance OpenAI, données hors UE - incompatible B2B éducation FR |
| **Leo (iamleo.ai)** | Tuteur IA Bac/sup ancré sur programmes français | Cible étudiants uniquement, pas d'angle enseignant, pas de mode local |
| **Quizlet AI** | Cartes mémoire et quiz IA, pionnier US, 60M d'utilisateurs | Pas d'ancrage sur cours fourni par l'utilisateur, focus marché US, RGPD flou |
| **Khanmigo** | Tuteur IA Khan Academy, lancé 2023, pédagogie socratique | US-first, conformité RGPD UE floue, pas d'upload de cours propres |

### 6.2. Nos 3 différenciateurs argumentés

**Différenciateur 1 - Prompt enseignant (« teacher-first »)**

Les concurrents sont « étudiant-first » : l'élève pose une question, l'IA résume. EduTutor inverse la logique : c'est **l'enseignant (ou l'étudiant) qui fournit son cours**, et l'IA produit un support d'évaluation *ancré sur ce cours précis*. Aucun concurrent ne propose de générer 10 QCM à partir d'un document propriétaire en moins d'une minute. Notre prompt système (`SYSTEM_PROMPT` dans `llm/services/quiz_prompt.py`) est conçu pour des QCM pédagogiques francophones stricts - pas une IA généraliste qui improvise.

**Différenciateur 2 - Pédagogie ancrée (RAG sur cours fourni)**

Les LLM bruts hallucinent sur des chiffres, des dates et des concepts spécifiques. EduTutor s'engage à **ancrer chaque question dans le texte fourni** (`build_user_prompt` injecte le corpus complet, tronqué à 8 000 caractères pour les petits modèles). Chaque question est traçable à une source. La validation stricte post-génération (`parse_and_validate_quiz`) garantit qu'aucune question malformée n'atteint l'utilisateur - un niveau de fiabilité que les chatbots généralistes ne peuvent pas offrir.

**Différenciateur 3 - RGPD local-first (non négociable pour le B2B éducation)**

Wilgo, Leo, Quizlet AI et Khanmigo utilisent tous OpenAI ou Anthropic : **les données (cours, questions, réponses) quittent l'UE**. EduTutor tourne par défaut sur **Ollama local** - aucune donnée ne sort du serveur de l'établissement. C'est le prérequis non négociable pour signer un contrat avec un établissement scolaire français (RGPD + recommandations CNIL). Pour les équipes sans GPU, 7 fournisseurs cloud européens ou conformes sont disponibles (`groq`, `mistral`, `gemini`) avec switch à chaud depuis l'interface admin.

---

## ✅ Grille d'auto-évaluation

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| La Vision tient en 1 phrase mémorable et survit aux releases | ☑ Oui | Section 1.1 : orientée bénéfice (5 min + souveraineté), pas technique |
| Les 3 niveaux de cibles sont décrits avec profil + volume + pain point | ☑ Oui | Sections 2.1, 2.2, 2.3 : 3 attributs + critère décision |
| Au moins 3 besoins par cible formulés en verbes d'action mesurables | ☑ Oui | §3.1 : 5 besoins · §3.2 : 4 · §3.3 : 3, tous mesurables |
| Le produit décrit en 3-5 caractéristiques signature | ☑ Oui | §4.1 : 5 traits, aucune liste de technos |
| Les 6 features F1-F6 rappelées et 2-3 pistes Release 2 identifiées | ☑ Oui | §4.2 tableau + §4.3 tableau avec 3 candidates justifiées |
| Les Business Goals comportent au moins 3 KPI chiffrés et datés | ☑ Oui | §5.1 : 4 KPI · §5.2 : 3 · §5.3 : 3 (9 KPI au total) |
| Les 4 concurrents cartographiés avec positionnement + limite | ☑ Oui | §6.1 tableau 4 concurrents |
| Les 3 différenciateurs argumentés au-delà du slogan | ☑ Oui | §6.2 : chaque différenciateur lié à un fichier du code |
| Document relu et validé par l'équipe complète | ☑ Partiel | À valider collectivement en équipe avant soumission PO |

