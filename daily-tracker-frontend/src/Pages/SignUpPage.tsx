import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginForm from "../Components/LoginForm/LoginForm";

type SignUpData ={
    email: string,
    password: string
 }

type Props = {
    setUser : Function
}

export default function SignUp({setUser}:Props){
    const [wrongCredentials, setWrongCredentials] = useState(false)
    
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.token){
            navigate('/')
        }
    },[])

    function signUp(SignUpData: SignUpData){
        fetch('http://localhost:4000/login',{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(SignUpData)
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
                <LoginForm login={signUp} title="Sign up"/>
            </div>
        </div>
      );
}