# ADR-0004 : Export des données personnelles - droit d'accès RGPD (Art. 15)

**Projet EduTutor IA · Équipe 15 · Semaine APOCAL'IPSSI 2026**

---

## 1. Métadonnées

| Champ | Valeur |
|---|---|
| **Numéro** | ADR-0004 |
| **Titre** | Endpoint d'export SAR + audit trail + formats JSON/CSV |
| **Statut** | Accepté |
| **Date** | 01/07/2026 |
| **Auteurs** | Hyndi FANNIR, Zouayobo DALI · avec l'équipe 15 |
| **Version** | v1.0 |
| **Lié à** | US-12 (Product Backlog) · Perturbation J3-bis (mercredi 14h00) |

---

## 2. Contexte

### 2.1 Situation factuelle

Le mercredi 01/07/2026 à 14h00, l'équipe pédagogique simule une **demande d'accès (SAR)**
de Hugo Petit, étudiant en droit du numérique. Il exerce son droit d'accès (Art. 15 RGPD)
et demande l'ensemble des données le concernant : compte, cours uploadés, quiz, réponses et logs.

À cette date, le MVP ne proposait qu'un **placeholder désactivé** sur la page profil.
Aucun endpoint d'export n'existait. La soutenance Release 1 (mercredi soir) exige une démo
conformité minimale.

### 2.2 Exigences identifiées

| Exigence | Source |
|---|---|
| Export limité à l'utilisateur authentifié (`req.user`) | Art. 15 + sécurité |
| Formats lisibles par machine **et** humain | Art. 15 + Art. 20 (portabilité) |
| Traçabilité des demandes (qui, quand, hash) | Accountability Art. 5.2 |
| Délai de réponse ≤ 30 jours | Art. 12.3 |
| Alignement backlog : `quiz.json` + `reponses.csv` + `audit.json` | US-12 |

### 2.3 Contraintes

- Stack existante : **Django + DRF + React/TS** (pas de couche Node parallèle)
- Délai : livraison **dans l'après-midi** du mercredi (Sprint 5)
- Pas de DPO réel : contact fictif `dpo@edututor-ia.fr` documenté
- Modèles `Report` et `ActivityLog` non implémentés en MVP → sections vides acceptées

---

## 3. Options envisagées

| Option | Description | Effort | Conformité | Risque |
|---|---|---|---|---|
| A | Export manuel par un admin (dump SQL) | Faible | Partielle | Fuite de données, non scalable, non démontrable |
| B | Endpoint JSON seul | Faible | Partielle | US-12 non respectée (pas de CSV) |
| C | **ZIP : `quiz.json` + `reponses.csv` + `audit.json`** | Moyen | Bonne pour le MVP | Acceptable |
| D | Portail self-service complet (effacement, rectification, limitation) | Élevé | Élevée | Hors périmètre Release 1 |

---

## 4. Décision retenue

**Option C - endpoint `GET /api/accounts/me/export/` renvoyant une archive ZIP.**

### 4.1 Architecture retenue

| Composant | Rôle |
|---|---|
| `backend/accounts/export.py` | Consolidation des données + génération CSV/ZIP |
| `backend/accounts/views.py` → `ExportMyDataView` | Endpoint protégé `IsAuthenticated` |
| `backend/accounts/models.py` → `DataRequest` | Audit trail SAR (statut, dates, hash SHA-256) |
| `frontend/src/components/ExportDataButton.tsx` | Déclenchement téléchargement depuis le profil |
| `docs/politique_retention_J3bis.md` | Durées de conservation et bases légales |
| `docs/reponse_hugo_petit.md` | Modèle de réponse formelle à la SAR |

### 4.2 Contenu du ZIP

| Fichier | Format | Contenu |
|---|---|---|
| `quiz.json` | JSON | Compte, cours uploadés, quiz, questions, réponses |
| `reponses.csv` | CSV | Une ligne par question (quiz, score, options, réponse choisie) |
| `audit.json` | JSON | Métadonnées SAR : dates, hash, statut, email |

### 4.3 Règles de sécurité

- Filtrage impératif sur `request.user` - aucun paramètre `user_id` en query string
- Vérification finale `bundle.meta.user_id == user.pk` avant envoi
- Hash SHA-256 du bundle stocké dans `DataRequest.export_hash` (preuve d'intégrité sans conserver le dump)
- Mot de passe **exclu** de l'export (hash irréversible côté serveur uniquement)

### 4.4 Justification

- Option A incompatible avec la démo PO et le persona étudiant autonome (Léa Martin).
- Option B insuffisante : le jury droit (Hugo Petit) exige un CSV exploitable sous Excel.
- Option D reportée : rectification/effacement partiellement couverts (profil + suppression compte), mais pas de portail dédié.
- ZIP unique : une action utilisateur, conforme à l'US-12, sans multiplier les endpoints.

### 4.5 Hors périmètre assumé (MVP)

- Jobs cron de purge automatique documentés mais non câblés en prod
- `reports` et `logs` renvoient des tableaux vides tant que J4 n'est pas livré
- Pas d'export déclenché automatiquement avant suppression de compte (TODO profil)

---

## 5. Conséquences

### 5.1 Positives

- Droit d'accès Art. 15 **démontrable en live** depuis Mon profil
- Portabilité Art. 20 partiellement couverte (JSON structuré + CSV)
- Audit trail `DataRequest` pour répondre au jury sur la traçabilité
- Documentation légale (rétention + réponse Hugo Petit) prête pour la soutenance

### 5.2 Négatives

- ZIP non chiffré : l'utilisateur doit stocker le fichier de manière sécurisée
- Pas de notification email automatique à la fin de l'export
- CSV plat : pas de relation normalisée multi-fichiers (acceptable pour le MVP)
- Conformité partielle : registre des traitements et DPO réel non constitués (contexte pédagogique)

---

## 6. KPIs à surveiller post-décision

| KPI | Seuil cible | Seuil d'alerte | Action si dépassement |
|---|---|---|---|
| Délai de génération export | < 5 s | > 15 s | Optimiser requêtes `prefetch_related` |
| Demandes SAR / mois | Traçées à 100 % | Entrée `DataRequest` manquante | Audit endpoint |
| Erreurs 5xx sur `/me/export/` | 0 % | > 1 % | Investigation logs Django |
| Réclamations CNIL simulées | 0 | ≥ 1 en soutenance | Mettre à jour politique de rétention |

**Date de revue ADR** : avant Release 2 (jeudi), avec PO et référent conformité.

---

## Références

- Politique de rétention : [`docs/politique_retention_J3bis.md`](../politique_retention_J3bis.md)
- Réponse SAR Hugo Petit : [`docs/reponse_hugo_petit.md`](../reponse_hugo_petit.md)
- US-12 : [`docs/cadrage/equipe-15-product-backlog.md`](../cadrage/equipe-15-product-backlog.md)
- Code : `backend/accounts/export.py`, `backend/accounts/models.py` (`DataRequest`)
