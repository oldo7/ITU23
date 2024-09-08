/* 
  Autori: Matúš Dobiáš, Oliver Nemček
  Popis: Komponenta zobrazujúca ponuku
*/

import { Link } from "react-router-dom";
import { useState } from "react";


const PonukaPreview = ({ AuthUser, ponuka, fetchAgain, setFetchagain }) => {
  const [detail, setDetail] = useState(false); 

  let vlastnik = AuthUser && AuthUser.email === ponuka.user;

  const handleToggleDetail = () => {
    setDetail(!detail);
  };

  const handleDelete = () => {
    fetch(`http://localhost:8000/ponuka/${ponuka.id}`, { // Autorom handleDelete je Oliver Nemček
      method: "DELETE",
    }).then(() => {
      setFetchagain(fetchAgain + 1);
    });
  };

  const styles = { // stylovanie, prosim nepresuvaj mi ho odtialto
    card: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      marginBottom: '10px',
      textAlign: 'center',
    },
    button: {
      display: 'block',
      margin: '10px auto',
      padding: '8px 16px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
    },
    editButton: {
      textDecoration: 'none',
      backgroundColor: '#28a745',
      color: 'white',
    },
    detail: {
      marginTop: '15px',
      borderTop: '1px solid #eee',
      paddingTop: '15px',
    },
  };

  return (
    <div style={styles.card}>
      <h1>Ponuka {ponuka.nazov}</h1>
      <h2>Cena: {ponuka.cena}</h2>

      <button onClick={handleToggleDetail} style={styles.button}>
        {detail ? 'Skryt detail' : 'Detail'}
      </button>

      {detail && ( // VYSUVACI DETAIL
        <div style={styles.detail}>
          <p>Popis: {ponuka.popis}</p>
          <p>Od: {ponuka.user}</p>
          {ponuka.image && <img className="trh_img" src={ponuka.image} alt={`Obrazok ${ponuka.nazov}`} />}
        </div>
      )}

      {vlastnik && (
        <div>
          <button onClick={handleDelete} style={{ ...styles.button, ...styles.deleteButton }}>
            Odstranit ponuku
          </button>
          <Link to={`/ponuka/${ponuka.id}/upravit`} style={{ ...styles.button, ...styles.editButton }}>
            Upravit ponuku
          </Link>
        </div>
      )}
    </div>
  );
};

export default PonukaPreview;