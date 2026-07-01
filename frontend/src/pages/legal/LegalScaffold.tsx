/**
 * Gabarit commun aux pages légales (Lot 5).
 *
 * Ce composant affiche une page légale finalisée à partir d'un titre,
 * d'une introduction et d'une liste de sections.
 */
import type { ReactNode } from 'react';

/** URL du cours de référence sur la réglementation des données. */
export const REGLEMENTATION_URL = 'https://mohamedelafrit.com/teaching/Reglementation_des_Donnees';

export type LegalSection = {
  /** Titre de la rubrique affichée. */
  title: string;
  /** Contenu de la rubrique. */
  hint: ReactNode;
};

type Props = {
  title: string;
  intro: string;
  sections: LegalSection[];
  /** Contenu libre optionnel ajouté après les rubriques. */
  children?: ReactNode;
};

export default function LegalScaffold({ title, intro, sections, children }: Props) {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
      <p className="text-slate-600 mb-6">{intro}</p>

      {/* Bandeau d'information commun aux pages légales */}
      <div className="mb-8 p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded text-sm text-indigo-900">
        <p className="font-semibold mb-1">Document légal du projet EduTutor IA</p>
        <p>
          Cette page présente les informations applicables au projet APOCAL'IPSSI 2026.
          Pour plus de contexte, vous pouvez consulter le cours{' '}
          <a
            href={REGLEMENTATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-700 underline hover:no-underline font-medium"
          >
            Réglementation des données
          </a>
          .
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              {i + 1}. {section.title}
            </h2>
            <p className="text-sm text-slate-600 leading-6">{section.hint}</p>
          </section>
        ))}
      </div>

      {children}

      <p className="text-xs text-slate-400 mt-10 pt-4 border-t border-slate-200">
        Dernière mise à jour : 1 juillet 2026. Document rédigé dans le cadre pédagogique APOCAL'IPSSI
        2026.
      </p>
    </article>
  );
}
