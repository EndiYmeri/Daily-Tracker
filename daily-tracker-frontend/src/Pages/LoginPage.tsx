import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginForm from "../Components/LoginForm/LoginForm";

type LoginData ={
    email: string,
    password: string
 }

type Props = {
    setUser : Function
}

export default function LoginPage({setUser}:Props){
    const [wrongCredentials, setWrongCredentials] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.token){
            navigate('/')
        }
    },[])

    function login(loginData: LoginData){
        fetch('http://localhost:5000/login',{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email: loginData.email,
                password: loginData.password
            })
        })
        .then( resp => resp.json())
        .then(data => {
            if(data.user){
                setWrongCredentials(false)
                setUser(data.user)
                localStorage.setItem("token", data.token)
                navigate('/')
            }else{
                setWrongCredentials(true)
                
            }
        })
    }
    return (
        <div className="login-page">
            <div className="login-content">
                <LoginForm submitFunc={login} title="Log in"/>
            </div>
        </div>
      );
}