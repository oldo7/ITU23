//Autor: Martin Packa

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            navigate('/moje')
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
            <form onSubmit={signIn}>
                <h1>Prihlasenie</h1>
                <input type="email" placeholder="Vas email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder="Vase heslo" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Prihlasit</button>
            </form>
        </div>
    );
}
 
export default SignIn;