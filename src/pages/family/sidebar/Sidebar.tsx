import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuthContext } from "@/hooks/useAuthContext";

import { UserType } from "@/types/User";

import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const location = useLocation();
  const { state } = location as { state: UserType };
  const navigate = useNavigate();
  const { authUserInfo } = useAuthContext();

  useEffect(() => {
    if (!authUserInfo) {
      navigate("/");
      toast.error("Vous devez être connecté pour accéder aux informations");
    }
  }, [authUserInfo, navigate]);

  const handleReserve = () => {
    const priceInCent: number = Number(state.familyDailyRate);
    navigate(`/payment/${state.uid}`, { state: priceInCent });
  };
  return (
    <div className="w-full md:w-2/6 bg-neutral-100 text-center p-2 md:p-7 text-xl">
      <div className="hidden md:block">
        <div className="mb-3">
          <p>À partir de</p>
          <p>
            <span className="font-bold">
              {state.familyDailyRate || "XXX"}€{" "}
            </span>
            / sem
          </p>
        </div>
        <p className="mb-2 text-secondary">
          Votre séjour chez {state.displayName || "famille"}.
        </p>
        <div className="flex flex-col">
          <span>Dates</span>
          <span>Calendrier</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          className="uppercase md:mb-3 w-full"
          onClick={handleReserve}
        >
          Devis / reservation
        </Button>
        <Button
          variant="outline"
          className="uppercase text-secondary w-full"
          onClick={() => navigate("/not-sale")}
        >
          {`Contacter ${state.displayName}` ||
            `Ce contact n'est pas disponible`}
        </Button>
      </div>
    </div>
  );
};
export default Sidebar;
