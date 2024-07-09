import { AuthContext } from "@/contexts/AuthUserContext";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { getDataFromFirebase } from "@/firebase/firestore";
import { UserType } from "@/types/User";
import UserInfosForm from "./UserInfosForm";

const formSchema = z.object({
    displayName: z.string(),
    email: z.string(),
    description: z.string(),
});

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
         console.log("result2", userData);
    }, [authUserInfo.authUserInfo?.uid, userData]);


    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        userData && (
            <UserInfosForm
                onSubmit={onSubmit}
                userData={userData}
            />
        )
    );
};

export default UserIsConnected;
