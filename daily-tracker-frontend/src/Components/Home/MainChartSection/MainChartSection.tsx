import { DatePicker, LocalizationProvider } from "@mui/lab"
import AdapterDateFns from '@mui/lab/AdapterMoment';
import { TextField } from "@mui/material"
import moment from "moment";
import { useEffect, useState } from "react"
import { PieChartData } from "../../../types"
import PieChartComp from "../../Charts/PieChart"

type DaleSelected = {
    date: string
    month: string
    year: string
}

let currentTime = new Date()


function getDateString(theDate: number){
    if(theDate < 9){
       return( "0" + String(theDate) )
    }else{
        return (String(theDate))
    }
}
function getMonthString(theDate: number){
    if(theDate < 9){
       return( "0" + String(theDate + 1) )
    }else{
        return (String(theDate + 1))
    }
}

export default function MainChartSection(){

    const [dateValue, setDateValue] = useState<Date | null>()
    const [pieChartData, setPieChartData] = useState< PieChartData[]>()
    const [dateSelected, setDateSelected ] = useState< DaleSelected >(
        {
            date: getDateString(currentTime.getDate()),
            month: getMonthString(currentTime.getMonth()),
            year: String(currentTime.getUTCFullYear())  
        }
    )
    useEffect(()=>{
        fetch(`http://localhost:5000/date/?year=${dateSelected?.year}&month=${dateSelected?.month}&day=${dateSelected?.date}`,{
            method:"GET",
            headers:{
              'Authorization': localStorage.token
            }
        })
        .then(resp => resp.json())
        .then(dataFetched =>{
            if(!dataFetched.error){
                    setPieChartData([
                        {
                            name: "Sleep",
                            value: dataFetched.userDateInfo[0].sleepTime
                        },
                        {
                            name: "Work",
                            value: dataFetched.userDateInfo[0].workTime
                        },
                        {
                            name: "Learn",
                            value: dataFetched.userDateInfo[0].learningTime
                        },
                        {
                            name: "Train",
                            value: dataFetched.userDateInfo[0].physicalActivityTime
                        },
                        {
                            name: "Brain",
                            value: dataFetched.userDateInfo[0].brainActivityTime
                        },
                        {
                            name: "Relax",
                            value: dataFetched.userDateInfo[0].relaxTime
                        },
                        {
                            name:"Fun",
                            value: dataFetched.userDateInfo[0].funTime
                        }
                    ])
            }
        })

    },[dateSelected])

    return(
        <>  
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Basic example"
                    value={dateValue}
                    onChange={(newValue) => {
                        setDateValue(newValue)
                        setDateSelected({
                            // @ts-ignore
                            date : getDateString(newValue._d.getDate()),
                            // @ts-ignore
                            month: getMonthString(newValue._d.getMonth()),
                            // @ts-ignore
                            year: newValue._d.getFullYear()
                        })
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <PieChartComp data={pieChartData}/>
        </>
    )
}