import { useState, useEffect } from 'react';

import { auth } from "@/firebase/firebase-config";
import { addNewUserToFirebase } from '@/firebase/firestore';
import { RegisterFormType, LogInFormType } from '@/types/Forms';
import { UserType } from '@/types/User';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, onAuthStateChanged, signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app"

import { toast } from 'react-toastify';

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isUserConnected, setIsUserConnected] = useState<boolean>(false);

  // Pour rester connecté lors du rechargement de la page
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserConnected(true);
      } else {
        setIsUserConnected(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const firebaseRegister = async ({ email, password }: RegisterFormType) => {
    setLoading(true)
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user      

      if (user) {
        const userInfoToKeep: UserType = {
          uid: user.uid,
          email: email,
          displayName: "",
          emailVerified: false,
          photoUrl: null,
          creationDate: new Date()
        }
        // On ajoute le user dans la BDD
        await addNewUserToFirebase('users', user.uid, userInfoToKeep)
        setIsUserConnected(true)
        toast.success(`Inscription réussie (${userCredential.user.email})`);
      }
      return {
        data: user
      }
    } catch (error) {
      const firebaseError = error as FirebaseError
      toast.error(`Problème lors de l'inscription : ${firebaseError.message}`)
      return {
        error: firebaseError.message
      };
    } finally {
      setLoading(false)
    }
  }

  const firebaseLogIn = async ({ email, password }: LogInFormType) => {
    setLoading(true)

    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      setIsUserConnected(true)
      toast.success(`Connexion réussie (${userCredential.user.email})`);
    } catch (error) {
      const firebaseError = error as FirebaseError
      toast.error(`Problème lors de la connexion : ${firebaseError.message}`);
      return {
        error: firebaseError.message
      };
    } finally {
      setLoading(false)
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setIsUserConnected(false);
      toast.success("Déconnexion réussie");
    } catch (error) {
      const firebaseError = error as FirebaseError;
      toast.error(`Problème lors de la déconnexion : ${firebaseError.message}`);
      return { error: firebaseError.message }
    } finally {
      setLoading(false);

    }
  }

  return { firebaseRegister, firebaseLogIn, loading, isUserConnected, logOut };
}