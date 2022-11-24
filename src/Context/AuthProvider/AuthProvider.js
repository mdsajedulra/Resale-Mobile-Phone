import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../../Firebase/Firebase.config';
export const AuthContext = createContext()

const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // Register user
    const registerUsingEmailPassword = (email, password) => {
        setLoading(true)
        console.log(email, password)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // login user
    const loginUser = (email, password) => {
        console.log(email, password)
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
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

    //get current user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                setUser(currentUser)
                setLoading(false)
            }
        })
        return () => unSubscribe;
    }, [])

    const authInfo = {
        registerUsingEmailPassword,
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