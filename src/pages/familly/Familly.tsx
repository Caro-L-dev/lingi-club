import ItemInfo from "@/components/hostFamilyCard/ItemInfo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Spinner from "@/components/ui/Spinner";
import { useAuthContext } from "@/hooks/useAuthContext";
import { UserType } from "@/types/User";
import { Euro, Flag, MapPin } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Familly = () => {
  const location = useLocation();
  const { state } = location as { state: UserType };
  const navigate = useNavigate();
  const { authUserInfo } = useAuthContext();

  const defaultImage = "/images/family.jpg";

  useEffect(() => {
    if (!authUserInfo) {
      navigate("/");
      toast.error("Vous devez être connecté pour accéder aux informations");
    }
  }, [authUserInfo, navigate]);

  if (!state) {
    return (
      <div className="mx-auto mt-12">
        <Spinner />
      </div>
    );
  }

  return (
    <Card className="relative flex flex-col overflow-hidden max-w-[800px] min-w-[320px] m-auto">
      <CardHeader className="relative">
        <img
          className="w-full object-cover object-center"
          src={state.photoUrl ? state.photoUrl : defaultImage}
          alt={`${state.displayName} family photo`}
        />
      </CardHeader>
      <CardContent className="relative flex-grow">
        <div className="flex flex-col lg:flex-row sm:justify-between items-center">
          <div className="flex gap-2 mb-4 lg:mb-0 flex-col">
            <ItemInfo
              nativeLanguage={state.familyLanguage || ""}
              icon={<Flag />}
            />
            <ItemInfo region={state.region} icon={<MapPin />} />
            <ItemInfo
              price={state.familyDailyRate || undefined}
              icon={<Euro />}
            >
              / jour
            </ItemInfo>
          </div>
          <Button
            className="w-full lg:w-fit"
            onClick={() => navigate("/not-sale")}
          >
            Réserver
          </Button>
        </div>
        <CardContent className="border-t border-t-secondary pt-4">
          <CardTitle className="text-secondary text-balance py-2">
            Bienvenue chez la famille{" "}
            <span className="text-gray-600">{state.displayName}</span>
          </CardTitle>
          <CardDescription className="my-2 mb-4">
            {state.description}
          </CardDescription>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default Familly;
