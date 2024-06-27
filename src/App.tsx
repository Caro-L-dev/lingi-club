import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Wrapper } from "./components/common/wrapper/Wrapper";

import Navbar from "./components/navbar/Navbar";

import Home from "./pages/home/Home";

import Registration from "./pages/registration/Registration";
import RegistrationFamily from "./pages/registration/RegistrationFamily";
import RegistrationStudent from "./pages/registration/RegistrationStudent";
import Connexion from "./pages/connexion/Connexion";
import Familly from "./pages/familly/Familly";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Wrapper className="flex flex-col py-6 md:w-1/2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/family" element={<RegistrationFamily />} />
            {/* CHANGER L'URL DE LA PAGE ET LE NOM DU COMPOSANT */}
            <Route path="/family-infos" element={<Familly />} />
            <Route path="/student" element={<RegistrationStudent />} />
            <Route path="/connexion" element={<Connexion />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
