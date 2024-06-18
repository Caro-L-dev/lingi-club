import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthUserContext"

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) { 
        throw new Error('useAuthContext doit être utilisé avec AuthContextProvider')
    }    
    return context
}