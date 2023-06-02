import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const signUp = (email, password) => {
        
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (name, photo) => {
        
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    const googleSignIn = () => {
        
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('state', currentUser)
            
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const authInfo = {
        user,
        signUp,
        signIn,
        updateUser,
        logOut,
        googleSignIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;