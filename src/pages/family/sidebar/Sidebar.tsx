import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Availability } from "@/types/User";

type SideBarType = {
    uid: string;
    familyDailyRate: number | null;
    displayName: string;
    familyAvailabilities: Availability[];
};

const Sidebar = ({
    uid,
    familyDailyRate,
    displayName,
    familyAvailabilities,
}: SideBarType) => {
    const navigate = useNavigate();

    const handleContact = () => {
        toast.info("La messagerie n'est pas disponible");
    };

    const handleReserve = () => {
        const priceInCent: number = Number(familyDailyRate);
        navigate(`/payment/${uid}`, { state: priceInCent });
    };
    return (
        <div className="w-full bg-neutral-100 text-center p-2 md:p-7 text-xl">
            <div className="flex flex-col gap-4">
                <p className="text-2xl">À partir de:</p>
                <p className="text-4xl sm:text-6xl">
                    <span className="font-bold text-secondary">
                        {familyDailyRate || "XXX"}€{" "}
                    </span>
                    / sem
                </p>

                <p className="py-4">
                    Votre séjour chez les {displayName || "famille"}.
                </p>
                <div className="flex flex-col gap-4 justify-center items-center">
                    <span>Dates</span>
                    <div className="flex flex-col space-y-3">
                        {familyAvailabilities.length > 0 ? (
                            familyAvailabilities.map((date, index) => (
                                <div key={index} className="h-4 w-[250px]">
                                    {date.start.toString()} au{" "}
                                    {date.end.toString()}
                                </div>
                            ))
                        ) : (
                            <>
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[250px]" />
                            </>
                        )}
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
                    {`Contacter ${displayName}` ||
                        `Ce contact n'est pas disponible`}
                </Button>
            </div>
        </div>
    );
};
export default Sidebar;
