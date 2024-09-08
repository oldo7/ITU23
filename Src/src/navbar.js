import { Link } from "react-router-dom";
import logo from './imgs/ronniehomie.png';


const Navbar = () => {
    return ( 
        <div className='buttonsBackground'>
            <span className="logo">
            <img src={ logo }  width="50px" height="50px"/>
            </span>
            <Link className='navlink' to="/profile">
                Prihlasenie
            </Link>
            <Link className='navlink' to="/">
                Vsetky Udalosti
            </Link>
            <Link className='navlink' to="/moje">
                Založené Udalosti
            </Link>
            <Link className='navlink' to="/zaujem">
            <div className="testt">Udalosti o ktore mam zaujem</div>
            </Link>
            <Link className='navlink' to="/trhovisko">
                    Trhovisko
            </Link>
            <p id="saved"></p>
            
            <br />
            <br />
        </div>
     );
}
 
export default Navbar;