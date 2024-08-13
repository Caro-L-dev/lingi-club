import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Wrapper } from "./components/common/wrapper/Wrapper";

import Navbar from "./components/navbar/Navbar";

import Home from "./pages/home/Home";

import Registration from "./pages/registration/Registration";
import RegistrationDetails from "./pages/registration/RegistrationDetails";
import Connexion from "./pages/connexion/Connexion";
import SearchFamily from "./pages/search/SearchFamily";
import Footer from "./components/footer/Footer";
import UserInfos from "./pages/user-infos/UserInfos";
import FamilyInfos from "./pages/family/FamilyInfos";
import Paiement from "./pages/paiement/Paiement";
import PaiementValide from "./pages/paiement/PaiementValide";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Wrapper className="flex flex-col py-6 min-h-[calc(100vh-152px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/registration-details"
            element={<RegistrationDetails />}
          />
          <Route path="/search-familly" element={<SearchFamily />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/user-infos" element={<UserInfos />} />
          <Route path="/family-infos/:id" element={<FamilyInfos />} />
          <Route path="/payment/:id" element={<Paiement />} />
          <Route path="/payment-valide" element={<PaiementValide />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Wrapper>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
