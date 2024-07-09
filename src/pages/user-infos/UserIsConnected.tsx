import { AuthContext } from "@/contexts/AuthUserContext";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { addOrUpdateDataToFirebase, getDataFromFirebase } from "@/firebase/firestore";
import { UserType } from "@/types/User";
import FamillyInfosForm from "./FamillyInfosForm";
import { formSchema } from "@/types/Forms";


const UserIsConnected = () => {
    const authUserInfo = useContext(AuthContext);
    const [userData, setUserData] = useState<UserType | null>(null);

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

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if (authUserInfo && authUserInfo.authUserInfo) {
            addOrUpdateDataToFirebase(
                "users",
                authUserInfo.authUserInfo.uid,
                values
            );
        }
        console.log("values", values);
    }

    return (
        userData && <FamillyInfosForm onSubmit={onSubmit} userData={userData} />
    );
};

export default UserIsConnected;
