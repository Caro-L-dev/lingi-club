import { useEffect, useState } from "react";

import { getAllFamiliesFromFirebase } from "@/firebase/firestore";
import { UserType } from "@/types/User";
import { toast } from "react-toastify";
import HostFamilyCard from "@/components/hostFamilyCard/HostFamilyCard";
import useAuthNavigation from "@/hooks/useAuthNavigation";

export default function OtherFamilies() {
  const { state } = useAuthNavigation();
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
      <div className="text-center my-12">
        {state.region === state.region ? (
          <>
            <p className="text-2xl">
              Découvrez d'autres séjours en famille d'accueil
            </p>
            <p className="my-4">
              Ces familles sont aussi disponibles dans la région de{" "}
              <span className="text-secondary font-bold">{state.region}</span>.
            </p>
            <div className="flex flex-col gap-2 justify-center items-center md:flex-row ">
              <div className="w-full md:w-72 h-52 bg-neutral-100" />
              <div className="w-full md:w-72 h-52 bg-neutral-100" />
              <div className="w-full md:w-72 h-52 bg-neutral-100" />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
