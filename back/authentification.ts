import { useState } from 'react';
import { auth } from "./firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useRegister = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState(false);

  const register = (email : string, password : any) => {

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user
        setLoading(false)

        console.log("New User", user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false)
        setError(true)

        console.log("Erreur :", errorCode, errorMessage)
        
      });
    }

    return { register, loading, error };
}