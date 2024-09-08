/*
  Autori: Matúš Dobiáš, Oliver Nemček
  Hlavná stránka trhoviska
*/


import './App.css';
import useFetch from './useFetch';
import { useState } from 'react';
import PonukaPreview from './PonukaPreview';
import VytvoritPonuku from './VytvoritPonuku';

function Home({ AuthUser }) {
  const [fetchAgain, setFetchagain] = useState(0);
  const { data, isPending, error } = useFetch('http://localhost:8000/ponuka', fetchAgain); // Autorom fetchu je Oliver Nemček
  const [vytvorenie, setVytvorenie] = useState(false);

  const styles = { // stylovanie, prosim nepresuvaj mi ho odtialto
    trhovisko: {
      padding: '20px',
      paddingBottom: '60px', 
      paddingTop: '60px', 
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100vw',
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '18px',
      margin: '20px 0',
    },
    udalosti: {
      width: '100%',
      maxWidth: '960px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      padding: '20px',
    },
    loading: {
      color: '#ffffff',
    },
    error: {
      color: '#ff0000',
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      padding: '10px',
      borderRadius: '4px',
    },
  };

  return (
    <div style={styles.trhovisko}>
      <button onClick={() => setVytvorenie(!vytvorenie)} style={styles.button}>
        {vytvorenie ? 'Skryt formulár' : 'Vytvorit ponuku'}
      </button>

      {vytvorenie && (
        <VytvoritPonuku
          AuthUser={AuthUser}
          fetchAgain={fetchAgain}
          setFetchagain={setFetchagain}
        />
      )}

      {error && <div style={styles.error}>{error}</div>}
      {isPending && <div style={styles.loading}>Načítava sa...</div>}
      {data && (
        <div style={styles.udalosti}>
          {data.map((ponuka) => (
            <PonukaPreview
              key={ponuka.id}
              AuthUser={AuthUser}
              ponuka={ponuka}
              fetchAgain={fetchAgain}
              setFetchagain={setFetchagain}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;