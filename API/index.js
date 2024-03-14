import { arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
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
        return data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error for proper handling
    }
};

export const addPromotion = async (code, userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();

        if (userData.promotions && userData.promotions.some(promotion => promotion.code === code)) {
            alert('Promotion code already added');
            return;
        }

        const querySnapshot = await getDocs(collection(db, "Promotions"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        const filteredData = data.filter((promotion) => promotion.code === code);

        if (filteredData.length === 0) {
            alert('Invalid promotion code');
        } else {
            await updateDoc(userRef, {
                promotions: arrayUnion(...filteredData)
            });
        }
    } catch (error) {
        console.error("Error adding promotion:", error);
        throw error; // Re-throw the error for proper handling
    }
}

export const createUser = async (data, uid) => {
    await setDoc(doc(db, "users", uid), data);
}

export const getRol = async (uid) => {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const data = querySnapshot.docs.map((doc) => doc.data()).filter((user) => user.uid === uid);
        const rol = data[0].rol;
        console.log(rol);
        return rol
    } catch (error) {
        console.error("Error fetching rol:", error);
        throw error; // Re-throw the error for proper handling
    }
}

export const getPromotions = async (userId) => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const promotions = userSnap.data().promotions;
    if (!promotions) {
        return [];
    }
    return promotions;
}

export const usePromotion = async (userUid, promotionCode) => {
    const userRef = doc(db, 'users', userUid);
    const userSnap = await getDoc(userRef);
    const promotions = userSnap.data().promotions;
    const filteredPromotions = promotions.map(promotion => {
        if (promotion.code === promotionCode) {
            return { ...promotion, used: true };
        } else {
            return promotion;
        }
    })

    await updateDoc(userRef, { promotions: filteredPromotions });
}