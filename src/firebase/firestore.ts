import { doc, setDoc } from "firebase/firestore"; 
import { FirebaseError } from "firebase/app"
import { db } from "@/firebase/firebase-config"

export const addOrUpdateDataToFirebase = async (
    collectionName: string,
    documentId: string,
    data: object,
) => {

    try {
        const docRef = doc(db, collectionName, documentId); 
        // we add { merge: true } so if the documentId already exists, the data will be merged/combined and not overwritten
        await setDoc(docRef, data, { merge: true })

        return { 
            data: data 
        }
    } catch (error) {
        const firebaseError = error as FirebaseError

        return {
          error: firebaseError.message
        };
    }
}