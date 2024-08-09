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

  console.log("language", state.key.language);
  console.log("region", state.key.region);

  const [region, setRegion] = useState<RegionType>(null);
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    setRegion(state.key.region);
    setLanguage(state.key.language);
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
      {region && (
        <h2 className="py-4 text-center">
          Vous regardez les familles disponibles en région:{" "}
          <span className="text-secondary">{state.key.region}</span>
        </h2>
      )}
      {language && (
        <h2 className="py-4 text-center">
          Vous regardez les familles parlent:{" "}
          <span className="text-secondary">{state.key.language}</span>
        </h2>
      )}
      {allFamilies.filter((famillies) => {
        const regionMatch = region ? famillies.region === region : true;
        const languageMatch = language
          ? famillies.familyLanguage === language
          : true;
        return regionMatch && languageMatch;
      }).length === 0 ? (
        <div className="flex flex-col mt-10 gap-4 justify-center items-center">
          <p>Aucune famille n'a été trouvée !</p>
          <p>Essayez dans une autre région ou avec une autre langue.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {allFamilies
            .filter((famillies) => {
              const regionMatch = region ? famillies.region === region : true;
              const languageMatch = language
                ? famillies.familyLanguage === language
                : true;
              return regionMatch && languageMatch;
            })
            .map((hostFamily) => (
              <HostFamilyCard key={hostFamily.uid} hostFamily={hostFamily} />
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchFamily;
