import { doc, setDoc } from "firebase/firestore"; 
import { FirebaseError } from "firebase/app"
import { db } from "@/firebase/firebase-config"

export const addNewUserToFirebase = async (
    collectionName: string,
    documentId: string,
    data: object,
) => {

    try {
        const docRef = doc(db, collectionName, documentId);        
        await setDoc(docRef, data)

        return { 
            data: true 
        }
    } catch (error) {
        const firebaseError = error as FirebaseError

        return {
          error: firebaseError.message
        };
    }
}