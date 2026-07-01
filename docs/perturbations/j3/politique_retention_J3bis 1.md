# Politique de rétention des données - J3-bis

**Projet EduTutor IA · Équipe 15 · Document interne DPO**

| Version | 1.0 |
|---|---|
| **Date d'effet** | 01/07/2026 |
| **Responsable** | Délégué à la protection des données (fictif) — dpo@edututor-ia.fr |
| **Périmètre** | MVP Release 1 (comptes étudiants, quiz, logs techniques) |

---

## 1. Principes généraux

EduTutor IA applique le principe de minimisation (Art. 5.1.c RGPD) : nous ne conservons que les données nécessaires à la génération de quiz, au suivi de progression et à la sécurité du service. Les durées ci-dessous sont des **durées maximales** ; une suppression anticipée est possible sur demande (Art. 17).

---

## 2. Durées de conservation par catégorie

| Catégorie | Exemples | Durée max. | Base légale |
|---|---|---|---|
| Compte utilisateur | email, nom, hash mot de passe | Durée du compte + **30 jours** après suppression | Exécution du contrat (Art. 6.1.b) |
| Textes de cours uploadés | `source_text`, PDF extraits | **24 mois** après dernier accès au quiz associé | Consentement (Art. 6.1.a) + intérêt légitime pédagogique |
| Quiz générés | questions, options, `correct_index` | **24 mois** (aligné sur le cours source) | Intérêt légitime (Art. 6.1.f) — amélioration du service |
| Réponses et scores | `selected_index`, score /10 | **24 mois** | Intérêt légitime — historique de révision |
| Demandes SAR (Art. 15) | audit `DataRequest`, hash export | **36 mois** | Obligation légale (Art. 6.1.c) — preuve de conformité |
| Logs techniques | IP, user-agent, actions API | **12 mois** | Intérêt légitime — sécurité et diagnostic |
| Logs d'erreur LLM | prompts tronqués, codes HTTP | **6 mois** | Intérêt légitime — maintenance |
| Signalements de contenu | motif, statut, horodatage | **36 mois** ou clôture du dossier | Intérêt légitime — modération |
| Tokens email / reset password | jetons de vérification | **24 h** après émission | Exécution du contrat |
| Cookies de session | cookie auth (si activé) | Session navigateur ou **7 jours** | Consentement (Art. 6.1.a) |

---

## 3. Motifs légaux détaillés

### 3.1 Consentement (Art. 6.1.a)

L'upload volontaire d'un cours et l'acceptation des CGU lors de l'inscription constituent le fondement du traitement des contenus pédagogiques personnels. L'utilisateur peut retirer son consentement en supprimant son compte ou en demandant l'effacement des cours (Art. 17).

### 3.2 Exécution du contrat (Art. 6.1.b)

La création de compte, l'authentification et la génération de quiz sont nécessaires à la fourniture du service gratuit du MVP.

### 3.3 Intérêt légitime (Art. 6.1.f)

Les logs de sécurité (12 mois), l'historique de scores (24 mois) et la conservation des hash d'export SAR (36 mois) répondent à un intérêt légitime proportionné : sécuriser la plateforme, permettre la révision pédagogique et prouver la conformité RGPD. Un test de mise en balance a été réalisé : l'impact sur la vie privée est limité (données scolaires, pas de données sensibles Art. 9).

### 3.4 Obligation légale (Art. 6.1.c)

La traçabilité des demandes d'accès (SAR) est conservée 36 mois pour répondre aux éventuels contrôles ou litiges.

---

## 4. Modalités de suppression

### 4.1 Suppression automatique

| Mécanisme | Fréquence | Détail |
|---|---|---|
| Job `purge_expired_tokens` | Quotidien (02:00 UTC) | Supprime les tokens email/reset > 24 h |
| Job `purge_old_logs` | Hebdomadaire (dimanche) | Purge logs techniques > 12 mois |
| Job `purge_idle_courses` | Mensuel (1er du mois) | Cours sans accès depuis 24 mois |
| Anonymisation SAR | Mensuel | Les hash d'export sont conservés ; les IP sont tronquées après 90 jours |

> **Note MVP :** les jobs cron sont documentés mais partiellement simulés en environnement de développement. En production VPS OVH, ils seront exécutés via `django-crontab` ou un conteneur sidecar.

### 4.2 Suppression manuelle

| Canal | Délai de traitement | Action |
|---|---|---|
| Bouton « Supprimer mon compte » (ProfilePage) | Immédiat (soft delete 30 j) | Compte désactivé, données planifiées pour purge |
| Email dpo@edututor-ia.fr (Art. 17) | **30 jours max.** (Art. 12.3) | Effacement ou anonymisation |
| Demande SAR (Art. 15) | **30 jours max.** | Export JSON via `GET /api/accounts/me/export/` |

### 4.3 Exceptions

Nous pouvons prolonger la conservation si une obligation légale l'impose (ex. contentieux en cours) ou si les données sont anonymisées à des fins statistiques agrégées (hors périmètre MVP).

---

## 5. Transferts et sous-traitants

| Sous-traitant | Données | Localisation | Garanties |
|---|---|---|---|
| Hébergeur VPS OVH | Toutes | France (Gravelines) | Clauses contractuelles OVH |
| Ollama (local) | Textes de cours en inférence | Machine hôte équipe / VPS | Pas de transfert hors UE en MVP |
| Brevo (email transactionnel) | Email, prénom | UE | DPA Brevo signé |

Aucun transfert vers des pays tiers sans garanties appropriées (Art. 44 et suivants).

---

## 6. Révision

Cette politique sera révisée à chaque release majeure ou en cas de nouvelle perturbation réglementaire. Prochaine revue prévue : **Sprint 7** (avant soutenance).

---

*Document rédigé par l'équipe 15 dans le cadre de la perturbation J3-bis. Les durées sont réalistes pour un MVP étudiant ; un DPO en entreprise affinerait les registres de traitement.*
