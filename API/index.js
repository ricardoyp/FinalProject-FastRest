import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const getCollection = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => doc.data());
    console.log(data);
    return data;
}