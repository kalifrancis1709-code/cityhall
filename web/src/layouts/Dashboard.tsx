import { NavLink, Outlet } from "react-router";

const navItems = [
  { to: "/", label: "Accueil" },
  { to: "/contribuables", label: "Contribuables" },
  { to: "/validations", label: "Validations", count: 7 },
  { to: "/impayes", label: "Impayés" },
  { to: "/tableau-de-bord", label: "Tableau de bord" },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-page text-ink">
      {/* Menu de gauche */}
      <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-menu">
        <p className="px-5 pt-6 pb-5 text-lg font-bold">
          Recettes
          <br /> municipales
        </p>

        <nav aria-label="Navigation principale" className="px-2 pb-5">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-lg px-3 py-2 font-semibold focus-visible:outline-2 focus-visible:outline-brand ${
                      isActive
                        ? "bg-brand text-surface"
                        : "text-ink hover:bg-card"
                    }`
                  }
                >
                  {item.label}
                  {item.count !== undefined && (
                    <span className="rounded-full bg-badge px-2 py-0.5 text-xs font-bold text-brand">
                      {item.count}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bas du menu : utilisateur connecté */}
        <div className="m-2 border-t border-border px-3 pt-4 pb-5 text-sm text-secondary">
          <p>Superviseur</p>
          <p>Esso Tchalla</p>
        </div>
      </aside>

      {/* Zone de contenu : la page choisie s'affiche ici */}
      <main className="flex-1 bg-surface">
        <Outlet />
      </main>
    </div>
  );
}
