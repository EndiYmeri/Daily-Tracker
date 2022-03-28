import { NavLink, useNavigate } from "react-router-dom"
import { User } from "../../types"
import PositionedMenu from "../PositionedMenu/PositionedMenu"
import './Header.css'

type Props = {
    user?: User,
    setUser?: Function 
}

export default function Header({user, setUser}:Props){

    const navigate = useNavigate()
    function logout(){
        if(setUser){
            setUser(undefined)
            localStorage.removeItem("token")
            navigate('/')
        }
    }
    return (
        <header className={user? '' : 'hidden'} > 
            <div className="account">
                <h3>Hello {user?.firstName}</h3>
                <PositionedMenu logout={logout} />                
            </div>

            <nav>
                <ul>
                    <li>
                        <NavLink to={'/'}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/sleep'}>Sleep</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}