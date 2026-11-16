

export default function Encaisser() {
  return (
    <div>
        <header className="bg-green-950 text-white p-4 rounded-lg shadow-md">
            <h1>Encaisser</h1>
            <p>Mensah Afi . CTB-2026-000418</p>
        </header>
        <div>
            <h2>Créance à régler</h2>
            <div className="border border-gray-300 p-4 m-2">
                <h2>Droit de place</h2>
                <p>Octobre 2026 en retard</p>
            </div>
            <div className="border border-gray-300 p-4 m-2">
                <h2>Droit de place</h2>
                <p>Septembre 2026 en partielle</p>

            </div>
            <div className="border border-gray-300 p-4 m-2">
                <p>Montant réçu (F CFA)</p>
                <input type="number" name="" id="" />
            </div>
            <div>
                <p>Mode de paiement</p>
                <select name="" id="">
                    <option value="">Sélectionnez un mode de paiement</option>
                    <option value="espece">Espèce</option>
                    <option value="virement">Virement</option>
                    <option value="cheque">Chèque</option>
                </select>
            </div>
            <div className="bg-amber-100 text-amber-500 border border-gray-300 p-4 m-2">
                <p>Action définitive:une encaissement valider ne peut plus être modifié. Seul le receveur peut l'annuler.</p>
            </div>
            <div className="border border-gray-300 p-4 m-2">
                <button>Valider</button>
            </div>
        </div>
    </div>
  )
}
