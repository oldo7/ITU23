//Autor: Martin Packa

import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const AuthDetails = ( {AuthUser} ) => {
    const auth = getAuth();

    const userSignOut = () => {
        signOut(auth)
    }
    return ( 
        <div> {AuthUser ? <><p>{`Prihlaseny ako ${AuthUser.email}`}</p><button onClick={userSignOut}>Odhlasit</button></> : <p>Odhlaseny</p>} </div>
     );
}
 
export default AuthDetails;