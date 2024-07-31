import { db, storage } from "@/firebase/firebase-config"
import { doc, setDoc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { FirebaseError } from "firebase/app"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"

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

export const getDataFromFirebase = async (
    collectionName: string,
    documentId: string,
) => {
    try {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                data: docSnap.data()
            }
        } else {
            return {
                error: "No such document!"
            }
        }
    } catch (error) {
        const firebaseError = error as FirebaseError

        return {
            error: firebaseError.message
        };
    }
}

export const getAllFamiliesFromFirebase = async (collectionName: string) => {
    try {
        const q = query(collection(db, collectionName), where("isFamily", "==", true));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());

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

export const uploadImageOnFirebase = async (imageUpload: File | null) => {
    if (imageUpload) {
        // We create a random name for the image so that none of them have the same name
        const imageRef = ref(storage, `familiesPhoto/${imageUpload.name + v4()}`);
        try {
            await uploadBytes(imageRef, imageUpload);
            // Getting the URL of the uploaded image
            const url = await getDownloadURL(imageRef);

            return url

        } catch (error) {
            console.error("Erreur lors du téléchargement de l'image : ", error);
        }
    }
};
