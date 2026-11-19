import { Route, Routes } from "react-router";
import "./index.css";
import Dashboard from "./layouts/Dashboard";
import Validation from "./pages/Validation";
import JournalAudit from "./pages/JournalAudit";
import Verification from "./pages/Verification";
import TableauDeBord from "./pages/TableauDeBord";
import NouveauContribuable1 from "./pages/NouveauContribuable1";
import AuthLayout from "./layouts/AuthLayout";
import Board from "./pages/Board";
import Login from "./components/Login";
import Signup from "./components/Singup";
import Taxes from "./pages/Taxes";
import TaxpayerDetail from "./pages/Taxpayerdetail";
import Taxpayers from "./pages/Taxpayers";
import UnpaidTaxes from "./pages/UnpaidTaxes";
import Validations from "./pages/Validations";

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
        <Route path="/taxpayers" element={<Taxpayers />} />
        <Route path="/taxpayers/:code" element={<TaxpayerDetail />} />
        <Route path="/unpaid-taxes" element={<UnpaidTaxes />} />
        <Route path="/validation" element={<Validations />} />
        <Route path="/board" element={<Board />} />
        {/* le "?" rend :slug optionnel : /taxes (liste) et /taxes/droit-de-place (détail) */}
        <Route path="/taxes/:slug?" element={<Taxes />} />
      </Route>

      {/* Connexion et inscription, avec leur navbar */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}
