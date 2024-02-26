import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const getCollectionAppetizers = async () => {
    const querySnapshot = await getDocs(collection(db, "Appetizers"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
}

export const addDataAppetizers = async (nameId, data) => {
    await setDoc(doc(db, "Appetizers", nameId), data);
}

export const addDataMainCourse = async (nameId, data) => {
    await setDoc(doc(db, "MainCourse", nameId), data);
}

export const addDataDessert = async (nameId, data) => {
    await setDoc(doc(db, "Desserts", nameId), data);
}
