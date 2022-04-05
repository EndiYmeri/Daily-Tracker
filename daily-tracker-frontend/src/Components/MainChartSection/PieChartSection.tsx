import { DatePicker, LocalizationProvider } from "@mui/lab";
import PieChartComp from "../Charts/PieChartComp";
import { DateRangeType } from "./MainChartSection";
import AdapterDateFns from '@mui/lab/AdapterMoment';
import { useEffect, useState } from "react";
import moment from "moment";
import { TextField } from "@mui/material";
import { PieChartData } from "../../types";
import { getMonthString, getDateString } from "../../helperFunc";


type Props = {
    dateRange: DateRangeType,
    minDate: moment.Moment
    maxDate: moment.Moment
}


export default function PieChartSection({dateRange, maxDate, minDate}:Props){
    const [pieChartData, setPieChartData] = useState < PieChartData[] >()
    const [dateValue, setDateValue] = useState( moment(new Date(), 'DD/MM/YYYY'))
    const [dateSelected, setDateSelected ] = useState<string>()
    const [dateInfoFound, setDateInfoFound ] = useState(true) 

    useEffect(()=>{
        // Set The selected the latest date as default date for pieChart
        setDateSelected(`${dateRange.latestYear}-${dateRange.latestMonth}-${dateRange.latestDay}`)
        // Set DatePicker default date to the latest date
        setDateValue(moment( new Date(`${dateRange.latestYear}/${dateRange.latestMonth}/${dateRange.latestDay}`)))
    },[])

    useEffect(()=>{
        fetch(`http://localhost:5000/date/?singleDate=${dateSelected}`,{
            method:"GET",
            headers:{
              'Authorization': localStorage.token
            }
        })
        .then(resp => resp.json())
        .then(dataFetched =>{
            if(!dataFetched.error){
                setDateInfoFound(true)
                setPieChartData([
                    { name: "Sleep", value: dataFetched.userDateInfo[0].sleepTime            },
                    { name: "Work",  value: dataFetched.userDateInfo[0].workTime             },
                    { name: "Learn", value: dataFetched.userDateInfo[0].learningTime         },
                    { name: "Train", value: dataFetched.userDateInfo[0].physicalActivityTime },
                    { name: "Brain", value: dataFetched.userDateInfo[0].brainActivityTime    },
                    { name: "Relax", value: dataFetched.userDateInfo[0].relaxTime            },
                    { name: "Fun",   value: dataFetched.userDateInfo[0].funTime              }
                ])
            } else { setDateInfoFound(false) }
        })
    },[dateSelected])


    return <>
         <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Select Date"
                    value={dateValue}
                    minDate = {minDate}
                    maxDate = {maxDate}
                    onChange={(newValue) => {
                        if(newValue){
                            setDateValue(newValue)
                            setDateSelected(
                                // @ts-ignore
                                `${newValue.year()}-${getMonthString(newValue.month())}-${getDateString(newValue.date())}`
                            )
                        }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                
        </LocalizationProvider>
        
        {pieChartData && <PieChartComp data = {pieChartData} /> }
    </>
}