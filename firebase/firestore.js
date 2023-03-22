import { collection, addDoc, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore"
import { firestore } from "./firebase-setup"

export async function addSpotFunction(data) {
    try {
      await addDoc(collection(firestore, "spots"), data);
    } catch (err) {
      console.log(err);
    }
  }

export async function addReviewFunction(data, spotId) {
    try {
      await addDoc(collection(firestore, "spots", spotId, "reviews"), data);
    } catch (err) {
      console.log(err);
    }
  }

// delete review
export async function deleteReviewFunction(spotId, reviewId) {
    try {
      await deleteDoc(doc(firestore, "spots", spotId, "reviews", reviewId));
    } catch (err) {
      console.log(err);
    }
  }

// update review
export async function updateReviewFunction(spotId, reviewId, data) {
    try {
      await updateDoc(doc(firestore, "spots", spotId, "reviews", reviewId), data);
    } catch (err) {
      console.log(err);
    }
  }