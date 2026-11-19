export default function Validation() {
  return (
    <>
      <div className="flex min-h-screen bg-page text-secondary font-sans">
        {/* Colonne gauche */}
        <div className="w-100 border-r border-border">
          <h2 className="font-bold text-lg text-ink mx-5 mt-4 mb-2 ">
            À valider
          </h2>
          <div className="flex flex-col">
            <div className="mx-5 my-2 p-3 border-[1px] border-brand rounded-lg bg-menu">
              <p className="font-bold mb-2 text-ink">Ets Lawson & Fils</p>
              <p>Quincallerie•par K. Amouzou•hier</p>
            </div>
            <div className="mx-5 my-2 p-3 border-[1px] border-brand rounded-lg ">
              <p className="font-bold mb-2 text-ink">Dossou Kossi</p>
              <p>Coiffure•par K. Amouzou•hier</p>
            </div>
            <div className="mx-5 my-2 p-3 border-[1px] border-brand rounded-lg">
              <p className="font-bold mb-2 text-ink">Bar Le Rendez-vous</p>
              <p>Débit de boissons•par S. Adzo•02/11</p>
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="flex flex-col flex-1 gap-1">
          <p className="mx-8 mt-4 mb-2 font-bold text-lg text-ink">
            Ets Lawson & Fils
          </p>
          <div className="flex mx-8">
            <div className="flex flex-col flex-1">
              <span className="py-2 border-b border-border">Type</span>
              <span className="py-2 border-b border-border">Responsable</span>
              <span className="py-2">Zone</span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="py-2 border-b border-border">Entreprise</span>
              <span className="py-2 border-b border-border">Lawson Kodzo</span>
              <span className="py-2">Grand marché</span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="py-2 border-b border-border">Activité</span>
              <span className="py-2 border-b border-border">Téléphone</span>
              <span className="">Repère</span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="py-2 border-b border-border">Quincallerie</span>
              <span className="py-2 border-b border-border">
                +228 99 88 77 66
              </span>
              <span className="py-2">Face entrée nord</span>
            </div>
          </div>

          {/* Notification */}
          <div className="mx-8 my-2 p-4 bg-badge rounded-xl font-sm text-badge-text text-sm">
            Fiche proche existante: &lt;&lt;Lawson et
            Fils&gt;&gt;(CTB-2026-000402), même téléphone. Vérifier qu'il ne
            s'agit pas d'un doublon
          </div>

          {/* Zone de texte */}
          <div className="flex flex-col mx-8">
            <label htmlFor="motif" className="mt-1 mb-2 text-sm">
              Motif(obligatoire en cas de rejet)
            </label>
            <textarea
              name="motif"
              id="motif"
              placeholder="Ex: doublon de CTB-2026-000402"
              className="w-full p-3 border border-border rounded-lg"
            ></textarea>

            {/* Boutton */}
            <div className="my-5 flex gap-3">
              <button className="px-4 py-3 rounded-lg bg-brand font-bold text-surface cursor-pointer">
                valider la fiche
              </button>
              <button className="px-4 py-3 rounded-lg border border-border font-semibold text-rejected cursor-pointer">
                rejeter
              </button>
            </div>

            {/* Message pour le dev */}
            <p>
              À la validation, les taxtes liées à
              l'activité&lt;&lt;Quincallerie&gt;&gt; sont affectées
              automatiquement(API: étape 6)
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
