import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { Euro, Flag, MapPin } from "lucide-react";

import { getDataFromFirebase } from "@/firebase/firestore";

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";

import ItemInfo from "@/components/hostFamilyCard/ItemInfo";

import { useAuthContext } from "@/hooks/useAuthContext";

import { UserType } from "@/types/User";

const Familly = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<UserType | null>(null);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const {authUserInfo, authUserIsLoading } = useAuthContext();

    const defaultImage = "/public/images/family.jpg";

    useEffect(() => {
        if (!authUserIsLoading) {
            if (authUserInfo) {
                getDataFromFirebase("users", id || "").then((response) => {
                    setData(response.data as UserType);
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
        return <div className="mx-auto mt-12">
                <Spinner />          
            </div>
    }

    const { displayName, photoUrl, familyLangages, region, city, familyDalyRate, description } = data;

    return (
        <Card className="relative flex flex-col overflow-hidden max-w-[600px] min-w-[320px]">
            <CardHeader className="relative">
                <img
                    className="w-full object-cover object-center"
                    src={photoUrl || defaultImage}
                    alt={`${displayName} family photo`}
                />
            </CardHeader>

            <CardContent className="relative flex-grow">
                <CardContent>
                    <div className="flex flex-col lg:flex-row sm:justify-between items-center">
                        <div className="flex gap-2 mb-4 lg:mb-0 flex-col">
                            <ItemInfo nativeLanguage={familyLangages || ""} icon={<Flag />} />
                            <ItemInfo region={`${region || ""}${city ? ', ' + city : ''}`} icon={<MapPin />} />
                            <ItemInfo price={familyDalyRate || undefined} icon={<Euro />}>
                                / jour
                            </ItemInfo>
                        </div>
                        <Button 
                            className="w-full lg:w-fit"
                            onClick={() => navigate('/')}
                        >Réserver</Button>
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