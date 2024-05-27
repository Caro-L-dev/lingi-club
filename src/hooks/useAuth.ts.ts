import { useState } from 'react';
import { auth } from "@/firebase/firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { FirebaseError } from "firebase/app"
import { RegisterFormType, LogInFormType } from '@/types/Forms';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const register = async ({ email, password }: RegisterFormType) => {
    setLoading(true)
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
      setError(null)
      toast.success(`Inscription réussie (${userCredential.user.email})`);
      return {
        data: userCredential.user
      };
    } catch (error) {
      const firebaseError = error as FirebaseError
      setError(firebaseError.message);
      toast.error(`Problème lors de l'inscription : ${firebaseError.message}`)
      return {
        error: firebaseError.message
      };
    } finally {
      setLoading(false)
    }
  }

  const logIn = async ({ email, password }: LogInFormType) => {
    setLoading(true)
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      toast.success(`Connexion réussie (${userCredential.user.email})`);
      return {
        data: userCredential.user
      };
    } catch (error) {
      const firebaseError = error as FirebaseError
      setError(firebaseError.message);
      toast.error(`Problème lors de la connexion : ${firebaseError.message}`);
      return {
        error: firebaseError.message
      };
    } finally {
      setLoading(false)
    }
  };

  return { register, logIn, loading, error };
}