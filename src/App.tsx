import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Wrapper } from "./components/common/wrapper/Wrapper";
import Navbar from "./components/navbar/Navbar";
import Register from "./pages/Register";
import Apprenant from "./pages/apprenant/Apprenant";
import Accueil from "./pages/famille-accueil/Accueil";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Connexion from "./pages/connexion/Connexion";

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Wrapper className="flex flex-col items-center justify-center h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/apprenant" element={<Apprenant />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>

  );
}

export default App;
