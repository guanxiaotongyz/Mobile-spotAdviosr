import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { auth, firestore } from "./firebase-setup";


 // get user name from user collection
 async function getUserInfoFunction(uid) {
  // console.log("========uid==========", uid);
  const docRef = doc(firestore, "user", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data().name);
    return docSnap.data().name;
  } else {
    console.log("No such document!");
  }
}

// add spot
export async function addSpotFunction(data) {
  try {
    await addDoc(collection(firestore, "spots"), {
      ...data,
      uid: auth.currentUser.uid,
    });
  } catch (err) {
    console.log(err);
  }
}

// add review
export async function addReviewFunction(data, spotId) {
  const reviewName = await getUserInfoFunction(auth.currentUser.uid);
  // console.log("reviewName", reviewName);
  try {
    await addDoc(collection(firestore, "spots", spotId, "reviews"), {
      ...data,
      uid: auth.currentUser.uid,
      reviewname: getUserInfoFunction(auth.currentUser.uid),
      reviewname: reviewName,
    });
  } catch (err) {
    console.log(err);
  }
}

// delete review
export async function deleteReviewFunction(spotId, reviewId) {
  try {
    await deleteDoc(doc(firestore, "spots", spotId, "reviews", reviewId), {
      uid: auth.currentUser.uid,
    });
  } catch (err) {
    console.log(err);
  }
}

// update review
export async function updateReviewFunction(spotId, reviewId, data) {
  try {
    await updateDoc(doc(firestore, "spots", spotId, "reviews", reviewId), {
      ...data,
      uid: auth.currentUser.uid,
    });
  } catch (err) {
    console.log(err);
  }
}

// add userInfo to user collection
export async function addUserInfoFunction(data) {
  try {
    await setDoc(doc(firestore, "user", data.uid), data);
  } catch (err) {
    console.log(err);
  }
}


export async function addFavoriteFunction(itemId) {
  try {
    const userRef = doc(firestore, "user", auth.currentUser.uid);
    const userSnapshot = await getDoc(userRef);
    const favorites = userSnapshot.data().favorite || [];
    const itemRef = doc(firestore, "item", itemId);
    if (!favorites.some(fav => fav.id === itemId)) {
      await updateDoc(userRef, {
        favorite: [...favorites, itemRef],
      });
    }
  } catch (err) {
    console.log(err);
  }
}


export async function removeFavoriteFunction(itemId) {
  try {
    const userRef = doc(firestore, "user", auth.currentUser.uid);
    const userSnapshot = await getDoc(userRef);
    const favorites = userSnapshot.data().favorite || [];
    const itemRef = doc(firestore, "item", itemId);
    const updatedFavorites = favorites.filter(fav => fav.id !== itemId);
    await updateDoc(userRef, {
      favorite: updatedFavorites,
    });
  } catch (err) {
    console.log(err);
  }
}