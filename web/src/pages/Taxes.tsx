import { useState } from 'react'
import { Link, useParams } from 'react-router'

const PERIODICITIES = [
  'Journalière',
  'Hebdomadaire',
  'Mensuelle',
  'Trimestrielle',
  'Annuelle',
] as const

type Periodicity = (typeof PERIODICITIES)[number]

type Rate = {
  date: string
  amount: number
  createdBy: string
  current: boolean
}

type Tax = {
  slug: string
  name: string
  active: boolean
  periodicity: Periodicity
  dueDate: string
  legalBasis: string
  activities: string[]
  rates: Rate[]
}

// TODO : remplacer par l'appel API
const INITIAL_TAXES: Tax[] = [
  {
    slug: 'droit-de-place',
    name: 'Droit de place – marché',
    active: true,
    periodicity: 'Mensuelle',
    dueDate: 'le 10 du mois',
    legalBasis: 'Délibération du conseil municipal n° [à compléter]',
    activities: ['Commerce de tissus', 'Vivres', 'Quincaillerie'],
    rates: [
      { date: '01/01/2026', amount: 3000, createdBy: 'E. Kossi', current: true },
      { date: '01/01/2025', amount: 2500, createdBy: 'E. Kossi', current: false },
    ],
  },
  {
    slug: 'enlevement-des-ordures',
    name: 'Enlèvement des ordures',
    active: true,
    periodicity: 'Mensuelle',
    dueDate: 'le 5 du mois',
    legalBasis: 'Délibération du conseil municipal n° [à compléter]',
    activities: ['Vivres', 'Restauration'],
    rates: [{ date: '01/01/2026', amount: 1500, createdBy: 'E. Kossi', current: true }],
  },
  {
    slug: 'taxe-sur-la-publicite',
    name: 'Taxe sur la publicité',
    active: true,
    periodicity: 'Annuelle',
    dueDate: 'le 31 mars',
    legalBasis: 'Délibération du conseil municipal n° [à compléter]',
    activities: [],
    rates: [{ date: '01/01/2026', amount: 25000, createdBy: 'E. Kossi', current: true }],
  },
]

const inputClass =
  'h-11 w-full rounded-lg border border-[#d7dbd9] bg-white px-3.5 text-[15px] text-[#17231f] outline-none focus:border-[#0f6b52] focus:ring-2 focus:ring-[#0f6b52]/15'

const labelClass = 'mb-1.5 block text-[13px] font-semibold text-[#4a5751]'

const formatAmount = (n: number) =>
  new Intl.NumberFormat('fr-FR').format(n).replace(/\u202f/g, ' ')

const currentRate = (tax: Tax) => tax.rates.find((r) => r.current)

export default function Taxes() {
  const { slug } = useParams()
  const [taxes, setTaxes] = useState<Tax[]>(INITIAL_TAXES)

  // Sans slug : 1re taxe affichée à côté de la liste sur grand écran
  const selected = slug ? taxes.find((t) => t.slug === slug) : taxes[0]

  const handleAddTax = () => {
    // TODO : ouvrir le formulaire de création d'une taxe
  };

  const handleAddActivity = () => {
    // TODO : ouvrir le sélecteur d'activités
  };

  const handleNewRate = () => {
    // TODO : ouvrir le formulaire « Nouveau tarif » (montant + date d'effet)
  };

  const updateTax = (targetSlug: string, patch: Partial<Tax>) => {
    // TODO : PATCH /api/taxes/:slug
    setTaxes((prev) => prev.map((t) => (t.slug === targetSlug ? { ...t, ...patch } : t)))
  }

  return (
    <div className="flex min-h-dvh bg-[#f7f8f7] text-[#17231f]">

      {/* Liste : plein écran sur mobile, colonne fixe dès lg */}
      <section
        className={`w-full border-[#e4e7e5] bg-white px-5 py-6 sm:px-7 lg:w-[320px] lg:shrink-0 lg:border-r lg:py-7 xl:w-[340px] ${
          slug ? 'hidden lg:block' : 'block'
        }`}
      >
        <div className="mb-4 flex items-center justify-between gap-3 lg:mb-5">
          <h2 className="text-[19px] font-bold">Taxes ({taxes.length})</h2>
          <button
            type="button"
            onClick={handleAddTax}
            aria-label="Ajouter une taxe"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#d7dbd9] text-xl font-semibold text-[#3d4a44] transition-colors hover:bg-[#f1f3f2]"
          >
            +
          </button>
        </div>

        <ul className="flex flex-col gap-3">
          {taxes.map((tax) => {
            const active = selected?.slug === tax.slug
            const rate = currentRate(tax)
            return (
              <li key={tax.slug}>
                <Link
                  to={`/taxes/${tax.slug}`}
                  aria-current={active ? 'page' : undefined}
                  className={`block rounded-xl border px-4 py-3.5 transition-colors ${
                    active
                      ? 'border-[#0f6b52] bg-[#ecf4f0]'
                      : 'border-[#e2e6e4] bg-white hover:border-[#b9c2bd]'
                  }`}
                >
                  <span className="block text-[15px] font-bold">{tax.name}</span>
                  <span className="mt-1 block text-[14px] text-[#5a675f]">
                    {tax.periodicity.toLowerCase()}
                    {rate ? ` · ${formatAmount(rate.amount)}` : ''}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Détail */}
      <section
        className={`min-w-0 flex-1 bg-white px-5 py-6 sm:px-7 lg:py-7 ${
          slug ? 'block' : 'hidden lg:block'
        }`}
      >
        {selected ? (
          <>
            <Link
              to="/taxes"
              className="-ml-2 mb-3 flex min-h-11 w-fit items-center gap-1 rounded-lg px-2 text-[15px] font-semibold text-[#0f6b52] hover:bg-[#ecf4f0] lg:hidden"
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
              <h2 className="text-[22px] font-bold leading-tight">{selected.name}</h2>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-bold ${
                  selected.active
                    ? 'bg-[#e3f3e8] text-[#0f6b52]'
                    : 'bg-[#eef0ef] text-[#5a675f]'
                }`}
              >
                {selected.active ? 'Active' : 'Inactive'}
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
                    className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#5a675f]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
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
                  onChange={(e) => updateTax(selected.slug, { dueDate: e.target.value })}
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
                onChange={(e) => updateTax(selected.slug, { legalBasis: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className="mt-5">
              <p id="activities-label" className="mb-2 text-[13px] font-semibold text-[#4a5751]">
                Activités concernées (affectation automatique)
              </p>
              <ul aria-labelledby="activities-label" className="flex flex-wrap items-center gap-2">
                {selected.activities.map((activity) => (
                  <li
                    key={activity}
                    className="rounded-full bg-[#e3f3e8] px-3.5 py-1.5 text-[13px] font-bold text-[#0f6b52]"
                  >
                    {activity}
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={handleAddActivity}
                    className="min-h-9 rounded-full bg-[#eef0ef] px-3.5 py-1.5 text-[13px] font-semibold text-[#3d4a44] transition-colors hover:bg-[#e2e6e4]"
                  >
                    + ajouter
                  </button>
                </li>
              </ul>
            </div>

            <div className="mb-3 mt-7 flex items-center justify-between gap-3">
              <h3 className="text-[17px] font-bold">Historique des tarifs</h3>
              <button
                type="button"
                onClick={handleNewRate}
                className="min-h-11 rounded-lg bg-[#0f6b52] px-5 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-[#0b5540]"
              >
                Nouveau tarif
              </button>
            </div>

            <div role="table" aria-label="Historique des tarifs" className="text-[14px]">
              <div
                role="row"
                className="hidden grid-cols-[1.1fr_1fr_1fr_auto] gap-x-4 rounded-t-lg bg-[#f1f3f2] px-3 py-3 text-[13px] font-semibold text-[#4a5751] sm:grid"
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
                  className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 border-b border-[#e8ebe9] px-3 py-3.5 sm:grid-cols-[1.1fr_1fr_1fr_auto]"
                >
                  <span role="cell" className="font-semibold sm:font-normal">
                    {rate.date}
                  </span>
                  <span role="cell" className="text-right font-semibold sm:font-normal">
                    {formatAmount(rate.amount)} FCFA
                  </span>
                  <span role="cell" className="text-[14px] text-[#5a675f] sm:text-inherit">
                    {rate.createdBy}
                  </span>
                  <span role="cell" className="justify-self-end sm:w-24 sm:justify-self-start">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[12px] font-bold ${
                        rate.current
                          ? 'bg-[#e3f3e8] text-[#0f6b52]'
                          : 'bg-[#eef0ef] text-[#5a675f]'
                      }`}
                    >
                      {rate.current ? 'En vigueur' : 'Ancien'}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-5 text-[14px] leading-relaxed text-[#5a675f]">
              Un tarif déjà utilisé ne peut plus être modifié. Pour changer un montant, créez un
              nouveau tarif avec sa date d'effet.
            </p>
          </>
        ) : (
          <>
            <Link
              to="/taxes"
              className="-ml-2 mb-3 flex min-h-11 w-fit items-center rounded-lg px-2 text-[15px] font-semibold text-[#0f6b52] hover:bg-[#ecf4f0] lg:hidden"
            >
              Retour aux taxes
            </Link>
            <p className="text-[#5a675f]">Cette taxe n'existe pas ou a été supprimée.</p>
          </>
        )}
      </section>
    </div>
  )
}
