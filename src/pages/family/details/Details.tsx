import { Flag, MapPin, MessageSquareText } from "lucide-react";
import ItemInfo from "@/components/hostFamilyCard/ItemInfo";
import { AcceptedPersonType, RegionType } from "@/types/User";
import getRandomIndex from "@/utils/random";
import { toast } from "react-toastify";

type DetailsType = {
    region: RegionType;
    displayName: string;
    familyLanguage: string;
    photoUrl: string;
    description: string | null;
    familyAcceptedPersons: AcceptedPersonType[];
};

export default function Details({
    region,
    displayName,
    familyLanguage,
    photoUrl,
    description,
    familyAcceptedPersons,
}: DetailsType) {

    const defaultImage = "/images/family.jpg";

    console.log(familyAcceptedPersons);

    return (
        <div className="w-full md:mr-40">
            <div>
                <h1 className="font-bold text-secondary text-3xl my-6">
                    {`Voyage linguistique en ${region} avec ${displayName}`}
                </h1>
                <div className="flex justify-between mb-3">
                    <div className="flex gap-x-2 font-bold">
                        <ItemInfo
                            nativeLanguage={familyLanguage || "Langue"}
                            icon={<Flag />}
                        />
                        <ItemInfo
                            region={region || "Région"}
                            icon={<MapPin />}
                        />
                    </div>
                    <div
                        className="flex gap-x-2 hover:cursor-pointer"
                        onClick={() => toast.info("Messagerie non disponible")}
                    >
                        {getRandomIndex(1, 5)}
                        <MessageSquareText />
                    </div>
                </div>
                <div className="relative">
                    {photoUrl !== "" ? (
                        <img
                            className="w-full h-380 object-cover object-center rounded-lg"
                            src={`${photoUrl}`}
                            alt={`${displayName} family photo`}
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
                    {`${displayName}` || "nom de la famille"} en {region}
                </h2>
                <p className="tracking-tight my-2 mb-12">
                    {description || "Aucune description pour le moment."}
                </p>

                {familyAcceptedPersons && familyAcceptedPersons.length > 0 && (
                    <div className="border-t border-t-muted pt-4 pb-8">
                        Accepte: {familyAcceptedPersons.join(", ")}
                    </div>
                )}
            </div>
        </div>
    );
}
