import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Registration from "./pages/registration/Registration";
import RegistrationFamily from "./pages/registration/RegistrationFamily";
import RegistrationStudent from "./pages/registration/RegistrationStudent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/family" element={<RegistrationFamily />} />
          <Route path="/student" element={<RegistrationStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
