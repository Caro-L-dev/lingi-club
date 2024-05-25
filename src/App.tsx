import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Registration from "./pages/registration/Registration";
import Family from "./pages/registration/RegistrationFamily";
import Student from "./pages/registration/RegistrationStudent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/family" element={<Family />} />
          <Route path="/student" element={<Student />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
