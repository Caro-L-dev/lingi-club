import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Euro, Flag, MapPin } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ItemInfo from "@/components/hostFamilyCard/ItemInfo";
import { useAuthContext } from "@/hooks/useAuthContext";
import { toast } from "react-toastify";
import { UserType } from "@/types/User";

const FamilyInfos = () => {
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

  const handleReserve = () => {
    const priceInCent: number = Number(state.familyDailyRate);
    navigate(`/payment/${state.uid}`, { state: priceInCent });
  };

  return (
    <Card className="relative flex flex-col overflow-hidden max-w-[800px] min-w-[320px] m-auto">
      <CardHeader className="relative">
        {state.photoUrl !== "null" ? (
          <img
            className="w-full object-cover object-center"
            src={`${state.photoUrl}`}
            alt={`${state.displayName} family photo`}
          />
        ) : (
          <img
            className="w-full object-cover object-center"
            src={defaultImage}
            alt="family photo générique"
          />
        )}
      </CardHeader>

      <CardTitle className="text-secondary text-balance text-center pt-2 pb-4">
        Bienvenue chez la famille{" "}
        <span className="text-gray-600">{state.displayName}</span>
      </CardTitle>

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
          <Button className="w-full lg:w-fit" onClick={handleReserve}>
            Réserver
          </Button>
        </div>

        <CardTitle className="border-t border-t-secondary text-secondary text-balance mt-4 py-4">
          Informations
        </CardTitle>
        <CardDescription className="my-2 mb-4">
          {state.description}
        </CardDescription>

        {state.familyAcceptedPersons &&
          state.familyAcceptedPersons.length > 0 && (
            <CardDescription className="border-t border-t-muted pt-4">
              Accepte : {state.familyAcceptedPersons.join(", ")}
            </CardDescription>
          )}

        {state.familyAvailabilities &&
          state.familyAvailabilities.length > 0 && (
            <CardDescription className="border-t border-t-muted pt-4">
              Accepte :{state.familyAvailabilities.join(", ")}
            </CardDescription>
          )}
      </CardContent>
    </Card>
  );
};

export default FamilyInfos;
