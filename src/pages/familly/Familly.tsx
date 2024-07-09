import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Euro, Flag, MapPin } from "lucide-react";

import { getDataFromFirebase } from "@/firebase/firestore";

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import ItemInfo from "@/components/hostFamilyCard/ItemInfo";

import { useAuthContext } from "@/hooks/useAuthContext";

import { UserType } from "@/types/User";

const Familly: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<UserType | null>(null);
    const [error, setError] = useState<string>("");

    const {authUserInfo, authUserIsLoading } = useAuthContext();

    const defaultImage = "/public/images/family.jpg";

    useEffect(() => {
        if (!authUserIsLoading) {
            if (authUserInfo) {
                getDataFromFirebase("users", id || "").then((response) => {
                    console.log(response);
                    setData(response.data as UserType);
                    // setData(response as FamilyData);
                });
            } else {
                setError("Vous devez être authentifié pour voir cette page");
            }
        }
    }, [authUserIsLoading, authUserInfo, id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <p>Chargement...</p>;
    }

    const { email, displayName, photoUrl, familyLangage, region, city, familyDailyRate, description } = data;

    console.log(email)

    return (
        <Card
            className="relative flex flex-col lg:flex-row overflow-hidden cursor-pointer"
        >
            <CardHeader className="relative w-full lg:w-1/2">
                <img
                    className="lg:absolute lg:inset-0 w-full h-full lg:object-cover :object-center"
                    src={photoUrl || defaultImage}
                    alt={`${displayName} family photo`}
                />
            </CardHeader>

            <CardContent className="relative flex-grow lg:w-1/2 p-4 lg:pl-8">
                <CardContent>
                    <div className="flex flex-col lg:flex-row lg:justify-between items-center">
                        <div className="flex gap-2 mb-4 lg:mb-0 flex-col">
                            <ItemInfo nativeLanguage={familyLangage || undefined} icon={<Flag />} />
                            <ItemInfo region={region || undefined} icon={<MapPin />} />
                            <ItemInfo region={`${region || undefined}${city ? ', ' + city : ''}`} icon={<MapPin />} />
                            <ItemInfo price={familyDailyRate || undefined} icon={<Euro />}>
                                / jour
                            </ItemInfo>
                        </div>
                        <Button className="w-full lg:w-fit">Réserver</Button>
                    </div>
                </CardContent>
                <CardContent className="border-t border-t-secondary pt-4">
                    <CardTitle className="text-secondary text-balance py-2">
                        Bienvenue chez la famille {displayName}
                    </CardTitle>

                    <CardDescription className="line-clamp-3 tracking-tight my-2 mb-4">
                        {description}
                    </CardDescription>

                    {/* {accept.length > 0 && ( */}
                        <CardDescription className="border-t border-t-muted pt-4">
                            Accepte : 
                            {/* {accept.join(", ")} */}
                        </CardDescription> 
                    {/* )} */}
                </CardContent>
            </CardContent>
        </Card>
    );
};

export default Familly;