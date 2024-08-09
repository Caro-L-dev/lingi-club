import { useEffect, useState } from "react";
import HostFamilyCard from "@/components/hostFamilyCard/HostFamilyCard";
import { getAllFamiliesFromFirebase } from "@/firebase/firestore";
import { toast } from "react-toastify";
import { useLocation } from "react-router";

import { UserType } from "@/types/User";
import { RegionType } from "@/types/User";
import SearchBarre from "@/components/search-barre/SearchBarre";

const SearchFamily = () => {
    const location = useLocation();
    const { state } = location;
    const [region, setRegion] = useState<RegionType>(null);

    useEffect(() => {
        setRegion(state.key.region);
    }, [state]);

    const [allFamilies, setAllFamilies] = useState<UserType[]>([]);

    useEffect(() => {
        const fetchAllFamilies = async () => {
            const result = await getAllFamiliesFromFirebase("users");

            if (result.error) {
                toast.error("Erreur lors de la récupération des familles");
            } else {
                const data = result.data as UserType[];
                setAllFamilies(data ?? []);
            }
        };
        fetchAllFamilies();
    }, []);

    return (
        <div>
            <SearchBarre />
            <h2 className="py-4 text-center">
                Vous regardez les familles disponibles en région:{" "}
                <span className="text-secondary">{state.key.region}</span>
            </h2>
            {allFamilies.filter((famillies) => famillies.region === region)
                .length === 0 ? (
                <div className="flex flex-col mt-10 gap-4 justify-center items-center">
                    <p>Aucune famille n'a été trouvée !</p>
                    <p>Essayez dans une autre région.</p>
                </div>
            ) : (
                <div className="flex flex-wrap gap-4 justify-center items-center">
                    {region &&
                        allFamilies
                            .filter((famillies) => famillies.region === region)
                            .map((hostFamily) => (
                                <HostFamilyCard
                                    key={hostFamily.uid}
                                    hostFamily={hostFamily}
                                />
                            ))}
                </div>
            )}
        </div>
    );
};

export default SearchFamily;
