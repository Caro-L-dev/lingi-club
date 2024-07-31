import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { Flag, MapPin, MessageSquareText, Star } from "lucide-react";

import ItemInfo from "@/components/hostFamilyCard/ItemInfo";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";

import { useAuthContext } from "@/hooks/useAuthContext";

const FamilyDetails = () => {
  const location = useLocation();
  const { state } = location;
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
    <div className="flex flex-col-reverse md:flex-row justify-between">
      <div className="w-full md:mr-40">
        <div>
          <h1 className="font-bold text-secondary text-3xl my-6">
            {`Voyage linguistique en ${state.region} avec ${state.title}`}
          </h1>
          <div className="flex justify-between mb-3">
            <div className="flex gap-x-2 font-bold">
              <ItemInfo
                nativeLanguage={state.nativeLanguage || "Langue"}
                icon={<Flag />}
              />
              <ItemInfo region={state.region || "Région"} icon={<MapPin />} />
            </div>
            <div className="flex gap-x-2">
              <span className="flex">
                1 <MessageSquareText />
              </span>
              <span className="flex">
                <Star className="text-secondary" strokeWidth={2} />
                <Star className="text-secondary" strokeWidth={2} />
                <Star className="text-secondary" strokeWidth={2} />
                <Star className="text-secondary" strokeWidth={2} />
                <Star className="text-secondary" strokeWidth={2} />
              </span>
            </div>
          </div>
          <div className="relative">
            {state.image ? (
              <img
                className="w-full h-380 object-cover object-center rounded-lg"
                src={`${state.image}`}
                alt={`${state.title} family photo`}
              />
            ) : (
              <img
                className="w-full h-80 object-cover object-center rounded-lg"
                src={`${defaultImage}`}
                alt="family photo"
              />
            )}
          </div>
          <div className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
        </div>
        <div>
          <h2 className="font-bold text-xl">
            Rencontrez votre famille d'accueil :{" "}
            {state.title || "nom de la famille"} en {state.region}
          </h2>
          <p className="tracking-tight my-2 mb-12">
            {state.description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
          </p>

          {state.accept && state.accept.length > 0 && (
            <p className="border-t border-t-muted pt-4">
              Accepte :{state.accept.join(", ")}
            </p>
          )}

          <div className="bg-neutral-100 p-4 rounded">
            <h3 className="font-bold text-xl mb-4">
              Avis des hôtes précédents
            </h3>
            <div className="flex mb-4 items-center">
              <div className="size-10 rounded-3xl bg-primary" />
              <div className="ml-4">
                <p className="font-bold">Une famille recommandée à 100%</p>
                <div className="flex gap-x-2">
                  <span className="flex">
                    <Star className="text-secondary" strokeWidth={2} />
                    <Star className="text-secondary" strokeWidth={2} />
                    <Star className="text-secondary" strokeWidth={2} />
                    <Star className="text-secondary" strokeWidth={2} />
                    <Star className="text-secondary" strokeWidth={2} />
                  </span>
                  <p>Max</p>
                  <p>Le 26 Juillet 2024</p>
                </div>
              </div>
            </div>
            <p>
              Notre fils revient d'un séjour de 15 jours chez XXX et XXX et il
              est ravi ! En plus des nombreuses activités réalisées, il a été
              acueilli chaleureusement et avec beaucoup de gentillesse et de
              bienveillance. Une famille très investie au quotidien qui n'hésite
              pas à envoyer des nouvelles et des photos presque tous les jours.
              De quoi être rassuré pour les parents ! Un grand merci pour tout à
              la famille XXX. !
            </p>
            <div className="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
          </div>
          <div className="text-center my-12">
            <p className="text-2xl">
              Découvrez d'autres séjours en famille d'accueil
            </p>
            <p className="my-4">Ces familles sont aussi disponibles</p>
            <div className="flex flex-col gap-2 justify-center items-center md:flex-row ">
              <div className="w-full md:w-72 h-52 bg-neutral-100" />
              <div className="w-full md:w-72 h-52 bg-neutral-100" />
              <div className="w-full md:w-72 h-52 bg-neutral-100" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/6 bg-neutral-100 text-center p-2 md:p-7 text-xl">
        <div className="hidden md:block">
          <div className="mb-3">
            <p>À partir de</p>
            <p>
              <span className="font-bold">{state.price || "XXX"}€ </span>/ sem
            </p>
          </div>
          <p className="mb-2 text-secondary">
            Votre séjour chez {state.title || "famille"}.
          </p>
          <div className="flex flex-col">
            <span>Dates</span>
            <span>Calendrier</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="uppercase md:mb-3 w-full"
            onClick={() => navigate("/not-sale")}
          >
            Devis / reservation
          </Button>
          <Button
            variant="outline"
            className="uppercase text-secondary w-full"
            onClick={() => navigate("/not-sale")}
          >
            {`Contacter ${state.title}` || `Ce contact n'est pas disponible`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FamilyDetails;
