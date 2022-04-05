import { useEffect, useState } from 'react'
import './ActionButton.css'

type Props ={
    type?: "chartDisplay",
    action: Function
}

export default function ActionButton({type, action}:Props){

    const [title, setTitle] = useState("")

    function actionTodo(){
      if(type === "chartDisplay"){
          title === "View range of dates" 
          ? ( setTitle( "View single date" ), action( "lineChart" ))
          : ( setTitle( "View range of dates" ),  action( "pieChart" ))  
      }
    }

    useEffect(()=>{
        if(type === "chartDisplay"){
            setTitle("View range of dates")
        }
    },[])

    return (
        <div 
            className="action-button"
            onClick={()=>{
                actionTodo()
            }}
        >
            <h1>{title}</h1>
        </div>
    )
}