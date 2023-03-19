import { collection, addDoc, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore"
import { firestore } from "./firebase-setup"

export async function addSpotFunction(data) {
    try {
      await addDoc(collection(firestore, "spots"), data);
    } catch (err) {
      console.log(err);
    }
  }
