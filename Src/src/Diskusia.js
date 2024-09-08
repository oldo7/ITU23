//Autor: Oliver Nemček

import { useState } from "react";
import useFetch from "./useFetch";

const Diskusia = ( {id , AuthUser} ) => {
    const [text, setText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [fetchAgain, setFetchagain] = useState(0)
    const { data, isPending, Error} = useFetch('http://localhost:8000/udalost/' + id + '?_embed=prispevok', fetchAgain);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = AuthUser.email;
        const udalostId = id;
        const prispevok = { udalostId, user, text }
    
        setIsLoading(true);
    
        fetch('http://localhost:8000/prispevok', {
          method: 'POST',
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify(prispevok)
        }).then(() => {
          setIsLoading(false)
          setFetchagain(fetchAgain + 1)
        })
      }

    return (
        <div className="home">
          { Error && <div>{ Error }</div> }
          { isPending && <div>Loading...</div> }
          { data && 
          //data.event_name
          //<div><pre>{JSON.stringify(data, null, 2) }</pre></div> 
          <div className="udalosti">
            {data.prispevok.map((prisp) => (
              <div className="prispevok" key={prisp.id} >
                <div className="fromuser">{ prisp.user } </div>
                <div className="prispevok-text">{ prisp.text }</div>
              </div>
            ))
            }
            { AuthUser &&  
            <form onSubmit={handleSubmit}>
            <div className="pridatPrispevok">
            <input
            placeholder="Pridať príspevok..."
                type="text"
                required
                value={ text }
                onChange={(e) => setText(e.target.value)}
            ></input>
            <span className="prispevokButton">
            { !isLoading && <button> Odoslat </button>}
            { isLoading && <button disabled> Odosielam... </button>}
            </span>
            </div>
            </form>
            }
            
          </div>}
        </div>
      );
}
 
export default Diskusia;