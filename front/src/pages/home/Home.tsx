import { Wrapper } from "@/components/common/wrapper/Wrapper";
import { Title } from "@/components/common/title/Title";
import { TypographyP } from "@/components/common/typographyP/TypographyP";

export default function Home() {
  return (
    <div>
      <Wrapper className="flex flex-col items-center justify-center h-screen">
        <Title>Lingi Club</Title>
        <TypographyP>Under construction ... 🚧</TypographyP>
      </Wrapper>
    </div>
  );
}
