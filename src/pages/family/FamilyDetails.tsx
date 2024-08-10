import { useLocation, useNavigate } from "react-router";
import Details from "./details/Details";
import Opinion from "./opinion/Opinion";
import OtherFamilies from "./otherFamilies/OtherFamilies";
import Sidebar from "./sidebar/Sidebar";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserType } from "@/types/User";
import { getAllFamiliesFromFirebase } from "@/firebase/firestore";

const FamilyDetails = () => {
    const location = useLocation();
    const { state } = location as { state: UserType };
    const navigate = useNavigate();
    const { authUserInfo } = useAuthContext();
    const [allFamilies, setAllFamilies] = useState<UserType[]>([]);

    useEffect(() => {
        if (!authUserInfo) {
            navigate("/");
            toast.error(
                "Vous devez être connecté pour accéder aux informations"
            );
        }
    }, [authUserInfo, navigate]);

    useEffect(() => {
        const fetchAllFamilies = async () => {
            const result = await getAllFamiliesFromFirebase("users");

            if (result.error) {
                toast.error("Erreur lors de la récupération des familles");
            } else {
                const fullListFamilly = result.data as UserType[];
                setAllFamilies(fullListFamilly);
            }
        };

        fetchAllFamilies();

    }, []);


    return (
        <div className="flex flex-col gap-4 xl:flex-row">
            <div>
                <Details
                    region={state.region}
                    displayName={state.displayName}
                    familyLanguage={state.familyLanguage}
                    photoUrl={state.photoUrl}
                    description={state.description}
                    familyAvailabilities={state.familyAvailabilities}
                />
                <Opinion />
                <OtherFamilies
                    otherFamilly={allFamilies}
                    region={state.region}
                    famillyShowId={state.uid}
                />
            </div>
            <Sidebar
                uid={state.uid}
                familyDailyRate={state.familyDailyRate}
                displayName={state.displayName}
            />
        </div>
    );
};

export default FamilyDetails;
