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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log('Usuario logueado:', user);
                setCurrentUser(user);
            }
        });
        return unsubscribe;
    }, []);

    const signIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Usuario logueado con éxito:', userCredential.user);
            setCurrentUser(userCredential.user);
        } catch (error) {  
            console.error('Error al loguear el usuario:', error);
            alert(error.message);
        }
    }

    const signOut = async () => {
        try {
            await auth.signOut();
            console.log('Usuario deslogueado con éxito');
            setCurrentUser(null);
        } catch (error) {
            console.error('Error al desloguear el usuario:', error);
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