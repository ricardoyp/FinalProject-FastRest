import { onAuthStateChanged, signInWithEmailAndPassword, updateEmail, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { updateUser } from "../API";

export const AuthContext = createContext({
    currentUser: null,
    signIn: () => { },
    signOut: () => { },
});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => { // Se ejecuta cada vez que el usuario cambia (Registro, Login, Logout)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user)
            if (user) {
                setCurrentUser(user);
                console.log('User changed: ', user);
            }
        });
        return unsubscribe;
    }, []);

    const signIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully: ', userCredential.user);
            setCurrentUser(userCredential.user);
            
        } catch (error) {
            console.error('User not logged in because:', error);
            alert(error.message);
        }
    }

    const signOut = async () => {
        try {
            await auth.signOut();
            console.log('User logged out successfully.');
            setCurrentUser(null);
        } catch (error) {
            console.error('User not logout because:', error);
            alert(error.message);
        }
    }

    const updateChangesUser = async (name, email) => {
        try {
            await updateProfile(currentUser, {
                displayName: name,
            });
            await updateEmail(currentUser, email);
            setCurrentUser({
                ...currentUser,
                displayName: name,
                email: email
            });
            await updateUser(currentUser.uid, { displayName: name, email: email});
            console.log('User updated: ', currentUser);
        } catch (error) {
            console.error('User profile not updated because:', error);
            alert(error.message);
        }
    }

    const contextValue = {
        currentUser,
        signIn,
        signOut,
        updateChangesUser,
    };


    return (
        <AuthContext.Provider value={{ ...contextValue }}>
            {children}
        </AuthContext.Provider>
    );
};