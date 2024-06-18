import { createContext } from 'react';
import { User } from "firebase/auth";
import { useUserAuth } from "@/hooks/useAuth.ts";
import { UserType } from "@/types/User.ts";

export const AuthContext = createContext<{
    authUserInfo: UserType | User | null,
    authUserIsLoading: boolean
}>({
    authUserInfo: null,
    authUserIsLoading: true
})

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { authUserInfo, authUserIsLoading }: { authUserInfo: UserType | User | null, authUserIsLoading: boolean } = useUserAuth()

    return (
        <AuthContext.Provider
            value={{ authUserInfo, authUserIsLoading }}
        >
            {children}
        </AuthContext.Provider>
    )
}