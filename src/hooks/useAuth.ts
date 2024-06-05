import { useState, useEffect } from 'react';
// Firebase
import { auth, db } from "@/firebase/firebase-config";
import { addNewUserToFirebase } from '@/firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, onAuthStateChanged, signOut, User } from "firebase/auth";
import { FirebaseError } from "firebase/app"
import { doc, getDoc } from "firebase/firestore";
// Types
import { RegisterFormType, LogInFormType } from '@/types/Forms';
import { UserType } from '@/types/User';
// Librairie
import { toast } from 'react-toastify';

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isUserConnected, setIsUserConnected] = useState<boolean>(false);

  // To stay connected when the page is reloaded
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
        // We add the user to the database 
        await addNewUserToFirebase('users', user.uid, userInfoToKeep)
        setError(null)
        setIsUserConnected(true)
        toast.success(`Inscription réussie (${userCredential.user.email})`);
      }
      return {
        data: user
      }
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

  const firebaseLogIn = async ({ email, password }: LogInFormType) => {
    setLoading(true)

    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      setIsUserConnected(true)
      toast.success(`Connexion réussie (${userCredential.user.email})`);
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
  return { firebaseRegister, firebaseLogIn, loading, error, isUserConnected, logOut };
}

export const useUserAuth = () => {
  const [authUserInfo, setAuthUserInfo] = useState<UserType | User | null>(null);
  const [authUserIsLoading, setAuthUserIsLoading] = useState<boolean>(true);

  const getUserInfoFromFirestore = async (user: UserType | User) => {
    if (auth.currentUser) {
      // We fetch the connected user's info from the database using their ID
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      let userInfo = user
  
      if (docSnap.exists()) {        
        // If the document exists (the user in the database), we fetch the desired data
        userInfo = docSnap.data() as UserType
      }
      // Otherwise, we use the info from Firebase authentication
      setAuthUserInfo(userInfo)
      setAuthUserIsLoading(false)
    }
  }

  const authStateChanged = async (currentUser: UserType | User | null) => {
    if (!currentUser) {
      setAuthUserInfo(null)
      setAuthUserIsLoading(false)
      return
    }
    setAuthUserIsLoading(true)
    await getUserInfoFromFirestore(currentUser)
  }

  // Setting up a listener for changes in authentication state. 
  useEffect(() => {
    // When the authentication state changes, the callback function provided to 'onAuthStateChanged' (authStateChanged) is called with the current user's as a parameter. If no user is logged in, Firebase calls it with `null`.
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    // Unsubscribe function returned by useEffect is called when the component is unmounted, which helps to avoid memory leaks.
    return () => unsubscribe();
  }, []);

  return {
    authUserInfo,
    authUserIsLoading,
  }
}