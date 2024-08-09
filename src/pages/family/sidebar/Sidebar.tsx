import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuthContext } from "@/hooks/useAuthContext";

import { UserType } from "@/types/User";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Sidebar = () => {
    const location = useLocation();
    const { state } = location as { state: UserType };
    const navigate = useNavigate();
    const { authUserInfo } = useAuthContext();

    useEffect(() => {
        if (!authUserInfo) {
            navigate("/");
            toast.error(
                "Vous devez être connecté pour accéder aux informations"
            );
        }
    }, [authUserInfo, navigate]);

    const handleContact = () => {
        toast.info("La messagerie n'est pas disponible");
    };

    const handleReserve = () => {
        const priceInCent: number = Number(state.familyDailyRate);
        navigate(`/payment/${state.uid}`, { state: priceInCent });
    };
    return (
        <div className="w-full bg-neutral-100 text-center p-2 md:p-7 text-xl">
            <div className="flex flex-col gap-4">
                <p className="text-2xl">À partir de:</p>
                <p className="text-4xl sm:text-6xl">
                    <span className="font-bold text-secondary">
                        {state.familyDailyRate || "XXX"}€{" "}
                    </span>
                    / sem
                </p>

                <p className="py-4">
                    Votre séjour chez les {state.displayName || "famille"}.
                </p>
                <div className="flex flex-col gap-4 justify-center items-center">
                    <span>Dates</span>
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[250px]" />
                    </div>

                    <span>Calendrier</span>
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                </div>
            </div>

            <div className="flex flex-wrap xl:flex-col justify-center gap-4 mt-10">
                <Button
                    variant="secondary"
                    className="uppercase md:mb-3 w-[200px] xl:w-full"
                    onClick={handleReserve}
                >
                    reservation
                </Button>
                <Button
                    variant="outline"
                    className="uppercase text-secondary w-[200px] xl:w-full"
                    onClick={handleContact}
                >
                    {`Contacter ${state.displayName}` ||
                        `Ce contact n'est pas disponible`}
                </Button>
            </div>
        </div>
    );
};
export default Sidebar;
