import { useEffect, useState } from "react"
import moment from "moment";
import { User, DateRangeType } from "../../types"
import ActionButton from "../ActivityButton/ActionButton"
import MainChartSection from "../MainChartSection/MainChartSection"
import InputModal from "../Modals/InputModal"

type Props = {
    user : User,
    setUser: Function
}



export default function Home({user, setUser}:Props){
    const [mainChart, setMainChart] = useState< "pieChart" | "lineChart" >( "pieChart" )
    const [inputModal, setInputModal ] = useState(false)
    const [minDate, setMinDate] = useState ( moment(new Date(`2022/03/01`), 'DD/MM/YYYY'))
    const [maxDate, setMaxDate] = useState( moment(new Date(),'DD/MM/YYYY'))
    const [dateRange, setDateRange] = useState< DateRangeType >({
        earliestDay: getDateElement("day", "min"),
        earliestMonth:getDateElement("month", "min"),
        earliestYear:getDateElement("year", "min"),
        latestDay:getDateElement("day", "max"),
        latestMonth:getDateElement("month", "max"),
        latestYear:getDateElement("year", "max"),
    })
    function getDateElement(element:"day"|"month"|"year" , minOrMax: "max" | "min" ) : string {
        let index1 : number
        let index2 : number
        if(element === "day"){
            index1 = 8
            index2 = 10
        } else if (element === "month"){
            index1 = 5
            index2 = 7
        } else {
            index1 = 0
            index2 = 4
        }
        if(minOrMax === "max"){
                const result = user?.userDateInfo?.map(dateInfo => dateInfo.date).sort().reverse()[0].date.slice(index1, index2)
                return result? result : ""
        }else {
                const result = user?.userDateInfo?.map(dateInfo => dateInfo.date).sort()[0].date.slice(index1, index2)
                return result? result : ""  
        }
    }

    useEffect(()=>{
        //Get latest and earliest days available for user
            setMinDate(moment(new Date(`${dateRange.earliestYear}/${dateRange.earliestMonth}/${dateRange.earliestDay}`)))
            setMaxDate(moment(new Date(`${dateRange.latestYear}/${dateRange.latestMonth}/${dateRange.latestDay}`)))
    },[user])

    const openModal = ()=>{
        setInputModal(true)
    }

    return (
        <div className="home-page">
            <main>
            {inputModal && <InputModal minDate={maxDate.add(23, "hours")} setInputModal={setInputModal} user={user} setUser={setUser} />}
                <h1>Welcome {user?.firstName}</h1>
                <h3>Here is your last input on your activites</h3>
                <MainChartSection user={user} mainChart={mainChart} maxDate={maxDate} minDate={minDate} dateRange={dateRange} />               
            </main>
            <aside>
                <ActionButton type={"chartDisplay"} action={setMainChart} />
                <ActionButton type={"inputModal"} action={openModal} />
            </aside>
        </div>
    )

}