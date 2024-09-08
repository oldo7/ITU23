//Autor: Martin Packa

const Zaujemci = ( { zaujemci } ) => {
    return (
        <div className="homeq">
          { zaujemci && 
          <div className="zauzaujemci1">
            <h2>Záujemci:</h2>
            {zaujemci.map((zaujem) => (
              <div className="zauzaujemci1" key={zaujem.id} >
                <div className="Zaujemca"> {zaujem.user} </div> 
              </div>
            ))
            }
          </div>}
        </div>
      );
}
 
export default Zaujemci;