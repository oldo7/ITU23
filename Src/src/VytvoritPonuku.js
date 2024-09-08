/*
Autori: Matúš Dobiáš
Popis: Komponenta na vytvorenie ponuky

*/


import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const VytvoritPonuku = ( { AuthUser, fetchAgain, setFetchagain } ) => {
  const [nazov, setNazov] = useState("")
  const [popis, setPopis] = useState("")
  const [cena, setCena] = useState("")
  const [image, setImage] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = (e) => { // Asynchronna funkcia na zaslanie dat na server
    e.preventDefault();
    const user = AuthUser.email;
    const ponuka = { nazov, popis, cena, user, image }

    setIsPending(true);

    fetch('http://localhost:8000/ponuka', {
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(ponuka)
    }).then(() => {
      setIsPending(false)
      setFetchagain(fetchAgain + 1);
    })
  }

  if (AuthUser == null){ // Autentifikacia 
    return (
      <h1>Pre vytvorenie udalosti musite byt prihlaseny</h1>
    );
  }
  
  return ( //tajny formular, na stranke sa javy iba ako nevyplnena ponuka
    <div className="createContainer">
    
    <form onSubmit={handleSubmit}> 
    <div className="create">
      <label> Nazov: </label>
      <input
        type="text"
        required
        value={ nazov }
        onChange={(e) => setNazov(e.target.value)}
      ></input>

      <label> Popis: </label>
      <textarea
        required
        value={ popis }
        onChange={(e) => setPopis(e.target.value)}
      ></textarea>

      <label> Cena: </label>
      <input
        type="text"
        required
        value={ cena }
        onChange={(e) => setCena(e.target.value)}
      ></input>

    <label> URL obrazka: </label>
      <input
        type="text"
        value={ image }
        onChange={(e) => setImage(e.target.value)}
      ></input>
    </div>
    { !isPending && <button> Vytvorit ponuku </button>}
    { isPending && <button disabled> Pridavam... </button>}
    </form>
    </div>
   );

}
 
export default VytvoritPonuku;