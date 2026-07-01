/** Mentions légales (modèle vierge à compléter). */
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  {
    title: 'Éditeur du site',
    hint: (
      <>
        Le site EduTutor IA est édité par l'équipe projet Groupe 15 dans le cadre pédagogique
        APOCAL'IPSSI 2026. Contact :{' '}
        <a href="mailto:contact@edututor.local" className="text-indigo-600 hover:underline">
          contact@edututor.local
        </a>
        .
      </>
    ),
  },
  {
    title: 'Directeur de la publication',
    hint:
      "Le directeur de la publication est le responsable pédagogique fictif du projet EduTutor IA, représentant l'équipe Groupe 15.",
  },
  {
    title: 'Hébergeur',
    hint:
      "En environnement de démonstration, le service est hébergé localement ou sur l'infrastructure de test du projet. En production, l'hébergeur devra être identifié précisément.",
  },
  {
    title: 'Propriété intellectuelle',
    hint:
      'Les textes, logos, interfaces et éléments du service sont protégés. Les supports importés restent la propriété de leurs auteurs ou utilisateurs.',
  },
  {
    title: 'Contact',
    hint: (
      <>
        Pour toute question juridique ou demande liée au site, l'utilisateur peut écrire à{' '}
        <a href="mailto:contact@edututor.local" className="text-indigo-600 hover:underline">
          contact@edututor.local
        </a>{' '}
        ou au référent données{' '}
        <a href="mailto:dpo@edututor.local" className="text-indigo-600 hover:underline">
          dpo@edututor.local
        </a>
        .
      </>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <LegalScaffold
      title="Mentions légales"
      intro="Informations légales obligatoires identifiant l'éditeur et l'hébergeur du site."
      sections={SECTIONS}
    />
  );
}
