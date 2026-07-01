/** Conditions Générales d'Utilisation (modèle vierge à compléter). */
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  {
    title: 'Objet',
    hint:
      "Les présentes CGU encadrent l'accès et l'utilisation d'EduTutor IA, service pédagogique de génération et révision de quiz à partir de supports de cours.",
  },
  {
    title: 'Acceptation des conditions',
    hint:
      "L'utilisateur accepte les CGU en créant un compte, en se connectant ou en utilisant les fonctionnalités du service.",
  },
  {
    title: 'Accès au service',
    hint:
      "Le service est accessible avec un compte utilisateur, une connexion Internet et un navigateur récent. Des interruptions peuvent avoir lieu pour maintenance.",
  },
  {
    title: 'Compte utilisateur',
    hint:
      "L'utilisateur doit fournir des informations exactes, conserver son mot de passe confidentiel et signaler toute utilisation non autorisée de son compte.",
  },
  {
    title: 'Comportements interdits',
    hint:
      "Sont interdits les contenus illicites, les tentatives d'intrusion, la surcharge volontaire du service, l'usurpation d'identité et tout usage contraire à la loi.",
  },
  {
    title: 'Contenu généré par IA',
    hint:
      "Les quiz générés par IA peuvent contenir des erreurs. L'utilisateur doit vérifier les résultats avant tout usage pédagogique, professionnel ou évaluatif.",
  },
  {
    title: 'Responsabilité',
    hint:
      "L'équipe projet met en œuvre des moyens raisonnables pour assurer le service, sans garantir l'absence totale d'erreurs, d'interruptions ou d'indisponibilités.",
  },
  {
    title: 'Propriété intellectuelle',
    hint:
      "Le code, l'interface et les contenus du service restent protégés. L'utilisateur conserve ses droits sur les documents et textes qu'il importe.",
  },
  {
    title: 'Modification des CGU',
    hint:
      "Les CGU peuvent évoluer pour suivre les modifications du service, du cadre légal ou du projet. La version affichée sur le site fait foi.",
  },
  {
    title: 'Droit applicable et litiges',
    hint:
      "Les présentes CGU sont soumises au droit français. En cas de litige, une solution amiable est recherchée avant toute procédure.",
  },
];

export default function CGUPage() {
  return (
    <LegalScaffold
      title="Conditions Générales d'Utilisation"
      intro="Les règles d'utilisation du service EduTutor IA, acceptées par chaque utilisateur."
      sections={SECTIONS}
    />
  );
}
