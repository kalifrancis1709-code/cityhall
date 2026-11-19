export default function NouveauContribuable1() {
  return (
    <div className="flex flex-col bg-surface  min-h-screen text-secondary items-center md:bg-page md:justify-center md:py-8">
      <div className="w-full bg-surface md:rounded-lg md:overflow-hidden md:w-[40rem]">
        {/* En-tête */}
        <header className="py-4 bg-brand">
          <h1 className="mx-6 text-surface font-bold text-[18px]">
            Nouveau contribuable
          </h1>
          <p className="mx-6 text-page text-[14px]">
            Sera validé par votre superviseur
          </p>
        </header>

        {/* Bouton de selection de l'entité */}
        <div className="grid grid-cols-2 mx-6 mt-5 rounded-md border border-border overflow-hidden">
          <button className="p-2 bg-brand text-surface">
            Personne physique
          </button>
          <button className="p-2">Entreprise</button>
        </div>

        {/* formulaire */}
        <form action="" className="flex flex-col mx-6">
          <label htmlFor="Name" className="mt-3 mb-1">
            Nom et prénoms *
          </label>
          <input
            type="text"
            id="Name"
            name="nom"
            placeholder="Mensah Afi"
            className="p-2 rounded-md border border-border placeholder:text-ink"
          />
          <label htmlFor="activity" className="mt-3 mb-1">
            Activité *
          </label>
          <select className="p-2 rounded-md border border-border text-ink">
            <option value="">Commerce de tissus</option>
            <option value="ct">Centre de formation</option>
            <option value="pt">Promoteur immobilier</option>
          </select>
          <label htmlFor="tel" className="mt-3 mb-1">
            Téléphone *
          </label>
          <input
            type="tel"
            id="tel"
            name="telephone"
            placeholder="+228 90 12 34 21"
            className="p-2 rounded-md border border-border placeholder:text-ink"
          />
          <label htmlFor="zone" className="mt-3 mb-1">
            Zone *
          </label>
          <select className="p-2 rounded-md border border-border text-ink">
            <option value="">Grand marché</option>
            <option value="asy">Assiyéyé</option>
            <option value="kg">Kégué</option>
          </select>
          <label htmlFor="location" className="mt-3 mb-1">
            Repère / n° d'étal
          </label>
          <input
            type="text"
            id="location"
            name="repere"
            placeholder="Allée B, étal 112"
            className="p-2 rounded-md border border-border placeholder:text-ink"
          />
          <label htmlFor="uid" className="mt-3 mb-1">
            Piece d'identité
          </label>
          <input
            type="text"
            id="uid"
            name="identifiant"
            placeholder="Facultatif"
            className="p-2 rounded-md border border-border"
          />

          {/* Bouton d'enregistrement */}
          <button className="text-surface font-bold bg-rejected my-3 p-2 cursor-pointer rounded-md">
            Enregistrer la fiche
          </button>
        </form>
      </div>
    </div>
  );
}
