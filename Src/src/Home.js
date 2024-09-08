//Autor: Oliver Nemček

import './App.css';
import useFetch from './useFetch';
import { useState } from 'react';
import Filters from './filters';
import UdalostPreview from './UdalostPreview';
import VytvoritUdalost from './VytvoritUdalost';


function Home( {AuthUser} ) {
  const [fetchAgain, setFetchagain] = useState(0)
  const { data, isPending, Error} = useFetch('http://localhost:8000/udalost?_embed=zaujemca', fetchAgain)
  const [newData, setNewData] = useState(null)
  const [vytvorenie, setVytvorenie] = useState(false)

  const showVytvorenie = () => {
    setVytvorenie(true)
  }

  const hideVytvorenie = () => {
    setVytvorenie(false)
  }

  

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#fff',
    color: '#ff7e5f', 
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    margin: '10px 0',
    outline: 'none',
    transition: 'background-color 0.3s, transform 0.3s',
  };


  const handleMouseOver = (event) => {
    event.target.style.backgroundColor = '#ff7e5f';
    event.target.style.color = '#fff';
    event.target.style.transform = 'translateY(-2px)';
  };

  const handleMouseOut = (event) => {
    event.target.style.backgroundColor = '#fff';
    event.target.style.color = '#ff7e5f';
    event.target.style.transform = 'translateY(0px)';
  };

  return (
    <div className="home">
      {!vytvorenie && <button onClick={showVytvorenie} 
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={buttonStyle}
      >Vytvorit udalost</button>}
      {vytvorenie && <button onClick={hideVytvorenie}
       onMouseOver={handleMouseOver}
       onMouseOut={handleMouseOut}
       style={buttonStyle}
       >Vytvorit udalost</button>}

      { vytvorenie && <VytvoritUdalost AuthUser={AuthUser} fetchAgain={fetchAgain} setFetchagain={setFetchagain} setVytvorenie = {setVytvorenie}/>}
      { Error && <div>{ Error }</div> }
      { isPending && <div>Loading...</div> }
      { data &&
      //data.event_name
      //<div><pre>{JSON.stringify(data, null, 2) }</pre></div> 
      <div className="udalosti">
        <Filters data={data} setNewData={setNewData} fetchAgain={fetchAgain}/>
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

export default Home;