import { useNavigate } from "react-router";

export default function Quittance() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-md text-center">
      <header className="rounded-lg bg-green-950 p-4 text-white shadow-md">
        <h1>Quittance émise</h1>
        <p>Remettez-la au contribuable</p>
      </header>

      <div className="m-2 border-2 border-dotted border-gray-400 p-4">
        <div className="border-b-2 border-dotted border-gray-400 p-4">
          <h2>MAIRIE DE [COMMUNE]</h2>
          <p>Recette municipale</p>
        </div>

        <div className="border-b-2 border-dotted border-gray-400 p-4">
          <h2>N° [NUMERO]</h2>
          <p>Le [DATE] à [HEURE]</p>
        </div>

        <div className="border-b-2 border-dotted border-gray-400 p-4">
          <ul>
            <li>Nom du contribuable : [NOM]</li>
            <li>Adresse : [ADRESSE]</li>
            <li>Code : [CODE]</li>
            <li>Taxe : [TAXE]</li>
            <li>Période : [PERIODE]</li>
          </ul>
        </div>

        <div className="border-b-2 border-dotted border-gray-400 p-4">
          <ul>
            <li>Montant payé : [MONTANT]</li>
            <li>Montant en lettres : [MONTANT_LETTRES]</li>
          </ul>
        </div>
        {/* <div className="border-b-2 border-dotted border-gray-400 p-4">
          <QRCode value="https://example.com" size={128} />
        </div> */}

        <div className="flex justify-center gap-2 p-4">
          <button
            className="rounded-lg bg-white p-2 text-black shadow-md"
            onClick={() => window.print()}
          >
            Partager (PDF)
          </button>
          <button
            className="rounded-lg bg-green-950 p-2 text-white shadow-md"
            onClick={() => navigate("/encaisser")}
          >
            Nouvel encaissement
          </button>
        </div>
      </div>
    </div>
  );
}