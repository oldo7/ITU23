//Autor: Oliver Nemček

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const VytvoritUdalost = ({ AuthUser, fetchAgain, setFetchagain, setVytvorenie }) => {
  const [event_name, setEvent_name] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [max_people, setMax_people] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [kategoria, setKategoria] = useState("Sport");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const creator = AuthUser.email;
    const udalost = { event_name, description, location, max_people, start_date, start_time, end_date, end_time, creator, kategoria };
    
    setIsPending(true);

    fetch('http://localhost:8000/udalost', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(udalost)
    }).then(() => {
      setIsPending(false);
      setFetchagain(fetchAgain + 1);
      setVytvorenie(false);
    })
  }

  if (AuthUser == null) {
    return <h1>Pre vytvorenie udalosti musite byt prihlaseny</h1>;
  }

  const formStyles = {
    container: {
      background: 'rgba(255, 126, 95, 0.9)',
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '600px',
      margin: '20px auto',
      color: 'white',
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
    },
    input: {
      padding: '10px',
      border: '1px solid #ffe6e6',
      borderRadius: '5px',
      width: '100%',
      boxSizing: 'border-box',
    },
    halfInput: {
      width: 'calc(50% - 10px)',
    },
    button: {
      background: '#00a2ed',
      border: 'none',
      borderRadius: '20px',
      padding: '10px 20px',
      fontSize: '1rem',
      color: 'white',
      cursor: 'pointer',
      display: 'block',
      width: '100%',
      marginTop: '20px',
    },
  };

  const buttonStyles = {
    marginTop: '10px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '30px',
    backgroundColor: '#ADD8E6',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease 0s',
  };

  const handleButtonHover = (e, hover) => {
    if (hover) {
      e.target.style.backgroundColor = '#ADD8E6';
      e.target.style.color = 'red';
      e.target.style.transform = 'scale(1.05)';
    } else {
      e.target.style.backgroundColor = '#90EE90';
      e.target.style.color = 'green';
      e.target.style.transform = 'scale(1)';
    }
  };

  return (
    <div style={formStyles.container}>
      
      <form onSubmit={handleSubmit}>
        <div style={formStyles.row}>
          <div style={{ width: '48%' }}>
            <label style={formStyles.label}>Nazov:</label>
            <input
              style={formStyles.input}
              type="text"
              required
              value={event_name}
              onChange={(e) => setEvent_name(e.target.value)}
            />
          </div>
          <div style={{ width: '48%' }}>
            <label style={formStyles.label}>Popis:</label>
            <input
              style={formStyles.input}
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        
        <div style={formStyles.row}>
          <div style={{ width: '48%' }}>
            <label style={formStyles.label}>Lokacia:</label>
            <input
              style={formStyles.input}
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div style={{ width: '48%' }}>
            <label style={formStyles.label}>Kapacita:</label>
            <input
              style={formStyles.input}
              type="number"
              required
              value={max_people}
              onChange={(e) => setMax_people(e.target.value)}
            />
          </div>
        </div>
        
        <div style={formStyles.row}>
          <div style={{ width: '48%' }}>
            <label style={formStyles.label}>Datum zaciatku:</label>
            <input
              style={{ ...formStyles.input, ...formStyles.halfInput }}
              type="date"
              min="2023-01-01"
              max="2030-12-31"
              value={start_date}
              onChange={(e) => setStart_date(e.target.value)}
            />
          </div>
          <div style={{ width: '48%' }}>
            <label style={formStyles.label}>Datum Konca:</label>
            <input
              style={{ ...formStyles.input, ...formStyles.halfInput }}
              type="date"
              min="2023-01-01"
              max="2030-12-31"
              value={end_date}
              onChange={(e) => setEnd_date(e.target.value)}
            />
          </div>
        </div>
        
        <div style={formStyles.row}>
          <div style={{ width: '48%' }}>
            <label style={formStyles.label}>Cas zaciatku:</label>
            <input
              style={{ ...formStyles.input, ...formStyles.halfInput }}
              type="time"
              min="00:00"
              max="23:59"
              required
              value={start_time}
              onChange={(e) => setStart_time(e.target.value)}
            />
          </div>
          <div style={{ width: '48%' }}>
            <label style={formStyles.label}>Cas Konca:</label>
            <input
              style={{ ...formStyles.input, ...formStyles.halfInput }}
              type="time"
              min="00:00"
              max="23:59"
              required
              value={end_time}
              onChange={(e) => setEnd_time(e.target.value)}
            />
          </div>
        </div>
        
        <div style={formStyles.row}>
          <label style={formStyles.label}>Kategoria:</label>
          <select
            style={formStyles.input}
            value={kategoria}
            onChange={(e) => setKategoria(e.target.value)}
          >
            <option value="Sport">Sport</option>
            <option value="Zabava">Zabava</option>
            <option value="Doskove hry">Doskove hry</option>
            <option value="Konicky">Konicky</option>
            <option value="Ine">Ine</option>
          </select>
        </div>
        
        {!isPending && <button
        style={buttonStyles}
        onMouseEnter={(e) => handleButtonHover(e, true)}
        onMouseLeave={(e) => handleButtonHover(e, false)}
        >
        Vytvorit udalost
      </button>}
        {isPending && <button style={formStyles.button} disabled>Pridavam...</button>}
      </form>
    </div>
  );
};

export default VytvoritUdalost;