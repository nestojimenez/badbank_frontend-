import React from 'react'
import { signOut } from "firebase/auth";
import auth from "../firebase/useAuth";

const LogInMsgForm = ({setShow}) => {

  const firebaseSignOut = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      setShow(true);
      console.log('Sign Out...')
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <>
          <h5>Your now logged In</h5>
          <button
            type="submit"
            className="btn btn-light"
            onClick={firebaseSignOut }
          >
            Log Out
          </button>
        </>
  )
}

export default LogInMsgForm
