import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Wrapper } from "./components/common/wrapper/Wrapper";
import Navbar from "./components/navbar/Navbar";

import FamilyAvailabilityForm from "./components/common/calendar/FamilyAvailabilityForm";
import StudentAvailabilityForm from "./components/common/calendar/StudentAvailabilityForm";
import Connexion from "./pages/connexion/Connexion";
import Home from "./pages/home/Home";
import Registration from "./pages/registration/Registration";
import RegistrationFamily from "./pages/registration/RegistrationFamily";
import RegistrationStudent from "./pages/registration/RegistrationStudent";

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
            <Route path="/student" element={<RegistrationStudent />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route
              path="/family-availability"
              element={<FamilyAvailabilityForm />}
            />
            <Route
              path="/student-availability"
              element={<StudentAvailabilityForm />}
            />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
