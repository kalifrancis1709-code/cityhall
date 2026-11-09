import { Route, Routes } from "react-router";
import "./index.css";
import Dashboard from "./layouts/Dashboard";
import Validations from "./pages/Validations";
import NouveauContribuable from "./pages/NouveauContribuable";

export default function App() {
  return (
    <Routes>
      <Route path="/nouveau-contribuable" element={<NouveauContribuable />} />
      <Route path="/" element={<Dashboard />}>
        <Route path="validations" element={<Validations />} />
      </Route>
    </Routes>
  );
}
