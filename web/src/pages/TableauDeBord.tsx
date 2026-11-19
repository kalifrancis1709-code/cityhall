export default function TableauDeBord() {
  return (
    <div className="flex flex-col min-h-screen text-secondary bg-page">
      {/* En-tête */}
      <div className="flex justify-between mx-6 mt-4 ">
        <h1 className="font-bold text-ink text-[24px]">Octobre 2026</h1>
        <div className="flex gap-2">
          <select
            name="date"
            id="date"
            className="px-3 py-2 rounded-lg border border-border text-ink"
          >
            <option value="">Octobre 2026</option>
            <option value="nv">Novembre 2026</option>
            <option value="dc">Décembre 2026</option>
          </select>
          <select
            name="zone"
            id="zone"
            className="px-3 py-2 rounded-lg border border-border text-ink"
          >
            <option value="">Toutes les Zones</option>
            <option value="ad">Adidogomé</option>
            <option value="vk">Vapkosito</option>
          </select>

          {/* Bouton d'exportation */}
          <button className="px-4 py-2 rounded-lg border border-border text-ink font-[500] hover:bg-menu">
            Exporter
          </button>
        </div>
      </div>

      {/* Données */}
      <div className="grid grid-cols-[auto_auto_auto_auto] gap-4 my-4 mx-6">
        <div className="flex flex-col border border-border rounded-lg">
          <span className="mx-4 mt-2 font-[350]">RECETTES</span>
          <span className="mx-4 my-2 text-ink text-[22px] font-bold">
            18 742 500
          </span>
          <span className="mx-4 mb-3 text-[14px]">FCFA encaissé</span>
        </div>
        <div className="flex flex-col border border-border rounded-lg">
          <span className="mx-4 mt-2 font-[350]">RECOUVREMENT</span>
          <span className="mx-4 my-2 text-ink text-[22px] font-bold">
            71,2 %
          </span>
          <span className="mx-4 mb-3 text-[14px]">sur 26 310 000 dus</span>
        </div>
        <div className="flex flex-col border border-border rounded-lg">
          <span className="mx-4 mt-2 font-[350]">CONTRIBUABLES</span>
          <span className="mx-4 my-2 text-ink text-[22px] font-bold">
            1 284
          </span>
          <span className="mx-4 mb-3 text-[14px]">actifs</span>
        </div>
        <div className="flex flex-col border border-border rounded-lg">
          <span className="mx-4 mt-2 font-[350]">IMPAYES</span>
          <span className="mx-4 my-2 text-ink text-[22px] font-bold">
            7 567 500
          </span>
          <span className="mx-4 mb-3 text-[14px]">FCFA restants</span>
        </div>
      </div>

      {/* Statistique */}
      <div className="text-ink  mx-6">
        <p className="font-bold mb-4">Recettes par zone</p>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="my-1">Grand marché</span>
            <span className="my-1">Bè-Kpota</span>
            <span className="my-1">Hèdzranawoé</span>
            <span className="my-1">Adawlato</span>
          </div>
          <div className="flex flex-col w-[75%]">
            <span className="p-2 bg-brand my-2 rounded-sm"></span>
            <span className="p-2 bg-brand my-2 w-[56%] rounded-sm"></span>
            <span className="p-2 bg-brand my-2 w-[50%] rounded-sm"></span>
            <span className="p-2 bg-brand my-2 w-[44%] rounded-sm"></span>
          </div>
          <div className="flex flex-col">
            <span className="my-1">7 920 000</span>
            <span className="my-1">4 310 000</span>
            <span className="my-1">3 655 000</span>
            <span className="my-1">2 857 500</span>
          </div>
        </div>

        <p className="my-5 text-secondary">
          Les chiffres sonts calculés en SQL et doivent être égaux à la somme
          des encaissements non annulés(test automatisé).
        </p>
      </div>
    </div>
  );
}
