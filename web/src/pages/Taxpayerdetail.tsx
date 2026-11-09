import { Link, useParams } from "react-router-dom";

type TaxLine = {
  name: string;
  rate: number; // FCFA
  unit: "mois" | "an";
  origin: "auto" | "manuelle";
  since: string;
};

type ReceivableStatus = "retard" | "soldee" | "partielle";

type Receivable = {
  period: string;
  tax: string;
  due: number;
  paid: number;
  status: ReceivableStatus;
};

type TaxpayerDetails = {
  code: string;
  name: string;
  active: boolean;
  activity: string;
  zone: string;
  phone: string;
  taxes: TaxLine[];
  receivables: Receivable[];
};

// TODO : remplacer par GET /api/taxpayers/:code
const DETAILS: Record<string, TaxpayerDetails> = {
  "CTB-2026-000418": {
    code: "CTB-2026-000418",
    name: "Mensah Afi",
    active: true,
    activity: "Commerce de tissus",
    zone: "Grand marché · Allée B, étal 112",
    phone: "+228 90 12 34 56",
    taxes: [
      {
        name: "Droit de place – marché",
        rate: 3000,
        unit: "mois",
        origin: "auto",
        since: "01/08/2026",
      },
      {
        name: "Enlèvement des ordures",
        rate: 1500,
        unit: "mois",
        origin: "auto",
        since: "01/08/2026",
      },
    ],
    receivables: [
      {
        period: "Octobre 2026",
        tax: "Droit de place",
        due: 3000,
        paid: 0,
        status: "retard",
      },
      {
        period: "Octobre 2026",
        tax: "Ordures",
        due: 1500,
        paid: 1500,
        status: "soldee",
      },
      {
        period: "Septembre 2026",
        tax: "Droit de place",
        due: 3000,
        paid: 1500,
        status: "partielle",
      },
      {
        period: "Août 2026",
        tax: "Droit de place",
        due: 3000,
        paid: 3000,
        status: "soldee",
      },
    ],
  },
  "CTB-2026-000402": {
    code: "CTB-2026-000402",
    name: "Ets Lawson & Fils",
    active: true,
    activity: "Quincaillerie",
    zone: "Grand marché · Face entrée nord",
    phone: "+228 99 88 77 66",
    taxes: [
      {
        name: "Droit de place – marché",
        rate: 3000,
        unit: "mois",
        origin: "auto",
        since: "01/01/2026",
      },
    ],
    receivables: [
      {
        period: "Octobre 2026",
        tax: "Droit de place",
        due: 3000,
        paid: 3000,
        status: "soldee",
      },
    ],
  },
};

const STATUS_STYLES: Record<
  ReceivableStatus,
  { label: string; className: string }
> = {
  retard: { label: "En retard", className: "bg-[#4a1f1c] text-[#f07a6e]" },
  soldee: { label: "Soldée", className: "bg-[#143528] text-[#4cc79a]" },
  partielle: { label: "Partielle", className: "bg-[#4a3516] text-[#f0b04a]" },
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cc79a]";

const outlineButton = `min-h-12 rounded-lg border border-[#35453d] px-5 text-base font-bold transition-colors hover:bg-[#1f2d27] ${focusRing}`;

const formatNumber = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(n).replace(/\u202f/g, "\u00a0");

function BackLink() {
  return (
    <Link
      to="/taxpayers"
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
      Contribuables
    </Link>
  );
}

export default function TaxpayerDetail() {
  const { code } = useParams();
  const taxpayer = code ? DETAILS[code] : undefined;

  const handleEdit = () => {
    // TODO : ouvrir le formulaire de modification du contribuable
  };

  const handleManualTax = () => {
    // TODO : ouvrir le formulaire d'ajout d'une taxe manuelle
  };

  const handlePayments = () => {
    // TODO : naviguer vers l'historique des paiements
  };

  if (!taxpayer) {
    return (
      <section className="min-w-0 flex-1 px-4 py-5 sm:px-7 lg:py-8">
        <BackLink />
        <h2 className="text-2xl font-bold">Contribuable introuvable</h2>
        <p className="mt-2 text-[#9fb0a7]">
          Aucune fiche ne correspond au code {code}.
        </p>
        <Link
          to="/taxpayers"
          className={`mt-5 hidden min-h-12 w-fit items-center rounded-lg border border-[#35453d] px-5 font-bold hover:bg-[#1f2d27] lg:inline-flex ${focusRing}`}
        >
          Retour à la liste
        </Link>
      </section>
    );
  }

  const totalRemaining = taxpayer.receivables.reduce(
    (sum, r) => sum + (r.due - r.paid),
    0
  );

  return (
    <section className="min-w-0 flex-1 px-4 py-5 sm:px-7 lg:py-8">
      <BackLink />

      {/* En-tête */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="font-mono text-sm tracking-widest text-[#9fb0a7] sm:text-base">
            {taxpayer.code}
          </p>
          <h2 className="mt-1 text-2xl font-bold leading-tight break-words sm:text-[28px]">
            {taxpayer.name}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold ${
              taxpayer.active
                ? "bg-[#143528] text-[#4cc79a]"
                : "bg-[#26302b] text-[#9fb0a7]"
            }`}
          >
            {taxpayer.active ? "Actif" : "Inactif"}
          </span>
          <button
            type="button"
            onClick={handleEdit}
            className={`${outlineButton} flex-1 sm:flex-none`}
          >
            Modifier
          </button>
        </div>
      </header>

      <dl className="mt-4 flex flex-col gap-1.5 text-base sm:flex-row sm:flex-wrap sm:gap-x-8 sm:text-[17px]">
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-[#9fb0a7]">Activité</dt>
          <dd>{taxpayer.activity}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-[#9fb0a7]">Zone</dt>
          <dd>{taxpayer.zone}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-[#9fb0a7]">Tél.</dt>
          <dd>
            <a
              href={`tel:${taxpayer.phone.replace(/\s/g, "")}`}
              className="hover:underline"
            >
              {taxpayer.phone}
            </a>
          </dd>
        </div>
      </dl>

      {/* Taxes applicables */}
      <div className="mt-7 mb-3 flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold">Taxes applicables</h3>
        <button
          type="button"
          onClick={handleManualTax}
          className={outlineButton}
        >
          + Taxe manuelle
        </button>
      </div>

      <div role="table" aria-label="Taxes applicables">
        <div
          role="row"
          className="hidden grid-cols-[2fr_1.2fr_1fr_1.2fr] gap-x-4 rounded-t-lg bg-[#18231e] px-3 py-3 text-[15px] font-semibold text-[#9fb0a7] md:grid"
        >
          <span role="columnheader">Taxe</span>
          <span role="columnheader">Tarif actuel</span>
          <span role="columnheader">Origine</span>
          <span role="columnheader">Depuis</span>
        </div>

        {taxpayer.taxes.map((tax) => (
          <div
            key={tax.name}
            role="row"
            className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 border-b border-[#26332d] px-3 py-3.5 md:grid-cols-[2fr_1.2fr_1fr_1.2fr] md:gap-x-4 md:py-3"
          >
            <span
              role="cell"
              className="col-start-1 row-start-1 min-w-0 text-[17px] font-bold md:col-auto md:row-auto md:text-base md:font-normal"
            >
              {tax.name}
            </span>
            <span
              role="cell"
              className="col-start-2 row-start-1 text-right font-semibold whitespace-nowrap md:col-auto md:row-auto md:text-left md:font-normal"
            >
              {formatNumber(tax.rate)} / {tax.unit}
            </span>
            <span
              role="cell"
              className="col-start-2 row-start-2 justify-self-end md:col-auto md:row-auto md:justify-self-start"
            >
              <span className="inline-block rounded-full bg-[#26302b] px-3 py-0.5 text-sm font-bold text-[#9fb0a7]">
                {tax.origin}
              </span>
            </span>
            <span
              role="cell"
              className="col-start-1 row-start-2 text-[15px] text-[#9fb0a7] md:col-auto md:row-auto md:text-base md:text-[#e6efe9]"
            >
              <span className="md:hidden">Depuis </span>
              {tax.since}
            </span>
          </div>
        ))}
      </div>

      {/* Créances */}
      <h3 className="mt-8 mb-3 text-lg font-bold">Créances</h3>

      <div role="table" aria-label="Créances">
        <div
          role="row"
          className="hidden grid-cols-[1.4fr_1.4fr_1fr_1fr_1fr_1.1fr] gap-x-4 rounded-t-lg bg-[#18231e] px-3 py-3 text-[15px] font-semibold text-[#9fb0a7] md:grid"
        >
          <span role="columnheader">Période</span>
          <span role="columnheader">Taxe</span>
          <span role="columnheader" className="text-right">
            Dû
          </span>
          <span role="columnheader" className="text-right">
            Payé
          </span>
          <span role="columnheader" className="text-right">
            Reste
          </span>
          <span role="columnheader">Statut</span>
        </div>

        {taxpayer.receivables.map((r) => {
          const status = STATUS_STYLES[r.status];
          return (
            <div
              key={`${r.period}-${r.tax}`}
              role="row"
              className="grid grid-cols-3 items-center gap-x-3 gap-y-1 border-b border-[#26332d] px-3 py-3.5 md:grid-cols-[1.4fr_1.4fr_1fr_1fr_1fr_1.1fr] md:gap-x-4 md:py-3"
            >
              <span
                role="cell"
                className="col-span-2 col-start-1 row-start-1 text-[17px] font-bold md:col-span-1 md:col-start-auto md:row-start-auto md:text-base md:font-normal"
              >
                {r.period}
              </span>
              <span
                role="cell"
                className="col-span-3 col-start-1 row-start-2 text-[15px] text-[#9fb0a7] md:col-span-1 md:col-start-auto md:row-start-auto md:text-base md:text-[#e6efe9]"
              >
                {r.tax}
              </span>
              <span
                role="cell"
                className="col-start-1 row-start-3 mt-1 md:col-start-auto md:row-start-auto md:mt-0 md:text-right"
              >
                <span className="block text-xs text-[#9fb0a7] md:hidden">
                  Dû
                </span>
                {formatNumber(r.due)}
              </span>
              <span
                role="cell"
                className="col-start-2 row-start-3 mt-1 text-center md:col-start-auto md:row-start-auto md:mt-0 md:text-right"
              >
                <span className="block text-xs text-[#9fb0a7] md:hidden">
                  Payé
                </span>
                {formatNumber(r.paid)}
              </span>
              <span
                role="cell"
                className="col-start-3 row-start-3 mt-1 text-right font-semibold md:col-start-auto md:row-start-auto md:mt-0 md:font-normal"
              >
                <span className="block text-xs font-normal text-[#9fb0a7] md:hidden">
                  Reste
                </span>
                {formatNumber(r.due - r.paid)}
              </span>
              <span
                role="cell"
                className="col-start-3 row-start-1 justify-self-end md:col-start-auto md:row-start-auto md:justify-self-start"
              >
                <span
                  className={`inline-block rounded-full px-3 py-0.5 text-sm font-bold ${status.className}`}
                >
                  {status.label}
                </span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base font-bold sm:text-[17px]">
          Total restant : {formatNumber(totalRemaining)} FCFA
        </p>
        <button
          type="button"
          onClick={handlePayments}
          className={`-ml-2 flex min-h-11 w-fit items-center gap-1.5 rounded-lg px-2 text-[#9fb0a7] hover:bg-[#1f2d27] hover:text-[#e6efe9] sm:ml-0 ${focusRing}`}
        >
          Historique des paiements
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
