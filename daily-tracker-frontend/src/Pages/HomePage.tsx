import { useEffect, useState } from "react"
import ActivityButton from "../Components/ActivityButton/ActivityButton"
import PieChartComp from "../Components/Charts/PieChart"
import MainChartSection from "../Components/Home/MainChartSection/MainChartSection"
import { PieChartData, User } from "../types"

type Props = {
    user? : User
}

export default function HomePage({user}:Props){

   
    return (
        <div className="home-page">
            <main>
                <h1>Welcome {user?.firstName}</h1>
                <p> Ready to start tracking your day </p>
                <h3>Here are your activities for the last date</h3>

               <MainChartSection />
            </main>
            <aside>
                <ActivityButton/>
                <ActivityButton/>
                <ActivityButton/>
                <ActivityButton/>
            </aside>
        </div>
    )

}