import { AuthContext } from "@/contexts/AuthUserContext";
import {
  addOrUpdateDataToFirebase,
  getDataFromFirebase,
} from "@/firebase/firestore";
import { formSchema } from "@/types/Forms";
import { UserType } from "@/types/User";
import { useContext, useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toast } from "react-toastify";
import { z } from "zod";
import FamillyInfosForm from "./FamillyInfosForm";

type FormSchemaType = z.infer<typeof formSchema>;

const UserIsConnected: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userData === null && authContext?.authUserInfo?.uid) {
      const handleGetUserData = async () => {
        const result = await getDataFromFirebase(
          "users",
          authContext.authUserInfo.uid
        );
        if (result.error) {
          console.error(result.error);
          return;
        }
        setUserData(result.data as UserType);
      };
      handleGetUserData();
    }
  }, [authContext, userData]);

  const onSubmit = async (values: FormSchemaType) => {
    setLoading(true);

    if (authContext?.authUserInfo?.uid) {
      const { error } = await addOrUpdateDataToFirebase(
        "users",
        authContext.authUserInfo.uid,
        {
          ...values,
          description: values.description || "",
          familyAvailabilities: values.familyAvailabilities || [],
          photoUrl: values.photoUrl || "",
          studentAge: values.studentAge || "",
        }
      );
      if (error) {
        setLoading(false);
        toast.error("Un problème est survenu !");
        return;
      }
      toast.success("Mise à jour réussie");
      setLoading(false);
    }
  };

  if (!authContext?.authUserInfo?.uid) {
    return null; // ou afficher un message d'erreur approprié
  }

  return (
    userData && (
      <FamillyInfosForm
        onSubmit={onSubmit}
        userData={userData}
        loading={loading}
      />
    )
  );
};

export default UserIsConnected;
