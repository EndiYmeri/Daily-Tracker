import { useEffect, useState } from "react"
import ActionButton from "../Components/ActivityButton/ActionButton"
import MainChartSection from "../Components/MainChartSection/MainChartSection"
import { PieChartData, User } from "../types"

type Props = {
    user : User
}


export default function HomePage({user}:Props){

    const [mainChart, setMainChart] = useState< "pieChart" | "lineChart" >("pieChart")
    
    return (
        <div className="home-page">
            <main>
                <h1>Welcome {user?.firstName}</h1>
                <h3>Here is your last input on your activites</h3>

                <MainChartSection user={user} mainChart={mainChart} />               
            </main>
            <aside>
                <ActionButton type={"chartDisplay"} action={setMainChart} />
                <ActionButton action={setMainChart} />
                <ActionButton action={setMainChart} />
                <ActionButton action={setMainChart} />
            </aside>
        </div>
    )

}