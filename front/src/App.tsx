import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Wrapper } from "./components/common/wrapper/Wrapper";
import Navbar from "./components/navbar/Navbar";
import { Home } from "lucide-react";
import Registration from "./pages/registration/Registration";
import Connexion from "./pages/connexion/Connexion";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Wrapper className="flex flex-col items-center justify-center h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/connexion" element={<Connexion />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
