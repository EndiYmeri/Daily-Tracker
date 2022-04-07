import { useEffect, useState } from "react"
import ActionButton from "../Components/ActivityButton/ActionButton"
import Home from "../Components/Home/Home"
import MainChartSection from "../Components/MainChartSection/MainChartSection"
import { PieChartData, User } from "../types"

type Props = {
    user : User,
    setUser: Function
}



export default function HomePage({user, setUser}:Props){
    const [mainChart, setMainChart] = useState< "pieChart" | "lineChart" >("pieChart")
    return (
       <Home user={user} setUser={setUser}/>
    )
}