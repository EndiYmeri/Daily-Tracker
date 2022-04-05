import AdapterDateFns from '@mui/lab/AdapterMoment';
import { DatePicker, LocalizationProvider } from "@mui/lab"
import moment from "moment"
import { useEffect, useState } from "react"
import { LineChartDateInfo } from "../../types"
import LineChartComp from "../Charts/LineChart"
import { DateRangeType } from "./MainChartSection"
import { TextField } from '@mui/material';
import { getMonthString, getDateString } from "../../helperFunc";


type Props = {
    dateRange: DateRangeType,
    minDate: moment.Moment
    maxDate: moment.Moment
}


export default function LineChartSection({dateRange, minDate, maxDate}:Props){
    const [lineChartData, setLineChartData] = useState < LineChartDateInfo[] >()
    const [begginingDate, setBegginingDate] = useState(`${dateRange.earliestYear}-${dateRange.earliestMonth}-${dateRange.earliestDay}`)
    const [endingDate, setEndingDate] = useState(`${dateRange.latestYear}-${dateRange.latestMonth}-${dateRange.latestDay}`)
    const [begginingDateValue, setBegginingDateValue] = useState<moment.Moment>()
    const [endingDateValue, setEndingDateValue] = useState<moment.Moment>()
    const [dateInfoFound, setDateInfoFound] = useState(true)

    useEffect(()=>{
        setBegginingDateValue(moment(new Date(begginingDate)))
        setEndingDateValue(moment(new Date(endingDate)))
    },[])

    useEffect(()=>{
       fetch(`http://localhost:5000/date/?begginingDate=${begginingDate}&endingDate=${endingDate}`,{
            method:"GET",
            headers:{
              'Authorization': localStorage.token
            }
        })
        .then(resp => resp.json())
        .then(dataFetched =>{
            if(!dataFetched.error){
                setDateInfoFound(true)
                let dataFound = dataFetched.map((data:any) => {
                    console.log(data);
                    let date = moment(new Date(data.date)).format("DD/MM")
                    return {
                            Date: date,
                            Sleep:data.userDateInfo[0].sleepTime,
                            Work:data.userDateInfo[0].workTime,
                            Fun:data.userDateInfo[0].funTime,
                            Learn:data.userDateInfo[0].learningTime,
                            Relax:data.userDateInfo[0].relaxTime,
                            Train :data.userDateInfo[0].physicalActivityTime,
                            Brain:data.userDateInfo[0].brainActivityTime,
                        }
                })
                setLineChartData(dataFound)
            } else { setDateInfoFound(false) }
        })

    },[begginingDate, endingDate])


    return  <>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Select beggining date"
                    value={begginingDateValue}
                    minDate = {minDate}
                    maxDate = {maxDate}
                    onChange={(newValue) => {
                        if(newValue){
                            setBegginingDateValue(newValue)
                            setBegginingDate(
                                // @ts-ignore
                                `${newValue.year()}-${getMonthString(newValue.month())}-${getDateString(newValue.date())}`
                            )
                        }
                    }}

                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    label="Select ending date"
                    value={endingDateValue}
                    minDate = {minDate}
                    maxDate = {maxDate}
                    onChange={(newValue) => {
                        if(newValue){
                            setEndingDateValue(newValue)
                            setEndingDate(
                                // @ts-ignore
                                `${newValue._d.getFullYear()}-${getMonthString(newValue._d.getMonth())}-${getDateString(newValue._d.getDate())}`
                            )
                        }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                
            </LocalizationProvider>
                {        lineChartData && <LineChartComp lineChartData={lineChartData}/>}
            </>
}