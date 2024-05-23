import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Register from "./page/Register";
import Accueil from "./page/famille-accueil/Accueil";
import Apprenant from "./page/famille-accueil/Apprenant";

export default function App() {
  return (
    <Router>
      <Wrapper className="flex flex-col items-center justify-center h-screen">
        <Routes>
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/apprenant" element={<Apprenant />} />
          <Route path="/" element={<Register />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}
