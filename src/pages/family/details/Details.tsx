import useAuthNavigation from "@/hooks/useAuthNavigation";
import { Flag, MapPin, MessageSquareText } from "lucide-react";
import ItemInfo from "@/components/hostFamilyCard/ItemInfo";
import Score from "../score/Score";

export default function Details() {
  const { state } = useAuthNavigation();

  const defaultImage = "/images/family.jpg";

  return (
    <div className="w-full md:mr-40">
      <div>
        <h1 className="font-bold text-secondary text-3xl my-6">
          {`Voyage linguistique en ${state.region} avec ${state.displayName}`}
        </h1>
        <div className="flex justify-between mb-3">
          <div className="flex gap-x-2 font-bold">
            <ItemInfo
              nativeLanguage={state.familyLanguage || "Langue"}
              icon={<Flag />}
            />
            <ItemInfo region={state.region || "Région"} icon={<MapPin />} />
          </div>
          <div className="flex gap-x-2">
            <span className="flex">
              1 <MessageSquareText />
            </span>
            <Score />
          </div>
        </div>
        <div className="relative">
          {state.photoUrl !== "null" ? (
            <img
              className="w-full h-380 object-cover object-center rounded-lg"
              src={`${state.photoUrl}`}
              alt={`${state.displayName} family photo`}
            />
          ) : (
            <img
              className="w-full h-380 object-cover object-center rounded-lg"
              src={defaultImage}
              alt="family photo"
            />
          )}
        </div>
        <div className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
      </div>
      <div>
        <h2 className="font-bold text-xl">
          Rencontrez votre famille d'accueil :{" "}
          {`${state.displayName}` || "nom de la famille"} en {state.region}
        </h2>
        <p className="tracking-tight my-2 mb-12">
          {state.description || "Aucune description pour le moment."}
        </p>

        {state.familyAvailabilities &&
          state.familyAvailabilities.length > 0 && (
            <div className="border-t border-t-muted pt-4">
              Accepte :{state.familyAvailabilities.join(", ")}
            </div>
          )}
      </div>
    </div>
  );
}
