import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"


import { useEffect, useState } from "react"
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { AuthContext } from "./AuthContext";


const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const[user,setUser]=useState(null)
  const [loading,setLoading]=useState(true)

const creatUser=(email,password)=>{
  setLoading(true)
  return createUserWithEmailAndPassword(auth,email,password)

}
const signInUser=(email,password)=>{
  setLoading(true)
  return signInWithEmailAndPassword(auth,email,password)
}
const signInWithGoogle=()=>{
  setLoading(true)
  return signInWithPopup(auth,provider)
}
const userUpdated=(profileInfo)=>{
  return updateProfile(auth.currentUser,profileInfo)
}
const userSignOut=()=>{
  return signOut(auth)
}
useEffect(()=>{
  const lockedUser = onAuthStateChanged(auth,currentUser=>{
        setUser(currentUser)
        setLoading(false)
  })
  return ()=>lockedUser()
},[])
   const authInfo={
    creatUser,
    signInUser,
    user,
    loading,
    signInWithGoogle,
    userUpdated,
    userSignOut

   }
  return (
    <AuthContext value={authInfo}>
      { children }
    </AuthContext>
  )
}

export default AuthProvider
