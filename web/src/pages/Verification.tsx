export default function Verification() {
  return (
    <div className="flex flex-col items-center min-h-screen text-secondary bg-page">
      <div className="flex flex-col items-center w-full md:w-[30.5rem] md:rounded-lg md:mt-40 md:mx-0 md:my-auto md:rounded-lg md:border md:border-border md:bg-surface md:py-6 lg:my-auto lg:mt-full">
        {/* Badge et en-tête */}
        <span className="p-5 rounded-full text-center bg-menu mt-4 my-1">
          ✔️
        </span>
        <h1 className="text-[24px] text-ink font-bold mt-1 mb-3">
          Quittance authentique
        </h1>
        <p className="mb-4">Mairie de [Commune]</p>

        {/* Données */}
        <div className="flex w-75">
          <div className="flex flex-col flex-1">
            <span className="py-1.5 border-b border-border">Numéro</span>
            <span className="py-1.5 border-b border-border">Date</span>
            <span className="py-1.5 border-b border-border">Montant</span>
            <span className="py-1.5 border-b border-border">Contribuable</span>
            <span className="py-1.5">Statut</span>
          </div>
          <div className="flex flex-col flex-1 text-ink">
            <span className="py-1.5 border-b border-border">Q-2026-004127</span>
            <span className="py-1.5 border-b border-border">04/11/2026</span>
            <span className="py-1.5 border-b border-border">3000 FCFA</span>
            <span className="py-1.5 border-b border-border">M***A</span>
            <span className="px-1.5 mr-22 my-1.5 rounded-xl bg-menu text-brand text-center font-bold">
              Valide
            </span>
          </div>
        </div>

        {/* Notifications */}
        <div className="border border-border rounded-lg w-80 my-4">
          <div className="my-4 mx-3">
            <span className="rounded-full px-3 py-1 text-badge-text bg-badge">
              !
            </span>
            <span className="mx-2 font-bold text-ink">
              Autres réponses possibles
            </span>
          </div>
          <p className="mt-2 mb-3 mx-4 text-[14px]">
            &lt;&lt;Quittance annulée le ...&gt;&gt;ou&lt;&lt;Quittance
            inconnue: ne l'accepter pas&gt;&gt;.
          </p>
        </div>
      </div>
    </div>
  );
}