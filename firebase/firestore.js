import { collection, addDoc, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore"
import { firestore } from "./firebase-setup"

export async function addEntriesFunction(data) {
    try {
      await addDoc(collection(firestore, "entries"), data);
    } catch (err) {
      console.log(err);
    }
  }
