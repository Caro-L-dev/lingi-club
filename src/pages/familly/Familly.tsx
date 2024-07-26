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
import { Availability } from "@/types/User";
import { Euro, Flag, MapPin } from "lucide-react";
import moment from "moment";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";

const Familly = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const { authUserInfo } = useAuthContext();

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

  const availabilityOptions =
    state.availabilities?.map((availability: Availability) => ({
      value: availability,
      label: `${moment(new Date(availability.start)).format(
        "DD/MM/YYYY"
      )} - ${moment(new Date(availability.end)).format("DD/MM/YYYY")}`,
    })) || [];

  return (
    <Card className="relative flex flex-col overflow-hidden max-w-[600px] min-w-[320px]">
      <CardHeader className="relative">
        {state.image ? (
          <img
            className="w-full object-cover object-center"
            src={state.image}
            alt={`${state.title} family photo`}
          />
        ) : (
          <img
            className="w-full object-cover object-center"
            src="/images/family.jpg"
            alt="family photo"
          />
        )}
      </CardHeader>

      <CardContent className="relative flex-grow">
        <CardContent>
          <div className="flex flex-col lg:flex-row sm:justify-between items-center">
            <div className="flex gap-2 mb-4 lg:mb-0 flex-col">
              <ItemInfo
                nativeLanguage={state.nativeLanguage || ""}
                icon={<Flag />}
              />
              <ItemInfo region={state.region} icon={<MapPin />} />
              <ItemInfo price={state.price || null} icon={<Euro />}>
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
        </CardContent>
        <CardContent className="border-t border-t-secondary pt-4">
          <CardTitle className="text-secondary text-balance py-2">
            Bienvenue chez la famille {state.title}
          </CardTitle>

          <CardDescription className="line-clamp-3 tracking-tight my-2 mb-4">
            {state.description}
          </CardDescription>

          {state.accept && state.accept.length > 0 && (
            <CardDescription className="border-t border-t-muted pt-4">
              Accepte : {state.accept.join(", ")}
            </CardDescription>
          )}

          <CardDescription className="border-t border-t-muted pt-4">
            <h3 className="text-lg font-semibold mb-2">Disponibilités :</h3>
            {availabilityOptions.length > 0 ? (
              <Select
                options={availabilityOptions}
                isMulti
                placeholder="Sélectionnez les dates disponibles"
                className="w-full"
              />
            ) : (
              <p className="text-red-500 font-semibold">
                Non disponible actuellement
              </p>
            )}
          </CardDescription>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default Familly;
