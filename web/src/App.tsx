import { Route, Routes } from "react-router";
import "./index.css";
import Dashboard from "./layouts/Dashboard";
import Validation from "./pages/Validation";
import JournalAudit from "./pages/JournalAudit";
import Verification from "./pages/Verification";
import TableauDeBord from "./pages/TableauDeBord";
import NouveauContribuable1 from "./pages/NouveauContribuable1";

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
        <Route path="validation" element={<Validation />} />
        <Route path="journal-d'audit" element={<JournalAudit />} />
      </Route>
    </Routes>
  );
}
