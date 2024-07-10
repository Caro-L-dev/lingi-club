import HostFamilyCard from "@/components/hostFamilyCard/HostFamilyCard";
import { hostFamilies } from "@/lib/data/data";
import { RegionType } from "@/types/User";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const SearchFamily = () => {
    const location = useLocation();
    const { state } = location;
    const [region, setRegion] = useState<RegionType>(null);

    useEffect(() => {
        setRegion(state.key.region);
    }, [state]);

    return (
        <div>
            <h2 className="py-4 text-center">
                Vous regardez les familles disponibles en région:{" "}
                <span className="text-secondary">{state.key.region}</span>
            </h2>
            <div className="flex flex-wrap gap-4 justify-center items-center">
                {region &&
                    hostFamilies
                        .filter((famillies) => famillies.region === region)
                        .map((hostFamily) => (
                            <HostFamilyCard
                                key={hostFamily.id}
                                hostFamily={hostFamily}
                            />
                        ))}
            </div>
        </div>
    );
};

export default SearchFamily;
