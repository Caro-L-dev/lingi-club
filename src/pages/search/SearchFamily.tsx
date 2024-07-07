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
        <div className="flex flex-wrap gap-4">
            <p>{state.key.region}</p>
            { region &&
            hostFamilies
            .filter((famillies) => famillies.region === region)
            .map((hostFamily) => (
                <HostFamilyCard
                    key={hostFamily.id}
                    title={hostFamily.title}
                    image={hostFamily.image}
                    description={hostFamily.description}
                    price={hostFamily.price}
                    region={hostFamily.region}
                    nativeLanguage={hostFamily.nativeLanguage}
                    accept={hostFamily.accept}
                />
            ))
            }
        </div>
    );
};

export default SearchFamily;
