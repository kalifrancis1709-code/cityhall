import { Link, NavLink } from "react-router-dom";

const LINKS = [
  { label: "Connexion", to: "/login" },
  { label: "Créer un compte", to: "/signup" },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6b52]";

export default function AuthNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e4e7e5] bg-[#ffffff]">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-3 px-4 sm:px-7">
        <Link
          to="/"
          className={`min-w-0 truncate rounded-lg py-2 text-lg font-bold sm:text-xl ${focusRing}`}
        >
          Recettes municipales
        </Link>

        <nav
          aria-label="Accès au compte"
          className="flex shrink-0 items-center gap-2"
        >
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `min-h-11 items-center rounded-lg px-4 text-base font-semibold transition-colors ${focusRing} ${
                  isActive
                    ? // sur mobile on masque le lien de la page courante pour gagner de la place
                      "hidden bg-[#0f6b52] text-[#ffffff] sm:flex"
                    : "flex border border-[#b9c2bd] text-[#17231f] hover:bg-[#f1f3f2]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
