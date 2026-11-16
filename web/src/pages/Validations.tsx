import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { DashboardContext } from "../layouts/Dashboard";

type Duplicate = {
  name: string;
  code: string;
  reason: string;
};

type Submission = {
  id: string;
  name: string;
  type: string;
  activity: string;
  manager: string;
  phone: string;
  zone: string;
  landmark: string;
  submittedBy: string;
  submittedAt: string;
  duplicate?: Duplicate;
};

// TODO : remplacer par l'appel API
const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: "1",
    name: "Ets Lawson & Fils",
    type: "Entreprise",
    activity: "Quincaillerie",
    manager: "Lawson Kodzo",
    phone: "+228 99 88 77 66",
    zone: "Grand marché",
    landmark: "Face entrée nord",
    submittedBy: "K. Amouzou",
    submittedAt: "hier",
    duplicate: {
      name: "Lawson et Fils",
      code: "CTB-2026-000402",
      reason: "même téléphone",
    },
  },
  {
    id: "2",
    name: "Dossou Kossi",
    type: "Particulier",
    activity: "Coiffure",
    manager: "Dossou Kossi",
    phone: "+228 90 11 22 33",
    zone: "Marché de Bè",
    landmark: "Près du carrefour",
    submittedBy: "K. Amouzou",
    submittedAt: "hier",
  },
  {
    id: "3",
    name: "Bar Le Rendez-vous",
    type: "Entreprise",
    activity: "Débit de boissons",
    manager: "Adjovi Mensah",
    phone: "+228 92 44 55 66",
    zone: "Adidogomé",
    landmark: "Derrière la pharmacie",
    submittedBy: "S. Adzo",
    submittedAt: "02/11/2026",
  },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6b52]";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-baseline gap-3 border-b border-[#e4e7e5] py-3.5 last:border-b-0 sm:grid-cols-[8rem_1fr] xl:px-3 xl:[&:nth-last-child(2)]:border-b-0">
      <dt className="text-[#5a675f]">{label}</dt>
      <dd className="font-semibold break-words">{value}</dd>
    </div>
  );
}
 
export default function Validations() {
  const [items, setItems] = useState<Submission[]>(INITIAL_SUBMISSIONS);
  const [selectedId, setSelectedId] = useState<string>(
    INITIAL_SUBMISSIONS[0].id,
  );
  // Mobile / tablette : on affiche soit la liste, soit le détail
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const { setPendingCount } = useOutletContext<DashboardContext>();

  useEffect(() => {
    setPendingCount(items.length);
  }, [items.length, setPendingCount]);

  const selected = items.find((i) => i.id === selectedId) ?? null;

  const select = (id: string) => {
    setSelectedId(id);
    setMobileView("detail");
    setReason("");
    setError("");
  };

  const removeSelected = () => {
    if (!selected) return;
    const remaining = items.filter((i) => i.id !== selected.id);
    setItems(remaining);
    setSelectedId(remaining[0]?.id ?? "");
    setMobileView("list");
    setReason("");
    setError("");
  };

  const handleValidate = () => {
    // TODO : POST /api/validations/:id/validate
    removeSelected();
  };

  const handleReject = () => {
    if (!reason.trim()) {
      setError("Indiquez un motif pour rejeter la fiche.");
      return;
    }
    // TODO : POST /api/validations/:id/reject { reason }
    removeSelected();
  };

  return (
    <>
      {/* Liste : plein écran sur mobile, colonne fixe dès lg */}
      <section
        className={`w-full px-4 py-5 sm:px-7 lg:block lg:w-[340px] lg:shrink-0 lg:border-r lg:border-[#e4e7e5] lg:py-8 xl:w-[390px] ${
          mobileView === "detail" ? "hidden" : "block"
        }`}
      >
        <h2 className="mb-4 text-xl font-bold sm:text-2xl lg:mb-5">
          À valider ({items.length})
        </h2>

        {items.length === 0 ? (
          <p className="text-[#5a675f]">
            Aucune fiche en attente de validation.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {items.map((item) => {
              const active = item.id === selectedId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => select(item.id)}
                    aria-current={active ? "true" : undefined}
                    className={`min-h-14 w-full rounded-xl border px-4 py-3.5 text-left transition-colors ${focusRing} ${
                      // la surbrillance n'a de sens que lorsque liste et détail sont visibles ensemble
                      active
                        ? "border-[#e4e7e5] bg-[#ffffff] lg:border-[#3fb68a] lg:bg-[#e3f3e8]"
                        : "border-[#e4e7e5] bg-[#ffffff] hover:border-[#b9c2bd]"
                    }`}
                  >
                    <span className="block text-[17px] font-bold">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-[15px] text-[#5a675f]">
                      {item.activity} · par {item.submittedBy} ·{" "}
                      {item.submittedAt}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Détail */}
      <section
        className={`min-w-0 flex-1 px-4 py-5 sm:px-7 lg:block lg:py-8 ${
          mobileView === "list" ? "hidden" : "block"
        }`}
      >
        {selected ? (
          <>
            <button
              type="button"
              onClick={() => setMobileView("list")}
              className={`-ml-2 mb-3 flex min-h-11 items-center gap-1 rounded-lg px-2 font-semibold text-[#0f6b52] hover:bg-[#f1f3f2] lg:hidden ${focusRing}`}
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
              Retour à la liste
            </button>

            <header className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <h2 className="text-2xl font-bold leading-tight sm:text-[28px]">
                {selected.name}
              </h2>
              <span className="shrink-0 rounded-full bg-[#fbf3e2] px-3 py-1 text-sm font-bold text-[#8a5a16]">
                À valider
              </span>
            </header>

            <dl className="text-base sm:text-[17px] xl:grid xl:grid-cols-2">
              <Field label="Type" value={selected.type} />
              <Field label="Activité" value={selected.activity} />
              <Field label="Responsable" value={selected.manager} />
              <Field label="Téléphone" value={selected.phone} />
              <Field label="Zone" value={selected.zone} />
              <Field label="Repère" value={selected.landmark} />
            </dl>

            {selected.duplicate && (
              <div
                role="alert"
                className="mt-5 rounded-xl bg-[#fbf3e2] px-4 py-3.5 text-[15px] leading-relaxed text-[#8a5a16] sm:px-5 sm:py-4 sm:text-base"
              >
                Fiche proche existante : « {selected.duplicate.name} » (
                {selected.duplicate.code}), {selected.duplicate.reason}.
                Vérifiez qu'il ne s'agit pas d'un doublon.
              </div>
            )}

            <label
              htmlFor="reason"
              className="mt-6 mb-2 block text-[15px] font-semibold text-[#5a675f]"
            >
              Motif (obligatoire en cas de rejet)
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError("");
              }}
              placeholder={
                selected.duplicate
                  ? `Ex. : doublon de ${selected.duplicate.code}`
                  : "Ex. : informations incomplètes"
              }
              aria-invalid={!!error}
              aria-describedby={error ? "reason-error" : undefined}
              // text-base (16px) évite le zoom automatique sur iOS
              className={`h-24 w-full resize-none rounded-lg border bg-transparent px-4 py-3 text-base text-[#17231f] placeholder:text-[#8a958f] focus:outline-2 focus:outline-offset-0 focus:outline-[#0f6b52] sm:h-[72px] ${
                error ? "border-[#f07a6e]" : "border-[#b9c2bd]"
              }`}
            />
            {error && (
              <p id="reason-error" className="mt-2 text-sm text-[#f07a6e]">
                {error}
              </p>
            )}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleValidate}
                className={`min-h-12 w-full rounded-lg bg-[#0f6b52] px-5 py-3 text-base font-bold text-[#ffffff] transition-colors hover:bg-[#0b5540] sm:w-auto ${focusRing}`}
              >
                Valider la fiche
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="min-h-12 w-full rounded-lg border border-[#b9c2bd] px-5 py-3 text-base font-bold text-[#f07a6e] transition-colors hover:bg-[#f1f3f2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f07a6e] sm:w-auto"
              >
                Rejeter
              </button>
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-[#5a675f] sm:text-base">
              À la validation, les taxes liées à l'activité «{" "}
              {selected.activity} » sont affectées automatiquement (API : étape
              6).
            </p>
          </>
        ) : (
          <p className="text-[#5a675f]">
            {items.length === 0
              ? "Toutes les fiches ont été traitées."
              : "Sélectionnez une fiche dans la liste pour la valider ou la rejeter."}
          </p>
        )}
      </section>
    </>
  );
}
