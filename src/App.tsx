import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Wrapper } from "./components/common/wrapper/Wrapper";

import Navbar from "./components/navbar/Navbar";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Wrapper className="flex flex-col py-6 md:w-1/2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
