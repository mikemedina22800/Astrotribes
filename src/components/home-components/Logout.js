import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

function Logout() {
    const logout = () => {
        signOut(auth).then(() => {
            localStorage.clear()
            setIsAuth(false)
            window.location.pathname="/auth";
        })
    }
  return (
    <div>Signup</div>
  )
}

export default Signup