//Autor: Martin Packa

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";

const SignUp = () => {
    const auth = getAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
    }

    return (
        <div className="Signincontainer">
            <form onSubmit={signUp}>
                <h1>Registracia</h1>
                <input type="email" placeholder="Vas email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder="Vase heslo" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Zaregistrovat</button>
            </form>
        </div>
    );
}
 
export default SignUp;