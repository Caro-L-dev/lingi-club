import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../Register";
import Family from "../page/family/Family";
import Student from "../page/student/Student";
import { Wrapper } from "./common/wrapper/Wrapper";

function App() {
  return (
    <>
      <BrowserRouter>
        <Wrapper className="flex flex-col items-center justify-center h-screen">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/student " element={<Student />} />
            <Route path="/family" element={<Family />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
