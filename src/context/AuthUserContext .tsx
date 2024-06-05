import { createContext, useContext } from 'react';
import { User } from "firebase/auth";
import { useUserAuth } from "@/hooks/useAuth.ts";
import { UserType } from "@/types/User.ts";

const AuthContext = createContext<{
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

// To be used in child components of AuthContextProvider that needs the AuthContext
export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) { 
        throw new Error('useAuthContext doit être utilisé avec AuthContextProvider')
    }    
    return context
}