import { AuthContext } from "@/contexts/AuthUserContext";
import { useContext } from "react";
import UserNotConnected from "./UserNotConnected";
import UserIsConnected from "./UserIsConnected";

const UserInfos = () => {
    const { authUserInfo } = useContext(AuthContext);
    console.log(authUserInfo);



    return <div>
        {
        !authUserInfo ?  <UserNotConnected /> : <UserIsConnected />
        }
        </div>;
};

export default UserInfos;