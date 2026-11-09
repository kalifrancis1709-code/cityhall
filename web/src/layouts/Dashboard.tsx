import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export type DashboardContext = {
  /** Permet à une page de mettre à jour le badge « Validations » de la sidebar */
  setPendingCount: (count: number) => void;
};

const NAV = [
  { label: "Accueil", to: "/", end: true },
  { label: "Contribuables", to: "/taxpayers" },
  { label: "Validations", to: "/validation", badge: true },
  { label: "Impayés", to: "/unpaid-taxes" },
  { label: "Tableau de bord", to: "/board" },
  { label: "Taxes", to: "/taxes/1" },
  { label: "Zones", to: "/zones/1" },
  { label: "Utilisateur", to: "/user/1" },
  { label: "Activité", to: "/activity" },
  { label: "Déconnexion", to: "/logout" },
  { label: "Connexion", to: "/login" },
  { label: "Inscription", to: "/signup" },
  { label: "Page non trouvée", to: "/404" },
];

const USER = { role: "Superviseur", name: "Esso Tchalla" };

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4cc79a]";

function Badge({ count }: { count: number }) {
  return (
    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#4a3516] px-1.5 text-sm font-bold text-[#f0b04a]">
      {count}
    </span>
  );
}

export default function Dashboard() {
  const [pendingCount, setPendingCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fermer le menu mobile avec la touche Échap
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="min-h-dvh bg-[#131c18] text-[#e6efe9] lg:flex">
      {/* Barre du haut : mobile et tablette uniquement */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-[#26332d] bg-[#18231e] px-4 py-2 lg:hidden">
        <h1 className="truncate text-lg font-bold">Recettes municipales</h1>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          aria-controls="sidebar"
          className={`relative flex size-11 shrink-0 items-center justify-center rounded-lg hover:bg-[#1f2d27] ${focusRing}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          {pendingCount > 0 && (
            <span
              className="absolute top-2 right-2 size-2.5 rounded-full bg-[#f0b04a]"
              aria-hidden="true"
            />
          )}
        </button>
      </header>

      {/* Fond sombre derrière le menu mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[85vw] flex-col overflow-y-auto border-r border-[#26332d] bg-[#18231e] px-4 py-5 transition-transform duration-200 motion-reduce:transition-none lg:sticky lg:top-0 lg:h-dvh lg:w-[262px] lg:shrink-0 lg:translate-x-0 lg:px-[18px] lg:py-7 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between gap-2 lg:mb-6">
          <p className="px-3 text-xl font-bold leading-tight">
            Recettes municipales
          </p>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
            className={`flex size-11 shrink-0 items-center justify-center rounded-lg hover:bg-[#1f2d27] lg:hidden ${focusRing}`}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1" aria-label="Navigation principale">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex min-h-12 items-center gap-2 rounded-lg px-3 py-2.5 text-[17px] font-medium transition-colors ${focusRing} ${
                  isActive
                    ? "bg-[#4cc79a] font-semibold text-[#0f1a15]"
                    : "text-[#e6efe9] hover:bg-[#1f2d27]"
                }`
              }
            >
              {item.label}
              {item.badge && pendingCount > 0 ? (
                <Badge count={pendingCount} />
              ) : null}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-[#26332d] px-3 pt-5 text-[15px] leading-snug text-[#9fb0a7] lg:mt-6">
          <p>{USER.role}</p>
          <p>{USER.name}</p>
        </div>
      </aside>

      <main className="min-w-0 flex-1 lg:flex">
        <Outlet context={{ setPendingCount } satisfies DashboardContext} />
      </main>
    </div>
  );
}
