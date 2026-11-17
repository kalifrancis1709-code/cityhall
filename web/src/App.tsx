import "./App.css";
import { Route, Routes } from "react-router";
import Dashboard from "./layouts/Dashboard";
import Acceuil from "./pages/Acceuil";
import Taxes from "./pages/Taxes";
import Encaisser from "./pages/Encaisser";
import Quittance from "./pages/Quittance";
import Contribuables from "./pages/Contribuables";
import ContribuableFiches from "./pages/ContribuableFiches";

function App() {
  return (
  
    <Routes>
      <Route element={<Dashboard />}>
      {/* Application : le Dashboard s'affiche en premier, dès "/" */}
        <Route path="/" element={<Acceuil />} />
        <Route path="/contribuables" element={<Contribuables />} />
        <Route path="/encaisser" element={<Encaisser />} />
        
        <Route path="/contribuablefiches/:code" element={<ContribuableFiches />} />
        
       
        
        {/* le "?" rend :slug optionnel : /taxes (liste) et /taxes/droit-de-place (détail) */}
        <Route path="/taxes/:slug?" element={<Taxes />} />
      </Route>

      <Route path="/quittance" element={<Quittance />} />
    
    </Routes>
  );
}

export default App;
