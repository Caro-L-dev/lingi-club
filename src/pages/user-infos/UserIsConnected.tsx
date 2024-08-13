import { AuthContext } from "@/contexts/AuthUserContext";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import {
  addOrUpdateDataToFirebase,
  getDataFromFirebase,
} from "@/firebase/firestore";
import { UserType } from "@/types/User";
import UserInfosForm from "./UserInfosForm";
import { formSchema } from "@/types/Forms";
import { toast } from "react-toastify";

const UserIsConnected = () => {
  const authUserInfo = useContext(AuthContext);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userData === null) {
      const handleGetUserData = async () => {
        const result = await getDataFromFirebase(
          "users",
          authUserInfo.authUserInfo?.uid || ""
        );
        if (result.error) {
          console.error(result.error);
          return;
        }
        if (result.data) setUserData(result.data as UserType);
      };
      handleGetUserData();
    }
  }, [authUserInfo.authUserInfo?.uid, userData]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    if (authUserInfo && authUserInfo.authUserInfo) {
      const { error } = await addOrUpdateDataToFirebase(
        "users",
        authUserInfo.authUserInfo.uid,
        values
      );
      if (error) {
        setLoading(false);
        toast.error("Un problème est survenu !");
        return;
      }
      toast.success("Mise à jour reussie");
    }
    setLoading(false);
  }

  return (
    userData && (
      <UserInfosForm
        onSubmit={onSubmit}
        userData={userData}
        loading={loading}
      />
    )
  );
};

export default UserIsConnected;
