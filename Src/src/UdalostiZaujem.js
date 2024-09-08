//Autor: Oliver Nemček

import './App.css';
import useFetch from './useFetch';
import { Link } from 'react-router-dom';
import Filters from './filters';
import { useState } from 'react';
import UdalostPreview from './UdalostPreview';

function UdalostiZaujem({ AuthUser }) {
    const [fetchAgain, setFetchagain] = useState(0)
    const { data, isPending, Error} = useFetch('http://localhost:8000/udalost?_embed=zaujemca', fetchAgain)
    let filteredData = [];
    const [newData, setNewData] = useState(null)

    //filtrovanie udalosti aby sa zobrazovali iba tie o ktore ma uzivatel zaujem
    if((data != null) && (AuthUser != null)){
        data.forEach(checkInterest)
    } else{
      filteredData = null;
    }

    function checkInterest(item){
        item.zaujemca.forEach(checkUser)
    }

    function checkUser(item){
        if (item.user === AuthUser.email){
            filteredData.push(data.filter(events => events.id === item.udalostId)[0])
        }
    }
    //filtrovanie udalosti aby sa zobrazovali iba tie o ktore ma uzivatel zaujem

    if (AuthUser == null){
      return (
        <h1>Pre zobrazenie vasich udalosti musite byt prihlaseny</h1>
      );
    }else{
      return (
        <div className="home">
          { Error && <div>{ Error }</div> }
          { isPending && <div>Loading...</div> }
          { filteredData && 
          
          //data.event_name
          //<div><pre>{JSON.stringify(data, null, 2) }</pre></div> 
          <div className="udalosti">
            <Filters data={filteredData} setNewData={setNewData} />
            {newData && newData.map((event) => (
              <div className="udalosti-preview" key={event.id} >
                <UdalostPreview AuthUser={AuthUser} event={event} fetchAgain={fetchAgain} setFetchagain={setFetchagain} />
            </div>
            ))
            }
          </div>}
        </div>
      );
    }
}

export default UdalostiZaujem;