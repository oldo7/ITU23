//Autor: Oliver Nemček

import { Link } from "react-router-dom";
import ZaujemButton from "./ZaujemButton";
import { useEffect, useState } from "react";
import DetailUdalosti from "./DetailUdalosti";

const UdalostPreview = ({ AuthUser, event, fetchAgain, setFetchagain }) => {
    const [fetch2, setFetch2] = useState(0);
    const [expanded, setExpanded] = useState(false);
    let ucastnici = 0;

    useEffect(() => {
        setFetchagain(fetchAgain + 1);
    }, [fetch2]);

    const expand = () => {
        if(expanded === true){
            setExpanded(false);
        }
        else{
            setExpanded(true)
        }
    }

    if(event){
        event.zaujemca.forEach(checkInterest)
      }

    function checkInterest(item) {
        ucastnici++;
      } 

    return (
        <div className="udalosti-previewq" key={event.id}>
            <div className="expandable">
                <div className="timeLine"> 
                <span className="udalostinfo">{event.start_date}</span>
                <span className="udalostinfo">{event.start_time} - {event.end_time}</span> 
                <div className="ucwrapper">
                <span className="udalostinfo4">{ucastnici} / {event.max_people}</span> 
                </div>
                </div><br /><br />
                <span className="udalostinfo2">{event.event_name}</span> 
                <br /><br />
                <span className="udalostinfo3">{event.description}</span> 
                </div>
                <br />
                <div className="ciara">
                <hr />
                </div>
                <div className="spodok">
                    <div className="lokacia">{event.location}</div>
                    <div className="discussWrapper">
                    <div className="discuss" onClick={expand}> Detail </div>
                    </div>
                    <div className="zucastnenie"><div className="ZaujemButton">
                        <ZaujemButton 
                            AuthUser={AuthUser}
                            data={event}
                            id={event.id}
                            fetchAgain={fetch2}
                            setFetchagain={setFetch2}
                        />
                    </div></div>
                </div>
                {expanded && <DetailUdalosti fetch2={fetch2} AuthUser={AuthUser} id={event.id} setFetch2={setFetch2} fetch3={fetch2}/>}
        </div>
    );
};
 
export default UdalostPreview;