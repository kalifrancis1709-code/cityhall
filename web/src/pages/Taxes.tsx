import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const PERIODICITIES = [
  "Journalière",
  "Hebdomadaire",
  "Mensuelle",
  "Trimestrielle",
  "Annuelle",
] as const;

type Periodicity = (typeof PERIODICITIES)[number];

type Rate = {
  date: string; // date d'effet
  amount: number; // en FCFA
  createdBy: string;
  current: boolean;
};

type Tax = {
  slug: string;
  name: string;
  active: boolean;
  periodicity: Periodicity;
  dueDate: string;
  legalBasis: string;
  activities: string[];
  rates: Rate[];
};

// TODO : remplacer par l'appel API
const INITIAL_TAXES: Tax[] = [
  {
    slug: "droit-de-place",
    name: "Droit de place – marché",
    active: true,
    periodicity: "Mensuelle",
    dueDate: "le 10 du mois",
    legalBasis: "Délibération du conseil municipal n° [à compléter]",
    activities: ["Commerce de tissus", "Vivres", "Quincaillerie"],
    rates: [
      {
        date: "01/01/2026",
        amount: 3000,
        createdBy: "E. Kossi",
        current: true,
      },
      {
        date: "01/01/2025",
        amount: 2500,
        createdBy: "E. Kossi",
        current: false,
      },
    ],
  },
  {
    slug: "enlevement-des-ordures",
    name: "Enlèvement des ordures",
    active: true,
    periodicity: "Mensuelle",
    dueDate: "le 5 du mois",
    legalBasis: "Délibération du conseil municipal n° [à compléter]",
    activities: ["Vivres", "Restauration"],
    rates: [
      {
        date: "01/01/2026",
        amount: 1500,
        createdBy: "E. Kossi",
        current: true,
      },
    ],
  },
  {
    slug: "taxe-sur-la-publicite",
    name: "Taxe sur la publicité",
    active: true,
    periodicity: "Annuelle",
    dueDate: "le 31 mars",
    legalBasis: "Délibération du conseil municipal n° [à compléter]",
    activities: [],
    rates: [
      {
        date: "01/01/2026",
        amount: 25000,
        createdBy: "E. Kossi",
        current: true,
      },
    ],
  },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cc79a]";

const inputClass =
  "h-12 w-full rounded-lg border border-[#2b3a33] bg-[#0f1713] px-4 text-base text-[#e6efe9] placeholder:text-[#7d8d84] focus:outline-2 focus:outline-offset-0 focus:outline-[#4cc79a]";

const labelClass = "mb-2 block text-[15px] font-semibold text-[#9fb0a7]";

const formatAmount = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(n).replace(/\u202f/g, "\u00a0");

const currentRate = (tax: Tax) => tax.rates.find((r) => r.current);

export default function Taxes() {
  const { slug } = useParams();
  const [taxes, setTaxes] = useState<Tax[]>(INITIAL_TAXES);

  // Sans slug : on affiche la 1re taxe sur grand écran, la liste seule sur mobile
  const selected = slug ? taxes.find((t) => t.slug === slug) : taxes[0];

  const updateTax = (targetSlug: string, patch: Partial<Tax>) => {
    // TODO : PATCH /api/taxes/:slug (par ex. à la perte de focus)
    setTaxes((prev) =>
      prev.map((t) => (t.slug === targetSlug ? { ...t, ...patch } : t)),
    );
  };

  const handleAddTax = () => {
    // TODO : ouvrir le formulaire de création d'une taxe
  };

  const handleAddActivity = () => {
    // TODO : ouvrir le sélecteur d'activités
  };

  const handleNewRate = () => {
    // TODO : ouvrir le formulaire « Nouveau tarif » (montant + date d'effet)
  };

  return (
    <>
      {/* Liste : plein écran sur mobile, colonne fixe dès lg */}
      <section
        className={`w-full px-4 py-5 sm:px-7 lg:block lg:w-[340px] lg:shrink-0 lg:border-r lg:border-[#26332d] lg:py-8 xl:w-[360px] ${
          slug ? "hidden" : "block"
        }`}
      >
        <div className="mb-4 flex items-center justify-between gap-3 lg:mb-5">
          <h2 className="text-xl font-bold sm:text-2xl lg:text-lg">
            Taxes ({taxes.length})
          </h2>
          <button
            type="button"
            onClick={handleAddTax}
            aria-label="Ajouter une taxe"
            className={`flex size-11 shrink-0 items-center justify-center rounded-lg border border-[#2b3a33] text-xl font-semibold hover:bg-[#1f2d27] ${focusRing}`}
          >
            +
          </button>
        </div>

        <ul className="flex flex-col gap-3">
          {taxes.map((tax) => {
            const active = selected?.slug === tax.slug;
            const rate = currentRate(tax);
            return (
              <li key={tax.slug}>
                <Link
                  to={`/taxes/${tax.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`block min-h-14 rounded-xl border px-4 py-3.5 transition-colors ${focusRing} ${
                    // la surbrillance n'a de sens que lorsque liste et détail sont visibles ensemble
                    active
                      ? "border-[#26332d] bg-[#18231e] lg:border-[#3fb68a] lg:bg-[#143528]"
                      : "border-[#26332d] bg-[#18231e] hover:border-[#35453d]"
                  }`}
                >
                  <span className="block text-[17px] font-bold">
                    {tax.name}
                  </span>
                  <span className="mt-1 block text-[15px] text-[#9fb0a7]">
                    {tax.periodicity.toLowerCase()}
                    {rate ? ` · ${formatAmount(rate.amount)}` : ""}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Détail */}
      <section
        className={`min-w-0 flex-1 px-4 py-5 sm:px-7 lg:block lg:py-8 ${
          slug ? "block" : "hidden"
        }`}
      >
        {selected ? (
          <>
            <Link
              to="/taxes"
              className={`-ml-2 mb-3 flex min-h-11 w-fit items-center gap-1 rounded-lg px-2 font-semibold text-[#4cc79a] hover:bg-[#1f2d27] lg:hidden ${focusRing}`}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 6l-6 6 6 6" />
              </svg>
              Retour aux taxes
            </Link>

            <header className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <h2 className="text-2xl font-bold leading-tight sm:text-[28px]">
                {selected.name}
              </h2>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold ${
                  selected.active
                    ? "bg-[#143528] text-[#4cc79a]"
                    : "bg-[#26302b] text-[#9fb0a7]"
                }`}
              >
                {selected.active ? "Active" : "Inactive"}
              </span>
            </header>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="periodicity" className={labelClass}>
                  Périodicité
                </label>
                <div className="relative">
                  <select
                    id="periodicity"
                    value={selected.periodicity}
                    onChange={(e) =>
                      updateTax(selected.slug, {
                        periodicity: e.target.value as Periodicity,
                      })
                    }
                    className={`${inputClass} appearance-none pr-10`}
                  >
                    {PERIODICITIES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <svg
                    viewBox="0 0 24 24"
                    className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#9fb0a7]"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </div>
              </div>

              <div>
                <label htmlFor="due-date" className={labelClass}>
                  Échéance
                </label>
                <input
                  id="due-date"
                  type="text"
                  value={selected.dueDate}
                  onChange={(e) =>
                    updateTax(selected.slug, { dueDate: e.target.value })
                  }
                  placeholder="Ex. : le 10 du mois"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="legal-basis" className={labelClass}>
                Base légale
              </label>
              <input
                id="legal-basis"
                type="text"
                value={selected.legalBasis}
                onChange={(e) =>
                  updateTax(selected.slug, { legalBasis: e.target.value })
                }
                className={inputClass}
              />
            </div>

            <div className="mt-5">
              <p
                id="activities-label"
                className="mb-2 text-[15px] text-[#9fb0a7]"
              >
                Activités concernées (affectation automatique)
              </p>
              <ul
                aria-labelledby="activities-label"
                className="flex flex-wrap items-center gap-2"
              >
                {selected.activities.map((activity) => (
                  <li
                    key={activity}
                    className="rounded-full bg-[#143528] px-3.5 py-1.5 text-sm font-bold text-[#4cc79a]"
                  >
                    {activity}
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={handleAddActivity}
                    className={`min-h-11 rounded-full bg-[#26302b] px-3.5 py-1.5 text-sm font-semibold hover:bg-[#2f3b35] sm:min-h-9 ${focusRing}`}
                  >
                    + ajouter
                  </button>
                </li>
              </ul>
            </div>

            <div className="mt-7 mb-3 flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold">Historique des tarifs</h3>
              <button
                type="button"
                onClick={handleNewRate}
                className={`min-h-12 rounded-lg bg-[#4cc79a] px-5 py-2.5 text-base font-bold text-[#0f1a15] transition-colors hover:bg-[#5fd5aa] ${focusRing}`}
              >
                Nouveau tarif
              </button>
            </div>

            {/* Tableau : lignes « cartes » sur mobile, colonnes dès sm */}
            <div
              role="table"
              aria-label="Historique des tarifs"
              className="text-base"
            >
              <div
                role="row"
                className="hidden grid-cols-[1.1fr_1fr_1fr_auto] gap-x-4 rounded-t-lg bg-[#18231e] px-3 py-3 text-[15px] font-semibold text-[#9fb0a7] sm:grid"
              >
                <span role="columnheader">Date d'effet</span>
                <span role="columnheader" className="text-right">
                  Montant
                </span>
                <span role="columnheader">Créé par</span>
                <span role="columnheader" className="w-24">
                  <span className="sr-only">Statut</span>
                </span>
              </div>

              {selected.rates.map((rate) => (
                <div
                  key={rate.date}
                  role="row"
                  className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 border-b border-[#26332d] px-3 py-3.5 sm:grid-cols-[1.1fr_1fr_1fr_auto]"
                >
                  <span role="cell" className="font-semibold sm:font-normal">
                    {rate.date}
                  </span>
                  <span
                    role="cell"
                    className="text-right font-semibold sm:font-normal"
                  >
                    {formatAmount(rate.amount)} FCFA
                  </span>
                  <span
                    role="cell"
                    className="text-[15px] text-[#9fb0a7] sm:text-base sm:text-inherit"
                  >
                    {rate.createdBy}
                  </span>
                  <span
                    role="cell"
                    className="justify-self-end sm:w-24 sm:justify-self-start"
                  >
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${
                        rate.current
                          ? "bg-[#143528] text-[#4cc79a]"
                          : "bg-[#26302b] text-[#9fb0a7]"
                      }`}
                    >
                      {rate.current ? "En vigueur" : "Ancien"}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-[#9fb0a7] sm:text-base">
              Un tarif déjà utilisé ne peut plus être modifié. Pour changer un
              montant, créez un nouveau tarif avec sa date d'effet.
            </p>
          </>
        ) : (
          <>
            <Link
              to="/taxes"
              className={`-ml-2 mb-3 flex min-h-11 w-fit items-center rounded-lg px-2 font-semibold text-[#4cc79a] hover:bg-[#1f2d27] lg:hidden ${focusRing}`}
            >
              Retour aux taxes
            </Link>
            <p className="text-[#9fb0a7]">
              Cette taxe n'existe pas ou a été supprimée.
            </p>
          </>
        )}
      </section>
    </>
  );
}
