import { useState } from 'react';
import { auth } from "../../firebase/firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, AuthError } from "firebase/auth";

export const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const register = (email: string, password: string) => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        setLoading(false)
        setError(null)
        console.log("New User =>", userCredential.user)
      })
      .catch((error: AuthError) => {
        setLoading(false)
        setError(error.message)
        console.log("Error =>", error.message
        )
      });
  }

  return { register, loading, error };
}

export const useLogIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userAuth, setUserAuth] = useState(false)

  const logIn = (email: string, password: string) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        setError(null)
        setUserAuth(true)
      })
      .catch((error: AuthError) => {
        setLoading(false);
        setError(error.message);
        console.log("Error =>", error.message)
      });
  };

  return { logIn, loading, error, userAuth };
};