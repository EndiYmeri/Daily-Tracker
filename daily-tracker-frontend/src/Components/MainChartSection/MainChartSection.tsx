import moment from "moment";
import { useEffect, useState } from "react"
import { User } from "../../types"
import LineChartSection from "./LineChartSection";
import PieChartSection from "./PieChartSection";


type Props={
    user: User,
    mainChart: "lineChart" | "pieChart"
}

export type DateRangeType = {
        latestDay: string,
        latestMonth: string,
        latestYear: string,
        earliestDay: string,
        earliestMonth: string,
        earliestYear:string
}


export default function MainChartSection({user, mainChart}:Props){
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
    },[])
   
    return(
        <>  
            {
                mainChart === "pieChart" 
                && <PieChartSection 
                        dateRange={dateRange} 
                        minDate={minDate} 
                        maxDate={maxDate} 
                    />
            }
            {
                mainChart === "lineChart" 
                && dateRange 
                && <LineChartSection 
                        dateRange={dateRange} 
                        minDate={minDate} 
                        maxDate={maxDate} 
                    /> 
            }
        </>
    )
}