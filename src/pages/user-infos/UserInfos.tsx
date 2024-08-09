import { AuthContext } from "@/contexts/AuthUserContext";
import { useContext } from "react";
import UserIsConnected from "./UserIsConnected";
import UserNotConnected from "./UserNotConnected";

const UserInfos = () => {
  const { authUserInfo } = useContext(AuthContext);

  return (
    <div>{!authUserInfo ? <UserNotConnected /> : <UserIsConnected />}</div>
  );
};

export default UserInfos;
