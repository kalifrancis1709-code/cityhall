import { Link } from "react-router-dom";

const NAV = [
  { label: "Connexion", to: "/login" },
  { label: "Inscription", to: "/signup" },
]

export default function Acceuil() {
  return (
    <div>
      <header>
        <nav className="flex gap-4">
          {NAV.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
    </div>
  );
}
