import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

export const AuthContext = createContext({
    currentUser: null,
    signIn: () => {},
    signOut: () => {},
});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => { // Se ejecuta cada vez que el usuario cambia (Registro, Login, Logout)
        const unsubscribe = onAuthStateChanged(auth, (user) => { 
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

    const contextValue = {
        currentUser,
        signIn,
        signOut,
    };


    return (
        <AuthContext.Provider value={{ currentUser, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};