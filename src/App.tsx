import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Wrapper } from "./components/common/wrapper/Wrapper";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";

import Registration from "./pages/registration/Registration";
import RegistrationFamily from "./pages/registration/RegistrationFamily";
import RegistrationStudent from "./pages/registration/RegistrationStudent";

import Connexion from "./pages/connexion/Connexion";

import SearchFamily from "./pages/search/SearchFamily";
import FamilyDetails from "./pages/family/FamilyDetails";

import UserInfos from "./pages/user-infos/UserInfos";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Wrapper className="flex flex-col py-6 min-h-[calc(100vh-152px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/family" element={<RegistrationFamily />} />
          <Route path="/student" element={<RegistrationStudent />} />
          <Route path="/search-familly" element={<SearchFamily />} />
          <Route path="/user-infos" element={<UserInfos />} />
          <Route path="/family-details/:id" element={<FamilyDetails />} />
          {/* <Route path="/not-sale" element={<NotSale />} /> */}
        </Routes>
      </Wrapper>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
