/** Politique de confidentialité (modèle vierge à compléter). */
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  {
    title: 'Responsable du traitement',
    hint:
      "Le responsable du traitement est l'équipe projet Groupe 15, éditrice pédagogique d'EduTutor IA dans le cadre APOCAL'IPSSI 2026.",
  },
  {
    title: 'Données personnelles collectées',
    hint:
      "Les données collectées sont l'email, le nom, le prénom, le mot de passe chiffré, les textes ou PDF envoyés, les quiz générés, les réponses et les scores.",
  },
  {
    title: 'Finalités du traitement',
    hint:
      "Les données servent à créer le compte, authentifier l'utilisateur, générer des quiz, afficher l'historique, suivre la progression et administrer la plateforme.",
  },
  {
    title: 'Base légale',
    hint:
      "Les traitements reposent sur l'exécution du service demandé, l'intérêt légitime de sécuriser la plateforme et, si nécessaire, le consentement de l'utilisateur.",
  },
  {
    title: 'Durée de conservation',
    hint:
      "Les données de compte sont conservées tant que le compte existe. Les quiz, réponses et scores sont supprimés avec le compte ou sur demande d'effacement.",
  },
  {
    title: 'Destinataires des données',
    hint:
      "Les données sont accessibles uniquement à l'utilisateur concerné et, si besoin, aux administrateurs techniques du projet. Elles ne sont pas revendues.",
  },
  {
    title: 'Transferts hors UE',
    hint:
      'Par défaut, le service privilégie un traitement local via Ollama. Si un fournisseur LLM cloud est activé, les contenus envoyés peuvent être transmis à ce fournisseur.',
  },
  {
    title: 'Vos droits',
    hint:
      "L'utilisateur peut demander l'accès, la rectification, l'effacement, la limitation, l'opposition ou la portabilité de ses données depuis son profil ou par contact DPO.",
  },
  {
    title: 'Cookies',
    hint:
      'Les cookies et stockages techniques utilisés par EduTutor IA sont décrits dans la politique de gestion des cookies accessible depuis le pied de page.',
  },
  {
    title: 'Contact & réclamation',
    hint: (
      <>
        Pour toute demande, l'utilisateur peut écrire au référent données fictif{' '}
        <a href="mailto:dpo@edututor.local" className="text-indigo-600 hover:underline">
          dpo@edututor.local
        </a>
        . Il peut aussi déposer une réclamation auprès de la CNIL.
      </>
    ),
  },
];

export default function ConfidentialitePage() {
  return (
    <LegalScaffold
      title="Politique de confidentialité"
      intro="Comment les données personnelles des utilisateurs sont collectées, utilisées et protégées (RGPD)."
      sections={SECTIONS}
    />
  );
}
