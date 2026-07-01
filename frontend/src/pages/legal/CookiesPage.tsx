/** Politique de gestion des cookies (modèle vierge à compléter). */
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  {
    title: "Qu'est-ce qu'un cookie ?",
    hint:
      "Un cookie est un petit fichier enregistré par le navigateur. Cette page couvre aussi le localStorage, utilisé pour conserver certaines informations côté utilisateur.",
  },
  {
    title: 'Cookies et stockage utilisés',
    hint:
      "EduTutor IA utilise le localStorage pour le token d'authentification et le choix du thème. Les cookies Django sessionid et csrftoken peuvent être utilisés pour l'administration et la sécurité.",
  },
  {
    title: 'Finalité de chaque cookie',
    hint:
      "Ces stockages servent uniquement à maintenir la connexion, sécuriser les formulaires et mémoriser les préférences d'affichage. Aucun cookie publicitaire ou traceur marketing n'est utilisé.",
  },
  {
    title: 'Consentement',
    hint:
      "Les stockages actuellement utilisés sont nécessaires au fonctionnement du service ou demandés par l'utilisateur. Ils ne nécessitent donc pas de consentement préalable.",
  },
  {
    title: 'Durée de conservation',
    hint:
      "Le token est conservé jusqu'à la déconnexion ou suppression manuelle. Le thème reste conservé jusqu'au changement de préférence. Les cookies techniques suivent la durée configurée côté serveur.",
  },
  {
    title: 'Gérer ou refuser les cookies',
    hint:
      "L'utilisateur peut supprimer les cookies et données locales depuis les paramètres de son navigateur. La suppression du stockage local peut le déconnecter et réinitialiser ses préférences.",
  },
];

export default function CookiesPage() {
  return (
    <LegalScaffold
      title="Politique de gestion des cookies"
      intro="Les cookies et technologies de stockage utilisés par le site, et comment les gérer."
      sections={SECTIONS}
    >
    </LegalScaffold>
  );
}
