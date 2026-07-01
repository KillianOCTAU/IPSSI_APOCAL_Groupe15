# ADR-0001 : Choix initial du modèle LLM — Llama 3.1 8B

**Statut** : Accepté → Remplacé par [ADR-0002](./ADR-0002-migration-modele-llm-j2.md)
**Date** : 29/06/2026 
**Auteurs** : Équipe 15

---

## Contexte

Lors du cadrage matinal du Sprint 0 (lundi 29/06/2026), l'équipe a dû choisir un modèle LLM
pour la génération de quiz. La contrainte stack imposée est Ollama local uniquement
(pas d'API externe, conformité RGPD, gratuité).

## Options envisagées

| Option | Modèle | Taille | Qualité estimée | Effort |
|---|---|---|---|---|
| A | `llama3.1:8b` (défaut kit) | 8B | ★★★★ | Nul (déjà configuré) |
| B | `phi3:mini` | 3.8B | ★★★ | Faible |
| C | `llama3.2:3b` | 3B | ★★★ | Faible |

## Décision

Option A — `llama3.1:8b` via Ollama local.

## Justification

- Fourni tel quel par le kit APOCAL'IPSSI, zéro effort de configuration en cadrage
- Qualité estimée la plus haute pour la génération de QCM académiques
- Priorité cadrage : mise en route rapide > optimisation de performance

## Conséquences

Positives : onboarding immédiat, qualité de référence établie (8.2/10 sur 50 quiz)

Négatives : latence CPU-only élevée (~42 s p50) — acceptable en cadrage,
critique en production → déclenche ADR-0002 à J2.

À surveiller : retours beta-testeurs sur le temps d'attente dès Sprint 1.
