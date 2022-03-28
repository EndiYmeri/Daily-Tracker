import { NavLink } from "react-router-dom"
import { User } from "../../types"

type Props = {
    user?: User
}

export default function Footer({user}:Props){
    return (
        <footer className={user? '' : 'hidden'} > 
            
            <nav>
                <li><NavLink to={'/'}>Home</NavLink></li>
                <li><NavLink to={'/sleep'}>Sleep</NavLink></li>
            </nav>
        </footer>
    )
}