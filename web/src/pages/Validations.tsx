import { useState } from "react";

type Fiche = {
  id: number;
  nom: string;
  type: "Personne physique" | "Entreprise";
  activite: string;
  responsable: string;
  telephone: string;
  zone: string;
  repere: string;
  agent: string;
  date: string;
  doublon?: { nom: string; code: string };
};

const FICHES: Fiche[] = [
  {
    id: 1,
    nom: "Ets Lawson & Fils",
    type: "Entreprise",
    activite: "Quincaillerie",
    responsable: "Lawson Kodzo",
    telephone: "+228 99 88 77 66",
    zone: "Grand marché",
    repere: "Face entrée nord",
    agent: "K. Amouzou",
    date: "hier",
    doublon: { nom: "Lawson et Fils", code: "CTB-2026-000402" },
  },
  {
    id: 2,
    nom: "Dossou Kossi",
    type: "Personne physique",
    activite: "Coiffure",
    responsable: "Dossou Kossi",
    telephone: "+228 90 45 12 78",
    zone: "Grand marché",
    repere: "Allée C, étal 34",
    agent: "K. Amouzou",
    date: "hier",
  },
  {
    id: 3,
    nom: "Bar Le Rendez-vous",
    type: "Entreprise",
    activite: "Débit de boissons",
    responsable: "Agbodjan Sena",
    telephone: "+228 91 20 33 54",
    zone: "Hanoukopé",
    repere: "Face au carrefour",
    agent: "S. Adzo",
    date: "02/11/2026",
  },
];

export default function Validations() {
  const [fiches, setFiches] = useState<Fiche[]>(FICHES);
  const [selectedId, setSelectedId] = useState<number | null>(FICHES[0].id);
  const [motif, setMotif] = useState("");
  const [erreur, setErreur] = useState(false);

  const fiche = fiches.find((f) => f.id === selectedId);

  function choisir(id: number) {
    setSelectedId(id);
    setMotif("");
    setErreur(false);
  }

  function traiter(action: "valider" | "rejeter") {
    if (!fiche) return;
    // Le motif est obligatoire seulement pour un rejet
    if (action === "rejeter" && motif.trim() === "") {
      setErreur(true);
      return;
    }
    const restantes = fiches.filter((f) => f.id !== fiche.id);
    setFiches(restantes);
    setSelectedId(restantes[0]?.id ?? null);
    setMotif("");
    setErreur(false);
  }

  return (
    <div className="flex min-h-screen">
      {/* Colonne de gauche : la liste */}
      <section
        aria-labelledby="titre-liste"
        className="w-100 shrink-0 border-r border-border p-5"
      >
        <h1 id="titre-liste" className="mb-4 text-xl font-bold text-ink">
          À valider ({fiches.length})
        </h1>
        <ul className="flex flex-col gap-3">
          {fiches.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => choisir(f.id)}
                aria-current={f.id === selectedId}
                className={`w-full rounded-lg border p-4 text-left focus-visible:outline-2 focus-visible:outline-brand ${
                  f.id === selectedId
                    ? "border-brand bg-card"
                    : "border-border bg-surface hover:bg-page"
                }`}
              >
                <span className="block font-bold text-ink">{f.nom}</span>
                <span className="mt-1 block text-sm text-secondary">
                  {f.activite} · par {f.agent} · {f.date}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Colonne de droite : le détail */}
      <section className="flex-1 p-0">
        {!fiche ? (
          <p className="text-secondary">
            Aucune fiche à valider pour le moment.
          </p>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-ink">{fiche.nom}</h2>
              <span className="rounded-full bg-badge px-3 py-1 text-xs font-bold text-badge-text">
                À valider
              </span>
            </div>

            <dl className="mt-5 grid grid-cols-[auto_1fr_auto_1fr] text-sm [&>*]:border-b [&>*]:border-border [&>*]:px-3 [&>*]:py-3 [&>*:nth-last-child(-n+4)]:border-b-0">
              <dt className="text-secondary">Type</dt>
              <dd className="font-medium text-ink">{fiche.type}</dd>
              <dt className="text-secondary">Activité</dt>
              <dd className="font-medium text-ink">{fiche.activite}</dd>
              <dt className="text-secondary">Responsable</dt>
              <dd className="font-medium text-ink">{fiche.responsable}</dd>
              <dt className="text-secondary">Téléphone</dt>
              <dd className="font-medium text-ink">{fiche.telephone}</dd>
              <dt className="text-secondary">Zone</dt>
              <dd className="font-medium text-ink">{fiche.zone}</dd>
              <dt className="text-secondary">Repère</dt>
              <dd className="font-medium text-ink">{fiche.repere}</dd>
            </dl>

            {fiche.doublon && (
              <p className="mt-5 rounded-lg bg-badge p-4 text-sm text-badge-text">
                Fiche proche existante : « {fiche.doublon.nom} » (
                {fiche.doublon.code}), même téléphone. Vérifiez qu'il ne s'agit
                pas d'un doublon.
              </p>
            )}

            <div className="mt-5">
              <label
                htmlFor="motif"
                className="mb-2 block text-sm font-semibold text-secondary"
              >
                Motif (obligatoire en cas de rejet)
              </label>
              <textarea
                id="motif"
                value={motif}
                onChange={(e) => {
                  setMotif(e.target.value);
                  setErreur(false);
                }}
                placeholder={`Ex. : doublon de ${fiche.doublon?.code ?? "CTB-2026-000402"}`}
                aria-invalid={erreur}
                aria-describedby={erreur ? "motif-erreur" : undefined}
                className={`h-24 w-full rounded-lg border bg-surface p-3 text-ink placeholder:text-secondary/70 focus-visible:outline-2 focus-visible:outline-brand ${
                  erreur ? "border-rejected" : "border-border"
                }`}
              />
              {erreur && (
                <p
                  id="motif-erreur"
                  role="alert"
                  className="mt-1 text-sm font-medium text-rejected"
                >
                  Indiquez un motif pour rejeter cette fiche.
                </p>
              )}
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => traiter("valider")}
                className="rounded-lg bg-brand px-5 py-2.5 font-bold text-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Valider la fiche
              </button>
              <button
                type="button"
                onClick={() => traiter("rejeter")}
                className="rounded-lg border border-border bg-surface px-5 py-2.5 font-bold text-rejected focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rejected"
              >
                Rejeter
              </button>
            </div>

            <p className="mt-5 text-sm text-secondary">
              À la validation, les taxes liées à l'activité « {fiche.activite} »
              sont affectées automatiquement (API : étape 6).
            </p>
          </>
        )}
      </section>
    </div>
  );
}
