import { Link, Outlet } from "react-router";
import { responsable } from "../interface/Responsable";
import { useState } from "react";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-page text-ink">
      {/* Bouton hamburger*/}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-lg bg-surface border border-border"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`${open ? "block" : "hidden"} md:block fixed md:static inset-y-0 left-0 z-40 w-60 bg-menu px-3`}
      >
        <p className="px-3 pt-4 pb-4 font-bold text-lg">Recettes municipales</p>

        {/* Lien et chemin */}

        <ul className="flex flex-col gap-1">
          <Link
            to="/"
            className="rounded-lg focus:bg-brand focus:text-surface focus:font-semibold focus:outline-none"
          >
            <li className="px-3 py-2 rounded-lg hover:bg-brand hover:text-surface hover:font-semibold">
              Accueil
            </li>
          </Link>

          <Link
            to=""
            className="rounded-lg focus:bg-brand focus:text-surface focus:font-semibold focus:outline-none"
          >
            <li className="px-3 py-2 rounded-lg hover:bg-brand hover:text-surface hover:font-semibold">
              Contribuables
            </li>
          </Link>
          <Link
            to="/taxes"
            className="rounded-lg focus:bg-brand focus:text-surface focus:font-semibold focus:outline-none"
          >
            <li className="px-3 py-2 rounded-lg hover:bg-brand hover:text-surface hover:font-semibold">
              Taxes
            </li>
          </Link>

          <Link to="/contribuables" className="rounded-lg focus:bg-brand focus:text-surface focus:font-semibold focus:outline-none">
            <li className="px-3 py-2 rounded-lg hover:bg-brand hover:text-surface hover:font-semibold">
              Contribuables
            </li>
          </Link>

          <Link to="/taxpayers" className="rounded-lg focus:bg-brand focus:text-surface focus:font-semibold focus:outline-none">
            <li className="px-3 py-2 rounded-lg hover:bg-brand hover:text-surface hover:font-semibold">
              Taxpayers
            </li>
          </Link>

          <Link to="/contribuables/:slug" className="rounded-lg focus:bg-brand focus:text-surface focus:font-semibold focus:outline-none">
            <li className="px-3 py-2 rounded-lg hover:bg-brand hover:text-surface hover:font-semibold">
              Détails du contribuable
            </li>
          </Link>
          

          <Link
            to="/validation"
            className="rounded-lg focus:bg-brand focus:text-surface focus:font-semibold focus:outline-none"
          >
            <li className="px-3 py-2 rounded-lg hover:bg-brand hover:text-surface hover:font-semibold">
              Validation{" "}
              <span className="px-1.5 rounded-full bg-badge text-badge-text">
                7
              </span>
            </li>
          </Link>

          <Link
            to=""
            className="rounded-lg focus:bg-brand focus:text-surface focus:font-semibold focus:outline-none"
          >
            <li className="px-3 py-2 rounded-lg hover:bg-brand hover:text-surface hover:font-semibold">
              Impayés
            </li>
          </Link>

          <Link
            to="/Journal-d'audit"
            className="rounded-lg focus:bg-brand focus:text-surface focus:font-semibold focus:outline-none"
          >
            <li className="px-3 py-2 rounded-lg hover:bg-brand hover:text-surface hover:font-semibold">
              Journal d'audit
            </li>
          </Link>

          <Link
            to="/tableau-de-bord"
            className="rounded-lg focus:bg-brand focus:text-surface focus:font-semibold focus:outline-none"
          >
            <li className="px-3 py-2 rounded-lg hover:bg-brand hover:text-surface hover:font-semibold">
              Tableau de bord
            </li>
          </Link>
        </ul>

        {/* Responsable */}
        <div className="m-2 px-3 py-4 border-t border-border text-sm text-secondary">
          <p>{responsable[0].type}</p>
          <p>{responsable[0].name}</p>
        </div>
      </aside>

      {/* Affichage des pages */}
      <main className="flex-1 bg-surface">
        <Outlet />
      </main>
    </div>
  );
}
