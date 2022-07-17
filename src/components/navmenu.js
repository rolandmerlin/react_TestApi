import { NavLink } from 'react-router-dom'
import "./navmenu.css"

function NavMenu(){
    return <div id="menu--lateral">
        <nav>
            <NavLink to="/" className="nav--link">Accueil</NavLink>
            <NavLink to="/users" className="nav--link">Utilisateur</NavLink>
        </nav>
        <div className="flipLMenu">&nbsp;</div>
    </div>
}

export default NavMenu