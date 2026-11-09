import { useState } from "react";

const ACTIVITES = [
  "Commerce de tissus",
  "Quincaillerie",
  "Coiffure",
  "Débit de boissons",
  "Couture",
  "Menuiserie",
  "Pharmacie",
];
const ZONES = ["Grand marché", "Hanoukopé", "Tokoin", "Bè-Kpota", "Adidogomé"];
// +228 suivi d'exactement 8 chiffres
const TEL_VALIDE = /^\+228\d{8}$/;

const champBase =
  "h-12 w-full rounded-lg border bg-surface px-3 text-base text-ink placeholder:text-secondary/70 focus-visible:outline-2 focus-visible:outline-brand";

type Props = {
  id: string;
  label: string;
  obligatoire?: boolean;
  erreur?: string;
  children: React.ReactNode;
};

function Champ({ id, label, obligatoire, erreur, children }: Props) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-secondary"
      >
        {label}
        {obligatoire && " *"}
      </label>
      {children}
      {erreur && (
        <p
          id={`${id}-erreur`}
          className="mt-1.5 text-sm font-semibold text-secondary"
        >
          {erreur}
        </p>
      )}
    </div>
  );
}

export default function NouveauContribuable() {
  const [type, setType] = useState<"Personne physique" | "Entreprise">(
    "Personne physique",
  );
  // Valeurs de départ = celles de la maquette (à vider pour la vraie version)
  const [nom, setNom] = useState("Mensah Afi");
  const [activite, setActivite] = useState("Commerce de tissus");
  const [telephone, setTelephone] = useState("+228 90 12 34");
  const [zone, setZone] = useState("Grand marché");
  const [repere, setRepere] = useState("Allée B, étal 112");
  const [piece, setPiece] = useState("");
  const [tentative, setTentative] = useState(false);
  const [telTouche, setTelTouche] = useState(true);
  const [envoye, setEnvoye] = useState(false);

  const tel = telephone.replace(/\s/g, "");
  const erreurs = {
    nom: nom.trim() === "" ? "Ce champ est obligatoire." : "",
    activite: activite === "" ? "Choisissez une option." : "",
    telephone:
      tel === ""
        ? "Ce champ est obligatoire."
        : TEL_VALIDE.test(tel)
          ? ""
          : "Numéro incomplet : 8 chiffres après +228.",
    zone: zone === "" ? "Choisissez une option." : "",
  };
  // Une erreur s'affiche après un essai d'envoi (le téléphone aussi dès qu'on le quitte)
  const voir = (c: keyof typeof erreurs) =>
    tentative || (c === "telephone" && telTouche) ? erreurs[c] : "";
  const bordure = (c: keyof typeof erreurs) =>
    voir(c) ? "border-rejected" : "border-border";

  function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setTentative(true);
    if (Object.values(erreurs).some(Boolean)) return;
    setEnvoye(true);
    setNom("");
    setActivite("");
    setTelephone("");
    setZone("");
    setRepere("");
    setPiece("");
    setTentative(false);
    setTelTouche(false);
  }

  return (
    <div className="min-h-screen bg-page p-6">
      {/* Cadre de téléphone : uniquement pour la maquette */}
      <div className="mx-auto w-97.5 max-w-full overflow-hidden bg-surface">
        <header className="bg-brand px-5 pt-6 pb-4 text-surface">
          <h1 className="text-xl font-bold">Nouveau contribuable</h1>
          <p className="text-sm opacity-90">
            Sera validé par votre superviseur
          </p>
        </header>

        <form noValidate onSubmit={envoyer} className="flex flex-col gap-4 p-4">
          {envoye && (
            <p
              role="status"
              className="rounded-lg bg-card p-3 text-sm font-semibold text-ink"
            >
              Fiche enregistrée. Elle sera validée par votre superviseur.
            </p>
          )}

          <div
            role="group"
            aria-label="Type de contribuable"
            className="grid grid-cols-2 overflow-hidden rounded-lg border border-border"
          >
            {(["Personne physique", "Entreprise"] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={type === t}
                onClick={() => setType(t)}
                className={`h-11 font-bold ${type === t ? "bg-brand text-surface" : "bg-surface text-ink"}`}
              >
                {t}
              </button>
            ))}
          </div>

          <Champ
            id="nom"
            label={type === "Entreprise" ? "Raison sociale" : "Nom et prénoms"}
            obligatoire
            erreur={voir("nom")}
          >
            <input
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              aria-invalid={!!voir("nom")}
              aria-describedby={voir("nom") ? "nom-erreur" : undefined}
              className={`${champBase} ${bordure("nom")}`}
            />
          </Champ>

          <Champ
            id="activite"
            label="Activité"
            obligatoire
            erreur={voir("activite")}
          >
            <select
              id="activite"
              value={activite}
              onChange={(e) => setActivite(e.target.value)}
              aria-invalid={!!voir("activite")}
              aria-describedby={
                voir("activite") ? "activite-erreur" : undefined
              }
              className={`${champBase} ${bordure("activite")}`}
            >
              <option value="">Choisir…</option>
              {ACTIVITES.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </Champ>

          <Champ
            id="telephone"
            label="Téléphone"
            obligatoire
            erreur={voir("telephone")}
          >
            <input
              id="telephone"
              type="tel"
              inputMode="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              onBlur={() => setTelTouche(true)}
              placeholder="+228 90 12 34 56"
              aria-invalid={!!voir("telephone")}
              aria-describedby={
                voir("telephone") ? "telephone-erreur" : undefined
              }
              className={`${champBase} ${bordure("telephone")}`}
            />
          </Champ>

          <Champ id="zone" label="Zone" obligatoire erreur={voir("zone")}>
            <select
              id="zone"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              aria-invalid={!!voir("zone")}
              aria-describedby={voir("zone") ? "zone-erreur" : undefined}
              className={`${champBase} ${bordure("zone")}`}
            >
              <option value="">Choisir…</option>
              {ZONES.map((z) => (
                <option key={z}>{z}</option>
              ))}
            </select>
          </Champ>

          <Champ id="repere" label="Repère / n° d'étal">
            <input
              id="repere"
              value={repere}
              onChange={(e) => setRepere(e.target.value)}
              className={`${champBase} border-border`}
            />
          </Champ>

          <Champ id="piece" label="Pièce d'identité">
            <input
              id="piece"
              value={piece}
              onChange={(e) => setPiece(e.target.value)}
              placeholder="Facultatif"
              className={`${champBase} border-border`}
            />
          </Champ>

          <button
            type="submit"
            className="h-12 rounded-lg bg-brand font-bold text-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Enregistrer la fiche
          </button>
        </form>
      </div>
    </div>
  );
}
