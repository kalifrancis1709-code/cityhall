import "./App.css";
import { Route, Routes } from "react-router";
import Dashboard from "./layouts/Dashboard";
import Board from "./pages/Board";
import Home from "./pages/Home";

import Taxes from "./pages/Taxes";
import TaxpayerDetail from "./pages/Taxpayerdetail";
import Taxpayers from "./pages/Taxpayers";
import UnpaidTaxes from "./pages/UnpaidTaxes";
import Validations from "./pages/Validations";
import Encaisser from "./pages/Encaisser";
import Quittance from "./pages/Quittance";

function App() {
  return (
    <Routes>
      <Route element={<Dashboard />}>
      {/* Application : le Dashboard s'affiche en premier, dès "/" */}
        <Route path="/" element={<Home />} />
        <Route path="/taxpayers" element={<Taxpayers />} />
        <Route path="/encaisser" element={<Encaisser />} />
        
        <Route path="/taxpayers/:code" element={<TaxpayerDetail />} />
        <Route path="/unpaid-taxes" element={<UnpaidTaxes />} />
        <Route path="/validation" element={<Validations />} />
        <Route path="/board" element={<Board />} />
        {/* le "?" rend :slug optionnel : /taxes (liste) et /taxes/droit-de-place (détail) */}
        <Route path="/taxes/:slug?" element={<Taxes />} />
      </Route>

      <Route path="/quittance" element={<Quittance />} />
    
    </Routes>
  );
}

export default App;
