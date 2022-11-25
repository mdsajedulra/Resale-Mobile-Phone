import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../../Firebase/Firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
export const AuthContext = createContext()

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    // Register user
    const registerUsingEmailPassword = (email, password) => {
        setLoading(true)
        console.log(email, password)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // login user
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    // login user using google popup
    const createUserByGooglePopup = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // update user name
    const updateUserProfile = (updateInfo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, updateInfo)
    }
    // logout
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const [user, setUser] = useState(null);
    //get current user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {

            setUser(currentUser)
            setLoading(false)

        })
        return () => unSubscribe;
    }, [])

    const authInfo = {
        registerUsingEmailPassword,
        createUserByGooglePopup,
        loginUser,
        updateUserProfile,
        user,
        logOut,
        loading
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;