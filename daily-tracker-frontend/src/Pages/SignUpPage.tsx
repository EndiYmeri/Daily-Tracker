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
        fetch('http://localhost:5000/users',{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(SignUpData)
        })
        .then( resp => resp.json())
        .then(data => {
            if(data.user){
                setUser(data.user)
                localStorage.setItem("token", data.token)
                navigate('/')
            }else{
                console.log(data)
            }
        })
    }
    return (
        <div className="login-page">
            <div className="login-content">
                <LoginForm submitFunc={signUp} title="Sign up"/>
            </div>
        </div>
      );
}