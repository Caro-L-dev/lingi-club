import { Title } from "@/components/common/title/Title";
import { TypographyP } from "@/components/common/typographyP/TypographyP";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const {isUserConnected} = useAuth()
  console.log(isUserConnected);
  return (
    <>
      <Title>Lingi Club</Title>
      <TypographyP>Under construction ... 🚧</TypographyP>
    </>
  );
}
