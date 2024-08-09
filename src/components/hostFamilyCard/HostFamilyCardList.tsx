import { useEffect, useState } from "react";
import HostFamilyCard from "./HostFamilyCard";
import { getAllFamiliesFromFirebase } from "@/firebase/firestore";
import { UserType } from "@/types/User";
import { toast } from "react-toastify";

export default function HostFamilyCardList() {
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
    <div className="flex flex-wrap justify-center items-center gap-6 pt-6">
      {allFamilies.map((hostFamily) => (
        <HostFamilyCard key={hostFamily.uid} hostFamily={hostFamily} />
      ))}
    </div>
  );
}
