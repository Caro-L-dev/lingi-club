import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Wrapper } from "./components/common/wrapper/Wrapper";
import Navbar from "./components/navbar/Navbar";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import RegistrationFamily from "./pages/registration/RegistrationFamily";
import RegistrationStudent from "./pages/registration/RegistrationStudent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Wrapper className="flex flex-col items-center justify-center h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/family" element={<RegistrationFamily />} />
            <Route path="/student" element={<RegistrationStudent />} />
            <Route path="/connexion" element={<Login />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
