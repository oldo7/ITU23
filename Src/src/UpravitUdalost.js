//Autor: Oliver Nemček

import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from "./useFetch";
import { useEffect } from "react";

const UpravitUdalost = ( { AuthUser } ) => {
    const { id } = useParams();

  const [event_name, setEvent_name] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [max_people, setMax_people] = useState("")
  const [start_date, setStart_date] = useState("")
  const [end_date, setEnd_date] = useState("")
  const [start_time, setStart_time] = useState("")
  const [end_time, setEnd_time] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const [kategoria, setKategoria] = useState("Sport")

    //fetch
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetch('http://localhost:8000/udalost/' + id)
        .then(res => {
        if (!res.ok) {
            throw Error('could not fetch the data for that resource');
        } 
        return res.json();
        })
        .then(data => {
        setIsPending(false);
        setData(data);
        setEvent_name(data.event_name);
        setDescription(data.description);
        setLocation(data.location);
        setMax_people(data.max_people)
        setStart_date(data.start_date);
        setStart_time(data.start_time);
        setEnd_date(data.end_date);
        setEnd_time(data.end_time);
        setKategoria(data.kategoria);
        setError(null);
        })
        .catch(err => {
        setIsPending(false);
        setError(err.message);
        })
    }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const creator = AuthUser.email;
    const udalost = { event_name, description, location, max_people, start_date, start_time, end_date, end_time, creator, id, kategoria}

    setIsLoading(true);

    fetch('http://localhost:8000/udalost/' + id, {
      method: 'PUT',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(udalost)
    }).then(() => {
      setIsLoading(false)
      navigate('/moje')
    })
  }

  if(data != null){
    if (AuthUser == null || AuthUser.email !== data.creator ){
        return (
          <h1>Na modifikaciu tejto udalosti nemate pravo</h1>
        );
      }
  }
  
  
  return ( 
    <div className="createContainer">
    { Error && <div>{ Error }</div> }
    { isPending && <div>Loading...</div> }
    { data && 
    <form onSubmit={handleSubmit}>
      <div className="createu">
      <label> Nazov: </label>
      <input
        type="text"
        required
        value={ event_name }
        onChange={(e) => setEvent_name(e.target.value)}
      ></input>

      <label> Popis: </label>
      <textarea
        required
        value={ description }
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <label> Lokacia: </label>
      <input
        type="text"
        required
        value={ location }
        onChange={(e) => setLocation(e.target.value)}
      ></input>
    </div>
    <div className="create">
    <label> Kapacita: </label>
    <input
      type="number"
      required
      value={ max_people }
      onChange={(e) => setMax_people(e.target.value)}
    ></input>

    <label> Datum zaciatku: </label>
    <input type="date" min="2023-01-01" max="2030-12-31" value={ start_date } onChange={(e) => setStart_date(e.target.value)}/>
    
    <label> Cas zaciatku: </label>
    <input type="time" min="00:00" max="23:59" required value={ start_time } onChange={(e) => setStart_time(e.target.value)}/>

    <label> Datum Konca: </label>
    <input type="date" min="2023-01-01" max="2030-12-31" value={ end_date } onChange={(e) => setEnd_date(e.target.value)}/>
    
    <label> Cas Konca: </label>
    <input type="time" min="00:00" max="23:59" required value={ end_time } onChange={(e) => setEnd_time(e.target.value)}/>
    
    <label> Kategoria: </label>
    <select
      value={kategoria}
      onChange={(e) => setKategoria(e.target.value)}
    >
      <option value={"Sport"}>Sport</option>
      <option value={"Zabava"}>Zabava</option>
      <option value={"Doskove hry"}>Doskove hry</option>
      <option value={"Konicky"}>Konicky</option>
      <option value={"Ine"}>Ine</option>
    </select>
    </div>
    { !isLoading && <button> Upravit </button>}
    { isLoading && <button disabled> Pridavam... </button>}
    </form>
    
    }
    </div>
   );

}
 
export default UpravitUdalost;