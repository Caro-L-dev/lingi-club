import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/home/Home";
import Registration from "./pages/registration/Registration";
import Login from "./pages/login/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
