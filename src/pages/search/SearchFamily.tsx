import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { TypographyP } from "@/components/common/typographyP/TypographyP";
import HostFamilyCard from "@/components/hostFamilyCard/HostFamilyCard";

import { Button } from "@/components/ui/button";

import { getAllFamiliesFromFirebase } from "@/firebase/firestore";

import { UserType } from "@/types/User";
import { RegionType } from "@/types/User";

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

  const filteredFamilies = region
    ? allFamilies.filter((families) => families.region === region)
    : [];

  return (
    <div className="m-auto">
      <TypographyP className="flex flex-col py-4 text-center">
        Vous regardez les familles disponibles en région{" "}
        <span className="text-secondary font-bold uppercase">
          {state.key.region}
        </span>
      </TypographyP>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {filteredFamilies.length > 0 ? (
          filteredFamilies.map((hostFamily) => (
            <HostFamilyCard key={hostFamily.uid} hostFamily={hostFamily} />
          ))
        ) : (
          <div className="flex flex-col gap-2">
            <p>Désolé, aucune famille n'a été trouvée dans votre région :/</p>
            <Button variant="secondary">
              <Link to="/">Retourner à l'accueil</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFamily;
