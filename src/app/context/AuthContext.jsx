"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/config"; // Ensure this path is correct

// Create a context for authentication
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to hold the user

    // Function for Google sign-in
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Google Sign In Error:", error);
        }
    };

    // Function for sign out
    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Sign Out Error:", error);
        }
    };

    // Effect to handle authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Ensure setUser is in the correct scope
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    // Provide user data and auth functions to children components
    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using the AuthContext
export const UserAuth = () => {
    return useContext(AuthContext);
};
