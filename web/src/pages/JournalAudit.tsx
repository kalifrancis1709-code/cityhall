export default function JournalAudit() {
  return (
    <div className="bg-page h-screen w-full text-secondary lg:flex lg:flex-1">
      {/* colonne droite */}
      <div className="flex flex-col mt-2 mx-4 md:w-[70%] lg:border-r lg:border-border">
        {/* Première ligne */}
        <div className="flex justify-between">
          <p className="font-bold text-[24px] mb-2 text-ink">Journal d'audit</p>
          <span className="mt-2 mr-4 ">Lecture seule</span>
        </div>

        {/* Filtre */}
        <div className="flex gap-2 pr-0">
          <select
            name="users"
            id="users"
            className="px-5 py-2 rounded-lg border border-border"
          >
            <option value="">Tous les utilisateurs</option>
            <option value="u-1">User 1</option>
            <option value="u-2">User 2</option>
          </select>
          <select
            name="actions"
            id="actions"
            className="px-5 py-2 rounded-lg border border-border"
          >
            <option value="">Toutes les actions</option>
            <option value="act-1">Recensement</option>
            <option value="act-2">Collecte</option>
          </select>
        </div>
        <div className="pl-3 pr-10 py-2 w-65 my-2 rounded-lg border border-border">
          01/11 → 04/11/2026
        </div>

        {/* Données */}
        <div className="flex m-4">
          <div className="w-15 flex flex-col flex-1">
            <span className="py-2 px-1.5 font-semibold bg-menu border-b border-border">
              Date
            </span>
            <span>04/11</span>
            <span className="border-b border-border">10:42</span>
            <span>04/11</span>
            <span className="border-b border-border pb-18">09:15</span>
            <span>03/11</span>
            <span className="border-b border-border">16:02</span>
            <span>03/11</span>
            <span>08:01</span>
          </div>
          <div className="w-18 flex flex-col flex-1">
            <span className="py-2 px-1.5 font-semibold bg-menu border-b border-border">
              Utilisateur
            </span>
            <span>k.</span>
            <span className="border-b border-border">Amouzou</span>
            <span>Y.</span>
            <span className="border-b border-border pb-18">Djossou</span>
            <span>E.</span>
            <span className="border-b border-border">Kossi</span>
            <span>A.</span>
            <span>Lawson</span>
          </div>
          <div className="w-50 flex flex-col flex-1">
            <span className="py-2 px-1.5 font-semibold bg-menu border-b border-border">
              Action
            </span>
            <span className="border-b border-border pb-6">
              ENCAISSEMENT_CREE
            </span>
            <span className="border-b border-border pb-24">
              ENCAISSEMENT_ANNULE
            </span>
            <span className="border-b border-border pb-6">TARIF_CREE</span>
            <span>CONNEXION_ECHEC</span>
          </div>
          <div className="w-15 flex flex-col flex-1">
            <span className="py-2 px-1.5 font-semibold bg-menu border-b border-border">
              Objet
            </span>
            <span>Q-2026-</span>
            <span className="border-b border-border">004127</span>
            <span>Q-2026-</span>
            <span className="border-b border-border pb-18">004098</span>{" "}
            <span>Taxe</span>
            <span className="border-b border-border">publicité</span>
            <span>a.lawson</span>
          </div>
          <div className="w-15 flex flex-col flex-1">
            <span className="py-2 px-1.5 font-semibold bg-menu border-b border-border">
              Detail
            </span>
            <span className="border-b border-border pb-6">3 000 FCFA</span>
            <span className="border-b border-border">
              Montant
              <br /> saisi: 30 <br />
              000 au
              <br /> lieu de
              <br /> 3 000
            </span>
            <span className="border-b border-border">
              20 000
              <br /> 25 000
            </span>
            <span>
              5è échec.
              <br /> Comtpe
              <br /> vérrouillé
            </span>
          </div>
        </div>
      </div>

      {/* colonne gauche */}
      <div className="flex flex-col  mx-4 mr-4">
        <h2 className="font-bold text-[24px] m-2 text-ink">
          Annuler Q-2026-004098
        </h2>
        <p className="mt-2">03/11 • K.Amouzou • Agbojan koffi • 30 000 FCFA</p>

        <label htmlFor="motif" className="mt-2 mb-1">
          Motif*
        </label>
        <textarea
          name="motif"
          id="motif"
          className="p-4 rounded-lg border border-border"
        >
          Montant saisi 30 000 au lieu de 3 000
        </textarea>

        <div className="p-4 rounded-lg bg-badge text-rejected my-3">
          L'encaisement reste visible, marqué&lt;&lt;annulé&gt;&gt;. La créance
          redevient due.
        </div>
        <button className="py-2 cursor-pointer bg-rejected rounded-lg text-surface">
          Confirmer l'annulation
        </button>
      </div>
    </div>
  );
}
