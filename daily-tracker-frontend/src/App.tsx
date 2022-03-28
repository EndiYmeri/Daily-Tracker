import { useEffect, useState } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import {  BrowserRouter, Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import { User } from './types'
import SignUpPage from './Pages/SignUpPage'

function App() {
  const [user, setUser] = useState<User>()

  const navigate = useNavigate()

  useEffect(() => { 
    if(!localStorage.token) {
      setUser(undefined)
      navigate('/login')
    } else {
      fetch('http://localhost:4000/validate',{
        method:"GET",
        headers:{
          'Authorization': localStorage.token
        }
      })
      .then(resp => resp.json())
      .then(data =>{
        if (data.error ){
          console.log(data)
        } else {
          setUser(data)
        }

      })
    }
  },[])  
  

  return (
    <div className="App">
      <Header user={user} setUser={setUser}/>
        <Routes>
                <Route path='/'  element={ <HomePage user={user} /> }/>
                <Route path='/login' element={ <LoginPage setUser={setUser} /> }/>
                <Route path='/sign-up' element={ <SignUpPage setUser={setUser} /> }/>
        </Routes>
      <Footer/>
    </div>
  )
}

export default App