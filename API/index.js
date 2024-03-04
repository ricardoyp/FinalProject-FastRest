import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const getCollectionAppetizers = async () => {
    const querySnapshot = await getDocs(collection(db, "Appetizers"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
}

export const getCollectionMainCourse = async () => {
    const querySnapshot = await getDocs(collection(db, "MainCourse"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
}

export const getCollectionDesserts = async () => {
    const querySnapshot = await getDocs(collection(db, "Desserts"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
}

export const addDataAppetizers = async (nameId, data) => {
    await setDoc(doc(db, "Appetizers", nameId), data);
}

export const addDataMainPlates = async (nameId, data) => {
    await setDoc(doc(db, "MainPlates", nameId), data);
}

export const addDataDessert = async (nameId, data) => {
    await setDoc(doc(db, "Desserts", nameId), data);
}

export const createBillTicket = async (data) => {
    await setDoc(doc(db, "BillTickets", data.date), data);
}

export const getBillTicketsByEmail = async (email) => {
    try {
        const querySnapshot = await getDocs(collection(db, "BillTickets"));
        const data = querySnapshot.docs.map((doc) => doc.data()).filter((ticket) => ticket.email === email)
        console.log("DATA", data );
        return data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error for proper handling
    }
};

export const addPromotion = async (code) => {
    console.log("CODE", code);
    try {
        const querySnapshot = await getDocs(collection(db, "Promotions"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        const filteredData = data.filter((promotion) => promotion.code === code);
        console.log("DATAPromotions", data );
        console.log("filteredData", filteredData );
    } catch (error) {
        console.error("Error adding promotion:", error);
        throw error; // Re-throw the error for proper handling
    }
}