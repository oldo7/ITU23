//Autor: Martin Packa

import { useState } from "react";

const ZaujemButton = ( {id, data, AuthUser, fetchAgain, setFetchagain} ) => {
    const [isLoading, setIsLoading] = useState(false)
    let zaujemID = 0;
    let zaujem = false;
    let ucastnici = 0;
    let full = false;

    //zisti ci bola naplnena kapacita

    //zisti ci uzivatel ma o udalost zaujem
    if(data && AuthUser){
        data.zaujemca.forEach(checkInterest)
      }
      
      function checkInterest(item) {
        ucastnici++;
        if(item.user === AuthUser.email){
          zaujem = true;
          zaujemID = item.id
        }
      } 

        if(data.max_people <= ucastnici){
            full = true;
        }

      const potrvrditUcast = () => {
        const udalostId = id;
        const user = AuthUser.email;
        const zaujem = { udalostId, user }
  
        setIsLoading(true);
  
        fetch('http://localhost:8000/zaujemca', {
            method: 'POST',
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(zaujem)
          }).then(() => {
            setIsLoading(false)
            setFetchagain(fetchAgain + 1)
          })
      }
  
      const zrusitUcast = () => {
  
        setIsLoading(true);
  
        fetch('http://localhost:8000/zaujemca/' + zaujemID, {
            method: 'DELETE',
            //headers: { "Content-Type" : "application/json" },
            //body: JSON.stringify(zaujem)
          }).then(() => {
            setIsLoading(false)
            //tu potrebujem aby sa znova fetchli data
            setFetchagain(fetchAgain + 1)
            //test
          })
      }

    return ( 
        <div className="zaujemButton">
        { isLoading && <div>Nacitavam...</div>}
        { !zaujem && AuthUser && !isLoading && !full && <button onClick={potrvrditUcast} >Mam zaujem</button> }
        { !zaujem && AuthUser && !isLoading && full && <span className="cervena"><button disabled >Kapacita plná</button></span> }
        { zaujem && AuthUser && !isLoading && <button onClick={zrusitUcast}>Zrusit ucast</button> }
        </div>
     );
}
 
export default ZaujemButton;