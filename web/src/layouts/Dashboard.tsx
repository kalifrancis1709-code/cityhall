import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export type DashboardContext = {
  /** Permet à une page de mettre à jour le badge « Validations » de la sidebar */
  setPendingCount: (count: number) => void;
};

const NAV = [
  { label: "Accueil", to: "/", end: true },
  { label: "Contribuables", to: "/contribuables" },
  { label: "Taxes", to: "/taxes" },
  { label: "Quittance", to: "/quittance" },
  { label: "Encaisser", to: "/encaisser" },
];

const USER = { role: "Superviseur", name: "Esso Tchalla" };

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6b52]";

function Badge({ count }: { count: number }) {
  return (
    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#fbf3e2] px-1.5 text-sm font-bold text-[#8a5a16]">
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
    <div className="min-h-dvh bg-[#f7f8f7] text-[#17231f] lg:flex">
      {/* Barre du haut : mobile et tablette uniquement */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-[#e4e7e5] bg-[#ffffff] px-4 py-2 lg:hidden">
        <h1 className="truncate text-lg font-bold">Recettes municipales</h1>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          aria-controls="sidebar"
          className={`relative flex size-11 shrink-0 items-center justify-center rounded-lg hover:bg-[#f1f3f2] ${focusRing}`}
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
              className="absolute top-2 right-2 size-2.5 rounded-full bg-[#8a5a16]"
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
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[85vw] flex-col overflow-y-auto border-r border-[#e4e7e5] bg-[#ffffff] px-4 py-5 transition-transform duration-200 motion-reduce:transition-none lg:sticky lg:top-0 lg:h-dvh lg:w-[262px] lg:shrink-0 lg:translate-x-0 lg:px-[18px] lg:py-7 ${
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
            className={`flex size-11 shrink-0 items-center justify-center rounded-lg hover:bg-[#f1f3f2] lg:hidden ${focusRing}`}
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
                    ? "bg-[#0f6b52] font-semibold text-[#ffffff]"
                    : "text-[#17231f] hover:bg-[#f1f3f2]"
                }`
              }
            >
              {item.label}
              {item && pendingCount > 0 ? (
                <Badge count={pendingCount} />
              ) : null}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-[#e4e7e5] px-3 pt-5 text-[15px] leading-snug text-[#5a675f] lg:mt-6">
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
