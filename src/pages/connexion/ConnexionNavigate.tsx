import { Link } from "react-router-dom";

import { TitleCard } from "@/components/common/titleCard/TitleCard";
import { TypographyP } from "@/components/common/typographyP/TypographyP";
import { Wrapper } from "@/components/common/wrapper/Wrapper";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ConnexionNavigate = () => {
  return (
    <Wrapper className="lg:mt-20">
      <Card>
        <CardHeader>
          <TitleCard>Oups !</TitleCard>
        </CardHeader>
        <CardContent>
          <TypographyP>Il semble que vous soyez déjà connecté.</TypographyP>
          <Link to="/">
            <Button variant={"secondary"} className="w-full mt-6">
              Retourner à l'accueil
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default ConnexionNavigate;
