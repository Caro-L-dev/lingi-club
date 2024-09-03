import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "@/hooks/useAuthContext";
import { UserType } from "@/types/User";

const useAuthNavigation = () => {
  const location = useLocation();
  const { state } = location as { state: UserType };
  const navigate = useNavigate();
  const { authUserInfo } = useAuthContext();

  useEffect(() => {
    if (!authUserInfo) {
      toast.error("Vous devez être connecté pour accéder aux informations");
      navigate("/connexion");
    }
  }, [authUserInfo, navigate]);

  return { state };
};

export default useAuthNavigation;
