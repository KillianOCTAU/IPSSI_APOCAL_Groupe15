"""
Modèles de l'app accounts.

[Note pédagogique] On garde le modèle User standard de Django (simple et
robuste), et on lui ajoute un Profil 1-pour-1 pour les infos métier qui ne sont
pas dans User — ici `email_verified` (l'utilisateur a-t-il cliqué le lien de
confirmation envoyé par email ?).

Choix d'architecture « email = identifiant » : à l'inscription, on met
username = email (voir SignupSerializer). Le login se fait donc par email, sans
backend d'authentification custom. C'est le compromis le plus simple pour un
kit pédagogique (un vrai produit utiliserait souvent un User personnalisé avec
USERNAME_FIELD = 'email').
"""

from django.conf import settings
from django.db import models
from django.utils import timezone


class Profile(models.Model):
    """Informations complémentaires attachées à un utilisateur."""

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    # Validation "soft" : le compte fonctionne même si l'email n'est pas vérifié,
    # mais un bandeau invite l'utilisateur à cliquer le lien de confirmation.
    email_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Profile<{self.user.email or self.user.username}>"


def get_or_create_profile(user) -> Profile:
    """Récupère (ou crée) le profil d'un utilisateur.

    Pratique pour les comptes créés AVANT l'ajout du modèle Profile (ils n'ont
    pas encore de profil) : on le crée à la volée plutôt que de planter.
    """
    profile, _ = Profile.objects.get_or_create(user=user)
    return profile


class DataRequest(models.Model):
    """Audit trail des demandes d'accès RGPD (Art. 15)."""

    class Status(models.TextChoices):
        PENDING = "pending", "En attente"
        PROCESSING = "processing", "En cours"
        COMPLETED = "completed", "Terminé"
        FAILED = "failed", "Échoué"

    class RequestType(models.TextChoices):
        SAR_ACCESS = "sar_access", "Accès Art. 15"
        SAR_PORTABILITY = "sar_portability", "Portabilité Art. 20"
        ERASURE = "erasure", "Effacement Art. 17"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="data_requests",
    )
    user_email = models.EmailField()
    request_type = models.CharField(
        max_length=32,
        choices=RequestType.choices,
        default=RequestType.SAR_ACCESS,
    )
    status = models.CharField(
        max_length=16,
        choices=Status.choices,
        default=Status.PENDING,
    )
    requested_at = models.DateTimeField(auto_now_add=True)
    responded_at = models.DateTimeField(null=True, blank=True)
    export_hash = models.CharField(max_length=64, blank=True, default="")
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        ordering = ["-requested_at"]

    def mark_completed(self, export_payload: dict) -> None:
        import hashlib
        import json

        canonical = json.dumps(export_payload, sort_keys=True, ensure_ascii=False)
        self.export_hash = hashlib.sha256(canonical.encode("utf-8")).hexdigest()
        self.status = self.Status.COMPLETED
        self.responded_at = timezone.now()
        self.save(update_fields=["export_hash", "status", "responded_at"])
