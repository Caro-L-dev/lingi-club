import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Wrapper } from "./components/common/wrapper/Wrapper";

import Navbar from "./components/navbar/Navbar";

import Home from "./pages/home/Home";

import Footer from "./components/footer/Footer";
import Connexion from "./pages/connexion/Connexion";
import NotSale from "./pages/error/NotSale";
import Familly from "./pages/familly/Familly";
import Registration from "./pages/registration/Registration";
import RegistrationFamily from "./pages/registration/RegistrationFamily";
import RegistrationStudent from "./pages/registration/RegistrationStudent";
import SearchFamily from "./pages/search/SearchFamily";
import UserInfos from "./pages/user-infos/UserInfos";
<<<<<<< HEAD

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Wrapper className="flex flex-col py-6 min-h-[calc(100vh-152px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/family" element={<RegistrationFamily />} />
          <Route path="/search-familly" element={<SearchFamily />} />
          <Route path="/student" element={<RegistrationStudent />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/user-infos" element={<UserInfos />} />
          <Route path="/family-infos/:id" element={<Familly />} />
          <Route path="/not-sale" element={<NotSale />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Wrapper>
      <Footer />
    </BrowserRouter>
  );
=======
import Familly from "./pages/familly/Familly";
import NotSale from "./pages/error/NotSale";
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
                    <Route path="/family" element={<RegistrationFamily />} />
                    <Route path="/search-familly" element={<SearchFamily />} />
                    <Route path="/student" element={<RegistrationStudent />} />
                    <Route path="/connexion" element={<Connexion />} />
                    <Route path="/user-infos" element={<UserInfos />} />
                    <Route path="/family-infos/:id" element={<Familly />} />
                    <Route path="/payment/:id" element={<Paiement />} />
                    <Route path="/payment-valide" element={<PaiementValide />} />
                    <Route path="/not-sale" element={<NotSale />} />
                    <Route path="/*" element={<Home />} />
                </Routes>
            </Wrapper>
            <Footer />
        </BrowserRouter>
    );
>>>>>>> c06d7a8010ad17037e251c0be31d934cbf13fd70
}

export default App;
