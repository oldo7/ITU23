/*
  Autori: Matúš Dobiáš, Oliver Nemček
  Popis: Upravenie ponuky
  */

import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const UpravitPonuku = ( { AuthUser } ) => {
    const { id } = useParams();

    const [data, setData] = useState(null)
    const [nazov, setNazov] = useState("")
    const [popis, setPopis] = useState("")
    const [cena, setCena] = useState("")
    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate();

    //fetch
    useEffect(() => {

    fetch('http://localhost:8000/ponuka/' + id)  // https://www.youtube.com/watch?v=DTBta08fXGU 
    .then(res => {
    if (!res.ok) { // error coming back from server
        throw Error('could not fetch the data for that resource');
    } 
    return res.json();
    })
    .then(data => {
    setIsPending(false);
    setData(data);
    setNazov(data.nazov);
    setPopis(data.popis);
    setCena(data.cena);
    })
    .catch(err => {
    // auto catches network / connection error
    setIsPending(false);
    })
    }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = AuthUser.email;
    const ponuka = { nazov, popis, cena, user }

    setIsPending(true);

    fetch('http://localhost:8000/ponuka/' + id, {
      method: 'PUT',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(ponuka)
    }).then(() => {
      setIsPending(false)
      navigate('/trhovisko')
    })
  }

  if (AuthUser == null){
    return (
      <h1>Pre vytvorenie udalosti musite byt prihlaseny</h1>
    );
  }
  
  if(data != null){
    if (AuthUser == null || AuthUser.email !== data.user ){
        return (
          <h1>Na modifikaciu tejto udalosti nemate pravo</h1>
        );
      }
  }

  return ( //STYLING V index.css
    <div className="createContainer"> 
    <div className="create">
    <h2>Upravit ponuku</h2>
    <form onSubmit={handleSubmit}>
      <label> Nazov: 
      <input
        type="text"
        required
        value={ nazov }
        onChange={(e) => setNazov(e.target.value)}
      ></input></label>

      <label> Popis: 
      <textarea
        required
        value={ popis }
        onChange={(e) => setPopis(e.target.value)}
      ></textarea></label>

      <label> Cena: 
      <input
        type="text"
        required
        value={ cena }
        onChange={(e) => setCena(e.target.value)}
      ></input></label>
    
    { !isPending && <button> Upravit ponuku </button>}
    { isPending && <button disabled> Odosielam... </button>}

    </form>
    </div>
    </div>
   );

}
 
export default UpravitPonuku;