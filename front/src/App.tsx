import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Connexion from "./pages/connexion/Connexion";
import { Wrapper } from "./components/common/wrapper/Wrapper";

function App() {
  return (
      <BrowserRouter>
      <Wrapper>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/connexion" element={<Connexion />} />
              <Route path="/*" element={<Home />} />
          </Routes>
      </Wrapper>
      </BrowserRouter>
  );
}

export default App;
