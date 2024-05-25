import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Wrapper } from "./@/components/common/wrapper/Wrapper";
import Register from "./Register";
import Family from "./page/family/Family";
import Student from "./page/student/Student";

function App() {
  return (
    <>
      <BrowserRouter>
        <Wrapper className="flex flex-col items-center justify-center h-screen">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/student" element={<Student />} />
            <Route path="/family" element={<Family />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
