import { Route, Routes } from "react-router";
import "./index.css";
import Dashboard from "./layouts/Dashboard";
import Validation from "./pages/Validation";
import JournalAudit from "./pages/JournalAudit";
import Verification from "./pages/Verification";
import TableauDeBord from "./pages/TableauDeBord";
import NouveauContribuable1 from "./pages/NouveauContribuable1";

import Encaisser from "./pages/Encaisser";
import Taxes from "./pages/Taxes";
import ContribuableFiches from "./pages/ContribuableFiches";
import Contribuables from "./pages/Contribuables";
export default function App() {
  return (
    <Routes>
      <Route path="verification" element={<Verification />} />
      <Route
        path="/nouveau-contribuable-1"
        element={<NouveauContribuable1 />}
      />
      <Route path="/" element={<Dashboard />}>
        <Route path="/tableau-de-bord" element={<TableauDeBord />} />
        <Route path="/contribuables" element={<Contribuables />} />
        <Route path="/encaisser" element={<Encaisser />} />
        <Route path="validation" element={<Validation />} />
        <Route path="journal-d'audit" element={<JournalAudit />} />
        <Route path="/contribuables/:slug" element={<ContribuableFiches />} />
        {/* le "?" rend :slug optionnel : /taxes (liste) et /taxes/droit-de-place (détail) */}
        <Route path="/taxes/:slug?" element={<Taxes />} />
      </Route>

      {/* Connexion et inscription, avec leur navbar */}
      
    </Routes>
  );
}
