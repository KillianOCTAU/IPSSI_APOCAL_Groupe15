# Customer Journey Maps — EduTutor IA
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


## 1. Parcours Étudiant - Léa Martin (co-primaire 1)


| Étape | Actions | Pensées (au « je ») | Émotion | Frictions / Opportunités |
|---|---|---|---|---|
| **1. Découverte** | Voit une story Instagram d'une influenceuse étudiante mentionnant EduTutor IA. Clique sur le lien. | « Encore un outil IA qui promet la lune ? Mais bon, je révise pour mon partiel dans 2 semaines, ça vaut le coup d'essayer. » | 😐 Curieuse, sceptique | 🚧 Landing page trop technique (jargon LLM/Ollama visible). 💡 Preuve sociale : témoignages étudiants + note /5 affichée dès l'accueil. |
| **2. Inscription** | Crée un compte avec son email universitaire. Mot de passe enregistré dans Bitwarden. Reçoit un email de validation, clique sur le lien. | « Au moins ils ne demandent pas mon numéro de téléphone. RGPD respecté ? Je lis pas les CGV mais j'espère que c'est correct. » | 😐 Vigilante, pressée | 🚧 Pas de SSO Google/Apple — friction à l'entrée pour les habitués. 💡 Mention RGPD courte et lisible pendant l'inscription + badge « données hébergées en France ». |
| **3. 1ʳᵉ utilisation** | Uploade son PDF de droit constitutionnel (340 pages). Lance la génération de 10 QCM sur le chapitre 4. Attend 45 s sans retour visible. | « 340 pages, j'espère que ça va pas planter. Je vois pas la barre de progression depuis 30 s… c'est cassé ? » | 😐 Anxieuse → 😊 Soulagée (quiz reçu, questions pertinentes) | 🚧 Aucun indicateur de progression pendant la génération LLM (Ollama peut prendre 45–90 s en local). 💡 Barre de progression animée + message rassurant « votre quiz est en cours de génération, ~1 min ». |
| **4. Usage régulier** | Génère 3 quiz/semaine sur 5 chapitres différents pendant les 2 semaines avant les partiels. Consulte son historique `/history` et son tableau de bord `/dashboard`. | « J'ai gagné au moins 2h/semaine. Je me sens plus prête qu'avant. Mais dans le RER sans wifi, ça marche pas. » | 😊 Confiante, satisfaite | 🚧 Historique non consultable hors-ligne (l'app est web-only, pas de PWA). 💡 Mode hors-ligne partiel (PWA) ou export PDF du quiz généré — piste Release 2 (#18 PWA). |
| **5. Recommandation** | Partage le lien de l'app à 3 amies de promo dans son groupe WhatsApp. Leur propose de réviser ensemble sur les mêmes chapitres. | « Si ça les aide aussi, on pourra comparer nos scores et faire des sessions de révision communes. » | 😊 Enthousiaste | 🚧 Pas de partage de quiz entre comptes — chaque amie doit re-uploader le même cours. 💡 Partage d'un quiz par lien public (piste Release 2 #14) → viralité organique directe. |

**Moment de décrochage potentiel identifié : Étape 3 (1ʳᵉ utilisation)** — si la génération échoue silencieusement ou dépasse 90 s sans retour visuel, Léa ferme l'onglet et ne revient pas.

**Investissement produit prioritaire :** indicateur de progression visible pendant la génération LLM + message rassurant. Coût : faible (front React uniquement). Valeur : critique pour la rétention au 1er usage.


---


## 2. Parcours Enseignant - Mme Sophie Lefèvre (co-primaire 2)

| Étape | Actions | Pensées (au « je ») | Émotion | Frictions / Opportunités |
|---|---|---|---|---|
| **1. Découverte** | Lit un article du Café Pédagogique sur les outils IA pour enseignants. Note le nom EduTutor IA. En parle à une collègue lors de la pause déjeuner. | « Encore une promesse marketing ? Je veux voir des exemples concrets BTS Communication, pas juste du lycée ou du sup. » | 😐 Curieuse, prudente | 🚧 Pas d'exemples sectoriels (BTS, lycée pro, supérieur) sur la landing page. 💡 Démos segmentées par niveau + témoignage d'un·e prof BTS visible dès l'accueil. |
| **2. Inscription** | Tente de créer un compte directement. Voit qu'il n'y a pas de rôle « enseignant » distinct — crée un compte standard. Attend de savoir si des fonctionnalités enseignant existent. | « 48 h pour une réponse ? S'ils ne sont pas réactifs avant l'achat, comment seront-ils en SAV ? » | 😡 Impatiente, frustrée (point de décrochage) | 🚧 Pas de parcours d'inscription enseignant dédié ni de rôle distinct dans Django Auth actuel. 💡 Compte gratuit immédiat + champ « je suis enseignant·e » lors de l'inscription pour personnaliser l'onboarding. |
| **3. 1ʳᵉ utilisation** | Uploade un cours de Communication non-verbale (PDF 28 pages). Génère 1 quiz de 10 QCM pour tester la qualité avant de l'utiliser avec ses étudiants. | « Si les questions sont mal formulées ou factuellement fausses, je n'y reviens pas. Ça va donner quoi sur un cours de Communication ? » | 😐 Vigilante → 😊 Étonnée (questions pertinentes, bien rédigées) | 🚧 Pas d'aperçu des questions avant de les soumettre aux étudiants — impossible de corriger une question erronée. 💡 Mode « preview + édition manuelle » avant publication du quiz (piste Release 2 : éditeur intégré). |
| **4. Usage régulier** | Génère 3 quiz différents/semaine. Consulte le tableau de bord de sa classe (`/teacher/dashboard`) : voit les 28 scores d'un coup d'œil, trie par score croissant. Reçoit une alerte email : 3 étudiants ont un score moyen < 5/10 sur leurs 3 derniers quiz. Les contacte depuis l'app en 2 clics. | « J'ai gagné 4h/semaine sur la préparation. Je vois en 3 clics qui décroche — je n'ai plus à éplucher 28 copies une par une. Mais si une question est fausse, je passe encore 20 min à la corriger dans Word. » | 😊 Satisfaite, productive, efficace | 🚧 Pas d'édition manuelle d'une question après génération (correction hors app). 💡 Éditeur inline par question — coût faible, valeur critique. ✅ **Dashboard classe (US-25) + alertes décrocheurs (US-26) : frictions majeures de suivi résolues en Release 1 (ajoutées suite perturbation J1).** |
| **5. Recommandation à la direction** | Présente l'outil au conseil pédagogique. Calcule le ROI : 4h/sem × 30 sem × 5 profs = 600h/an économisées. Demande un budget pour passer en compte établissement. | « Si la direction signe, je veux pouvoir prouver le ROI avec des chiffres, pas juste une impression. Et je veux exporter en Word pour le CA. » | 😊 Convaincue, militante | 🚧 Pas de dashboard de ROI exportable (PDF/Excel) pour la direction. 💡 Rapport mensuel automatisé : nb de quiz générés × temps estimé économisé — argument commercial pour M. Chen. |

**Moment de décrochage potentiel identifié : Étape 2 (Inscription)** — absence de rôle enseignant dédié et délai de réponse perçu > 24 h. Pour les enseignants pressés qui testent pendant une pause déjeuner, toute friction à l'entrée est rédhibitoire.

**Investissement produit prioritaire :** self-service inscription enseignant avec onboarding dédié en 5 minutes (champ rôle + tutoriel contextuel). Coût : moyen (nouveau champ User + page onboarding). Valeur : ouvre le segment B2B établissement via les profs ambassadeurs.


---


## 3. Parcours Établissement - M. David Chen (cible tertiaire B2B)


| Étape | Actions | Pensées (au « je ») | Émotion | Frictions / Opportunités |
|---|---|---|---|---|
| **1. Découverte du besoin** | Le CA demande une stratégie IA pédagogique lors du bilan de fin d'année. Mme Lefèvre vient spontanément lui parler d'EduTutor après 6 semaines d'usage. David note le nom et consulte le site. | « Le CA pousse sur l'IA, mais pas question de signer avec un acteur qui utilise OpenAI. Et si l'outil ferme en cours d'année comme le dernier, j'ai un problème politique. » | 😐 Prudent, sous pression CA | 🚧 Pas de garantie écrite RGPD/local-first visible dès la page d'accueil. 💡 Fiche RGPD prête à l'emploi + mention « hébergement sur votre propre serveur, zéro donnée hors UE » en page d'accueil B2B. |
| **2. Évaluation** | Envoie les CGV au DPO mutualisé du réseau Ogec. Demande une démo personnalisée. Compare EduTutor avec 2 autres outils (Wilgo, Quizlet). | « Si le DPO valide les CGV en 30 min de lecture, c'est un signal très positif. Mais si c'est ambigu sur les transferts UE, il bloquera tout. » | 😐 Méticuleux, analytique | 🚧 DPO en congés 3 semaines — cycle bloqué. 💡 Check-list RGPD pré-validée par un cabinet juridique partenaire, format DPA signable en 1 page — élimine le délai DPO. |
| **3. Décision** | Signe le contrat annuel (1 200 élèves × 10 €/an). Valide les modalités de déploiement avec le DSI mutualisé du réseau Ogec. Choisit le déploiement VPS auto-hébergé (doc `11-deploiement-vps-ovh.md`). | « Si dans 6 mois je dois reculer, c'est politiquement coûteux. Mieux vaut une période pilote d'abord. Mais le DSI peut-il déployer seul sans support ? » | 😐 Engagé, légèrement anxieux | 🚧 Pas de clause d'essai de 3 mois avant signature annuelle. 💡 Période pilote gratuite 90 jours pour 1 classe → réduit le risque perçu et accélère la signature. |
| **4. Onboarding équipe** | Présente l'outil aux 40 enseignants lors d'une réunion pédagogique. Forme 5 ambassadeurs volontaires. Le DSI déploie EduTutor sur le VPS Ogec en suivant `docs/11-deploiement-vps-ovh.md`. | « Si dès la 1ʳᵉ semaine les profs râlent que ça plante, j'ai perdu l'année. Je veux un kit de formation clé en main, pas juste un lien vers un README. » | 😐 Espérant → 😊 Soulagé (déploiement réussi en 2 h) | 🚧 Pas de kit de formation profs prêt à l'emploi (slides, tutoriel vidéo, FAQ). 💡 Kit onboarding enseignant (PDF 4 pages + vidéo 3 min) livré avec le contrat — le DSI déploie, les profs démarrent seuls. |
| **5. Renouvellement** | Mesure l'adoption en fin d'année : 35 % des profs actifs, 80 % des étudiants ont utilisé au moins 1 fois. Présente le bilan au CA et propose d'étendre aux 11 autres lycées du réseau Ogec. | « 35 % d'adoption profs = au-dessus de mon seuil de 30 %. Je peux dire au CA on est en avance sur l'IA sans mentir. Et si les 11 autres lycées signent, le coût unitaire baisse. » | 😊 Confiant, fier | 🚧 Pas de comparaison anonymisée avec d'autres établissements (benchmark sectoriel absent). 💡 Rapport d'adoption annuel + benchmark sectoriel anonymisé — argument clé pour le CA et pour la mutualisation réseau Ogec. |

**Moment de décrochage potentiel identifié : Étape 2 (Évaluation)** — si le dossier RGPD n'est pas prêt à l'emploi, le DPO bloque le cycle entier pour 3-6 semaines. C'est le point de friction le plus coûteux en temps commercial.

**Investissement produit prioritaire :** fiche RGPD + DPA pré-rédigés, signables en 1 page + clause d'essai de 90 jours. Coût : juridique (hors-code). Valeur : débloque le cycle d'achat B2B entier et crédibilise l'offre local-first face aux concurrents cloud.


---


## 4. Synthèse émotionnelle des 3 parcours


| Étape | Léa (étudiante) | Mme Lefèvre (enseignante) | M. Chen (établissement) | Point de levier |
|---|---|---|---|---|
| **1. Découverte / Besoin** | 😐 Curieuse, sceptique | 😐 Curieuse, prudente | 😐 Prudent, sous pression | Preuve sociale + RGPD visible dès l'accueil |
| **2. Inscription / Évaluation** | 😐 Vigilante | **😡 Impatiente (décrochage)** | 😐 Méticuleux, bloquable par DPO | **Priorité absolue : friction minimale à l'entrée** |
| **3. 1ʳᵉ utilisation / Décision** | 😐 → 😊 Anxieuse → Soulagée | 😐 → 😊 Vigilante → Étonnée | 😐 Engagé, anxieux | Indicateur progression LLM + preview questions + pilote 90 j |
| **4. Usage régulier / Onboarding** | 😊 Confiante | 😊 Satisfaite, productive | 😐 → 😊 Espérant → Soulagé | Edition inline questions + kit formation profs |
| **5. Recommandation / Renouvellement** | 😊 Enthousiaste | 😊 Convaincue, militante | 😊 Confiant, fier | Partage quiz (viralité) + rapport ROI direction |

**Lecture :** l'étape 2 cumule les frictions les plus fortes sur les 3 parcours. C'est le point d'entrée produit : améliorer l'inscription/évaluation a l'effet de levier maximum sur l'adoption de toutes les cibles.

**Priorisation des 3 investissements produit immédiats (ordre décroissant de valeur/effort) :**

1. **Indicateur de progression LLM** (étape 3 Léa) — coût : 2h front, valeur : rétention au 1er usage
2. **Onboarding enseignant self-service** (étape 2 Sophie) — coût : 1 jour, valeur : ouvre le segment B2B
3. **Fiche RGPD + DPA pré-rédigée** (étape 2 David) — coût : juridique hors-code, valeur : débloque le cycle achat B2B entier


---


## ✅ Grille d'auto-évaluation

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| Les 3 parcours sont décrits sur les 5 étapes | ☑ Oui | §1, §2, §3 : chacun 5 étapes de Découverte à Recommandation/Renouvellement |
| Chaque cellule "Actions" contient une action concrète et observable | ☑ Oui | Actions nommées avec verbe + contexte (ex. « uploade son PDF de droit, 340 pages ») |
| Chaque cellule "Pensées" est formulée au « je », entre guillemets | ☑ Oui | Toutes les pensées sont citées entre guillemets, voix de la persona |
| Chaque cellule "Émotion" utilise l'échelle 😡 → 😐 → 😊 avec au moins 1 transition par parcours | ☑ Oui | Léa : 😐→😊 (étape 3) · Sophie : 😡 (étape 2) → 😊 (étape 4) · David : 😐→😊 (étapes 4-5) |
| Chaque cellule "Frictions/Opportunités" identifie ≥ 1 friction ET ≥ 1 opportunité | ☑ Oui | 🚧 + 💡 systématiquement dans chaque cellule des 3 parcours |
| Le moment de décrochage potentiel est explicitement identifié pour chaque parcours | ☑ Oui | §1 : étape 3 · §2 : étape 2 · §3 : étape 2 — chacun avec justification et investissement prioritaire |
| La synthèse émotionnelle repère le bon "point de levier produit" | ☑ Oui | §4 : tableau croisé + colonne « Point de levier » + priorisation des 3 investissements |
| Le parcours "Établissement" reflète un cycle d'achat B2B (et pas un usage) | ☑ Oui | §3 : Besoin CA → Évaluation DPO → Décision contrat → Onboarding → Renouvellement |
| Document relu et validé par l'équipe complète | ☑ Partiel | À valider collectivement avant soumission PO |

