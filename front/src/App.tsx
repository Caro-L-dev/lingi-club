import { Wrapper } from "./components/common/wrapper/Wrapper";
import Home from "./pages/home/Home";

function App() {
  return (
    <Wrapper className="flex flex-col items-center justify-center h-screen">
      <Home />
    </Wrapper>
  );
}

export default App;
