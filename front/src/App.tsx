import { Wrapper } from "./components/common/wrapper/Wrapper";
import { Title } from "./components/common/title/Title";
import { TypographyP } from "./components/common/typographyP/TypographyP";

function App() {
  return (
    <Wrapper className="flex flex-col items-center justify-center h-screen">
      <Title>Lingi Club</Title>
      <TypographyP>Under construction ... 🚧</TypographyP>
    </Wrapper>
  );
}

export default App;
