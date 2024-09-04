import HostFamilyCard from "./HostFamilyCard";
import { getAllFamiliesFromFirebase } from "@/firebase/firestore";
import { UserType } from "@/types/User";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

export default function HostFamilyCardList() {
    /**
     * QUERY
     */

    const fetchAllFamilies = async () => {
        const result = await getAllFamiliesFromFirebase("users");
        return result.data as UserType[];
    };

    const { data, isPending, error } = useQuery({
        queryKey: ["allFamilies"],
        queryFn: () => fetchAllFamilies(),
    });

    if (isPending) {
        return (
            <div className="flex flex-wrap justify-center gap-6 pt-6">
                <Skeleton className="w-[310px] sm:w-[500px] h-[735px]" />
                <Skeleton className="w-[310px] sm:w-[500px] h-[735px]" />
                <Skeleton className="w-[310px] sm:w-[500px] h-[735px]" />
            </div>
        );
    }
    if (error) {
        toast.error("Erreur lors de la récupération des familles");
    }


    return (
        <div className="flex flex-wrap justify-center items-center gap-6 pt-6">
            {data?.map((hostFamily) => (
                <HostFamilyCard key={hostFamily.uid} hostFamily={hostFamily} />
            ))}
        </div>
    );
}
