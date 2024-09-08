//Autor: Oliver Nemček

import { useEffect, useState } from "react";

const Filters = ({ data, setNewData }) => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();

  const [Fstart_date, setStart_date] = useState(
    `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`
  );
  const [Fend_date, setEnd_date] = useState(
    `${year + 1}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`
  );
  const [Fstart_time, setStart_time] = useState("00:00");
  const [Fend_time, setEnd_time] = useState("23:59");
  const [Fkategoria, setKategoria] = useState("");

  const adjustDate = (currentDate, adjustment) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + adjustment);
    return newDate.toISOString().split('T')[0];
  };

  const adjustTime = (currentTime, adjustment) => {
    const timeParts = currentTime.split(':');
    let hours = parseInt(timeParts[0], 10);
    let minutes = parseInt(timeParts[1], 10) + adjustment;

    if (minutes >= 60) {
      minutes -= 60;
      hours += 1;
    } else if (minutes < 0) {
      minutes += 60;
      hours -= 1;
    }

    if (hours >= 24) {
      hours = 0;
    } else if (hours < 0) {
      hours = 23;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };
  const combineDateTime = (date, time) => {
    return new Date(`${date}T${time}`);
  };

  useEffect(() => {
    const filteredData = data.filter(event => {
      const eventStartDateTime = combineDateTime(event.start_date, event.start_time);
      const filterStartDateTime = combineDateTime(Fstart_date, Fstart_time);
      const filterEndDateTime = combineDateTime(Fend_date, Fend_time);

      return eventStartDateTime >= filterStartDateTime &&
             eventStartDateTime <= filterEndDateTime &&
             (Fkategoria === "" || event.kategoria === Fkategoria);
    });
    setNewData(filteredData);
  }, [Fstart_date, Fend_date, Fstart_time, Fend_time, Fkategoria, data, setNewData]);
  const styles = {
    filtersContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      gap: '10px',
      backgroundColor: 'transparent',
      borderRadius: '5px',
      margin: '0 auto',
      width: 'max-content',
    },
    inputGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    button: {
      backgroundColor: '#ADD8E6',
      color: '#1F51FF',
      border: '1px solid white',
      padding: '5px 10px',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '0.9rem',
    },
    input: {
      backgroundColor: 'transparent',
      color: 'white',
      border: '1px solid white',
      borderRadius: '5px',
      padding: '5px 10px',
      fontSize: '0.9rem',
      width: '80px',
    },
    select: {
      backgroundColor: 'transparent',
      color: 'black',
      border: '1px solid white',
      borderRadius: '5px',
      padding: '5px 10px',
      fontSize: '0.9rem',
    },
    label: {
      color: 'white',
      fontSize: '0.9rem',
    }
  };

  return (
    <div style={styles.filtersContainer}>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Od:</label>
        <button style={styles.button} onClick={() => setStart_time(adjustTime(Fstart_time, -30))}>-</button>
        <input style={styles.input} type="time" value={Fstart_time} onChange={(e) => setStart_time(e.target.value)} />
        <button style={styles.button} onClick={() => setStart_time(adjustTime(Fstart_time, 30))}>+</button>
        
        <label style={styles.label}>Do:</label>
        <button style={styles.button} onClick={() => setEnd_time(adjustTime(Fend_time, -30))}>-</button>
        <input style={styles.input} type="time" value={Fend_time} onChange={(e) => setEnd_time(e.target.value)} />
        <button style={styles.button} onClick={() => setEnd_time(adjustTime(Fend_time, 30))}>+</button>
      </div>
      
      <div style={styles.inputGroup}>
        <label style={styles.label}>Dátum od:</label>
        <button style={styles.button} onClick={() => setStart_date(adjustDate(Fstart_date, -1))}>-</button>
        <input style={styles.input} type="date" value={Fstart_date} onChange={(e) => setStart_date(e.target.value)} />
        <button style={styles.button} onClick={() => setStart_date(adjustDate(Fstart_date, 1))}>+</button>
        
        <label style={styles.label}>Dátum do:</label>
        <button style={styles.button} onClick={() => setEnd_date(adjustDate(Fend_date, -1))}>-</button>
        <input style={styles.input} type="date" value={Fend_date} onChange={(e) => setEnd_date(e.target.value)} />
        <button style={styles.button} onClick={() => setEnd_date(adjustDate(Fend_date, 1))}>+</button>
      </div>
      
      <div style={styles.inputGroup}>
        <label style={styles.label}>Kategória:</label>
        <select style={styles.select} value={Fkategoria} onChange={(e) => setKategoria(e.target.value)}>
          <option value="">Všetky</option>
          <option value="Sport">Šport</option>
          <option value="Zabava">Zábava</option>
          <option value="Doskove hry">Doskové hry</option>
          <option value="Konicky">Koníčky</option>
          <option value="Ine">Iné</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;