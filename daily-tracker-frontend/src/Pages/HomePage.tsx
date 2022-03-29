import ActivityButton from "../Components/ActivityButton/ActivityButton"
import PieChartComp from "../Components/Charts/PieChart"
import { User } from "../types"

type Props = {
    user? : User
}

export default function HomePage({user}:Props){

    return (
        <div className="home-page">
            <main>
                <h1>Welcome Endi!</h1>
                <p> Ready to start tracking your day </p>
                <h3>Here are your activities for the last date</h3>   
                <PieChartComp/>
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