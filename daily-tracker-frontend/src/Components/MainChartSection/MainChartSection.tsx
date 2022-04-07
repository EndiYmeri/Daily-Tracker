import moment from "moment";
import { User, DateRangeType } from "../../types"
import LineChartSection from "./LineChartSection";
import PieChartSection from "./PieChartSection";

type Props={
    user: User,
    mainChart: "lineChart" | "pieChart",
    minDate: moment.Moment,
    maxDate: moment.Moment,
    dateRange: DateRangeType
} 

export default function MainChartSection({user, mainChart, minDate, maxDate, dateRange}:Props){
   
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