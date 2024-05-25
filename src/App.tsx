import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Wrapper } from "./components/common/wrapper/Wrapper";
import Navbar from "./components/navbar/Navbar";

<<<<<<< HEAD
import Family from "./pages/family/Family";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Register";
import Student from "./pages/student/Student";
=======
import Register from "./pages/Register";
import Apprenant from "./pages/apprenant/Apprenant";
import Accueil from "./pages/famille-accueil/Accueil";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
>>>>>>> develop

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Wrapper className="flex flex-col items-center justify-center h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
<<<<<<< HEAD
            <Route path="/registration" element={<Registration />} />
            <Route path="/student" element={<Student />} />
            <Route path="/family" element={<Family />} />
            <Route path="/login" element={<Login />} />
=======
            <Route path="/registration" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/apprenant" element={<Apprenant />} />
>>>>>>> develop
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
