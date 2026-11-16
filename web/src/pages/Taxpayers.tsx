import { Link, useSearchParams } from "react-router-dom";

type Status = "actif" | "inactif";

type Taxpayer = {
  code: string;
  name: string;
  phone: string;
  activity: string; // valeur de ACTIVITIES
  zone: string; // valeur de ZONES
  status: Status;
  balance: number; // reste à payer, en FCFA
};

type Option = { value: string; label: string };

const ZONES: Option[] = [
  { value: "grand-marche", label: "Grand marché" },
  { value: "marche-de-be", label: "Marché de Bè" },
  { value: "adidogome", label: "Adidogomé" },
];

const ACTIVITIES: Option[] = [
  { value: "commerce-de-tissus", label: "Commerce de tissus" },
  { value: "quincaillerie", label: "Quincaillerie" },
  { value: "restauration", label: "Restauration" },
  { value: "pharmacie", label: "Pharmacie" },
  { value: "coiffure", label: "Coiffure" },
  { value: "vivres", label: "Vivres" },
  { value: "debit-de-boissons", label: "Débit de boissons" },
];

const STATUSES: Option[] = [
  { value: "actif", label: "Actif" },
  { value: "inactif", label: "Inactif" },
];

// TODO : remplacer par GET /api/taxpayers?zone=&activite=&statut=&q=&page=
const ALL_TAXPAYERS: Taxpayer[] = [
  {
    code: "CTB-2026-000429",
    name: "Dossou Kossi",
    phone: "+228 90 11 22 33",
    activity: "coiffure",
    zone: "marche-de-be",
    status: "actif",
    balance: 1500,
  },
  {
    code: "CTB-2026-000418",
    name: "Mensah Afi",
    phone: "+228 91 23 45 67",
    activity: "commerce-de-tissus",
    zone: "grand-marche",
    status: "actif",
    balance: 4500,
  },
  {
    code: "CTB-2026-000402",
    name: "Ets Lawson & Fils",
    phone: "+228 99 88 77 66",
    activity: "quincaillerie",
    zone: "grand-marche",
    status: "actif",
    balance: 0,
  },
  {
    code: "CTB-2026-000377",
    name: "Agbodjan Koffi",
    phone: "+228 92 34 56 78",
    activity: "restauration",
    zone: "grand-marche",
    status: "actif",
    balance: 12000,
  },
  {
    code: "CTB-2026-000351",
    name: "Pharmacie Espoir",
    phone: "+228 93 45 67 89",
    activity: "pharmacie",
    zone: "grand-marche",
    status: "actif",
    balance: 25000,
  },
  {
    code: "CTB-2025-000288",
    name: "Adjovi Mensah",
    phone: "+228 94 56 78 90",
    activity: "vivres",
    zone: "adidogome",
    status: "inactif",
    balance: 9000,
  },
  {
    code: "CTB-2025-000240",
    name: "Bar Chez Tonton",
    phone: "+228 95 67 89 01",
    activity: "debit-de-boissons",
    zone: "adidogome",
    status: "actif",
    balance: 18000,
  },
];

const PAGE_SIZE = 20;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cc79a]";

const fieldClass =
  "h-12 w-full rounded-lg border border-[#2b3a33] bg-[#0f1713] px-4 text-base text-[#e6efe9] placeholder:text-[#7d8d84] focus:outline-2 focus:outline-offset-0 focus:outline-[#4cc79a]";

const formatNumber = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(n).replace(/\u202f/g, "\u00a0");

// minuscules + sans accents, pour une recherche tolérante
const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const labelOf = (options: Option[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value;

function FilterSelect({
  id,
  label,
  allLabel,
  value,
  options,
  onChange,
  className = "",
}: {
  id: string;
  label: string;
  allLabel: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldClass} appearance-none pr-10`}
      >
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
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
  );
}

export default function Taxpayers() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const zone = searchParams.get("zone") ?? "";
  const activity = searchParams.get("activite") ?? "";
  const status = searchParams.get("statut") ?? "";
  const hasFilters = !!(q || zone || activity || status);

  // Un changement de filtre revient toujours à la page 1
  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    setSearchParams(next, { replace: true });
  };

  const resetFilters = () => setSearchParams({}, { replace: true });

  // TODO : remplacer ce filtrage local par l'appel API (avec un délai sur la recherche)
  const query = normalize(q.trim());
  const queryDigits = q.replace(/\s/g, "");
  const filtered = ALL_TAXPAYERS.filter(
    (t) =>
      (!zone || t.zone === zone) &&
      (!activity || t.activity === activity) &&
      (!status || t.status === status) &&
      (!query ||
        normalize(t.name).includes(query) ||
        normalize(t.code).includes(query) ||
        t.phone.replace(/\s/g, "").includes(queryDigits)),
  ).sort((a, b) => b.code.localeCompare(a.code));

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const requestedPage = parseInt(searchParams.get("page") ?? "1", 10);
  const page = Math.min(
    Math.max(1, Number.isNaN(requestedPage) ? 1 : requestedPage),
    totalPages,
  );
  const start = (page - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  const goToPage = (target: number) => {
    const next = new URLSearchParams(searchParams);
    if (target > 1) next.set("page", String(target));
    else next.delete("page");
    setSearchParams(next);
  };

  const handleRecenser = () => {
    // TODO : ouvrir le formulaire de recensement d'un contribuable
  };

  return (
    <section className="min-w-0 flex-1 px-4 py-5 sm:px-7 lg:py-8">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold sm:text-[28px]">Contribuables</h2>
        <button
          type="button"
          onClick={handleRecenser}
          className={`min-h-12 shrink-0 rounded-lg bg-[#4cc79a] px-5 py-2.5 text-base font-bold text-[#131a16] transition-colors hover:bg-[#5fd5aa] ${focusRing}`}
        >
          + Recenser
        </button>
      </div>

      {/* Filtres */}
      <div
        role="search"
        className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-[1fr_190px_190px_150px]"
      >
        <div className="col-span-2 sm:col-span-3 xl:col-span-1">
          <label htmlFor="q" className="sr-only">
            Rechercher un contribuable
          </label>
          <input
            id="q"
            type="search"
            value={q}
            onChange={(e) => setFilter("q", e.target.value)}
            placeholder="Nom, téléphone ou code (CTB-…)"
            autoComplete="off"
            className={fieldClass}
          />
        </div>
        <FilterSelect
          id="zone"
          label="Zone"
          allLabel="Toutes zones"
          value={zone}
          options={ZONES}
          onChange={(v) => setFilter("zone", v)}
          className="col-span-2 sm:col-span-1"
        />
        <FilterSelect
          id="activite"
          label="Activité"
          allLabel="Toutes activités"
          value={activity}
          options={ACTIVITIES}
          onChange={(v) => setFilter("activite", v)}
        />
        <FilterSelect
          id="statut"
          label="Statut"
          allLabel="Tous statuts"
          value={status}
          options={STATUSES}
          onChange={(v) => setFilter("statut", v)}
        />
      </div>

      {/* Tableau : cartes sur mobile, colonnes dès md */}
      <div role="table" aria-label="Liste des contribuables">
        <div
          role="row"
          className="hidden grid-cols-[1.25fr_1.4fr_1.5fr_1.1fr_5.5rem_6rem] gap-x-4 rounded-t-lg bg-[#18231e] px-3 py-3 text-[15px] font-semibold text-[#9fb0a7] md:grid"
        >
          <span role="columnheader">Code</span>
          <span role="columnheader">Nom</span>
          <span role="columnheader">Activité</span>
          <span role="columnheader">Zone</span>
          <span role="columnheader">Statut</span>
          <span role="columnheader" className="text-right">
            Reste à payer
          </span>
        </div>

        {rows.map((t) => (
          <div
            key={t.code}
            role="row"
            className="relative grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 border-b border-[#26332d] px-3 py-3.5 hover:bg-[#18231e] md:grid-cols-[1.25fr_1.4fr_1.5fr_1.1fr_5.5rem_6rem] md:gap-x-4 md:py-3"
          >
            <span
              role="cell"
              className="col-start-1 row-start-2 text-sm text-[#9fb0a7] md:col-auto md:row-auto md:text-[15px] md:text-[#e6efe9]"
            >
              {t.code}
            </span>
            <span
              role="cell"
              className="col-start-1 row-start-1 min-w-0 text-[17px] font-bold break-words md:col-auto md:row-auto md:text-[15px] md:font-normal"
            >
              {/* le lien couvre toute la ligne grâce à after:absolute after:inset-0 */}
              <Link
                to={`/taxpayers/${t.code}`}
                className={`rounded after:absolute after:inset-0 hover:underline ${focusRing}`}
              >
                {t.name}
              </Link>
            </span>
            <span
              role="cell"
              className="col-start-1 row-start-3 min-w-0 text-[15px] text-[#9fb0a7] md:col-auto md:row-auto md:text-[#e6efe9]"
            >
              {labelOf(ACTIVITIES, t.activity)}
            </span>
            <span
              role="cell"
              className="col-start-2 row-start-3 text-right text-[15px] text-[#9fb0a7] md:col-auto md:row-auto md:text-left md:text-[#e6efe9]"
            >
              {labelOf(ZONES, t.zone)}
            </span>
            <span
              role="cell"
              className="col-start-2 row-start-2 justify-self-end md:col-auto md:row-auto md:justify-self-start"
            >
              <span
                className={`inline-block rounded-full px-3 py-0.5 text-sm font-bold ${
                  t.status === "actif"
                    ? "bg-[#143528] text-[#4cc79a]"
                    : "bg-[#26302b] text-[#9fb0a7]"
                }`}
              >
                {labelOf(STATUSES, t.status)}
              </span>
            </span>
            <span
              role="cell"
              className="col-start-2 row-start-1 text-right font-semibold whitespace-nowrap md:col-auto md:row-auto md:font-normal"
            >
              <span className="font-normal text-[#9fb0a7] md:hidden">
                Reste :{" "}
              </span>
              {formatNumber(t.balance)}
              <span className="md:hidden"> FCFA</span>
            </span>
          </div>
        ))}
      </div>

      {rows.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-[#9fb0a7]">
            Aucun contribuable ne correspond à ces filtres.
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className={`mt-4 min-h-12 rounded-lg border border-[#35453d] px-5 font-bold hover:bg-[#1f2d27] ${focusRing}`}
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="text-[15px] text-[#9fb0a7]">
          {total === 0
            ? "0 résultat"
            : `${formatNumber(start + 1)}–${formatNumber(start + rows.length)} sur ${formatNumber(total)}`}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:flex">
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
            className={`min-h-12 rounded-lg border border-[#35453d] px-5 font-bold hover:bg-[#1f2d27] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent ${focusRing}`}
          >
            Précédent
          </button>
          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={page >= totalPages}
            className={`min-h-12 rounded-lg border border-[#35453d] px-5 font-bold hover:bg-[#1f2d27] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent ${focusRing}`}
          >
            Suivant
          </button>
        </div>
      </div>
    </section>
  );
}
