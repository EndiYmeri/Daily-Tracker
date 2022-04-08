import moment from "moment"
import { useEffect, useState } from "react"
import { User, UserDateInfo } from "../types"


type Props={
    user: User
}

type Stats = {
    mostTimeSlept: number,
    leastTimeSlept: number,
    mostTimeWorked: number,
    mostTimeTrained: number,
    mostTimeRelaxed: number,
    mostTimeHadFun: number
}
type StatsObj = {
    mostTimeSlept: {amount: number, user: Object},
    leastTimeSlept: {amount: number, user: Object},
    mostTimeWorked: {amount: number, user: Object},
    mostTimeTrained: {amount: number, user: Object},
    mostTimeRelaxed: {amount: number, user: Object},
    mostTimeHadFun: {amount: number, user: Object}
}

export default function Extra({user}:Props){
    const [users, setUsers] = useState<User[]>()
    const [stats, setStats] = useState<Stats>({
        leastTimeSlept:24,
        mostTimeHadFun:0,
        mostTimeWorked:0,
        mostTimeRelaxed:0,
        mostTimeSlept:0,
        mostTimeTrained:0
    })
    const [worldStats, setWorldStats] = useState<StatsObj>({
        leastTimeSlept:{amount: 24, user: {}},
        mostTimeHadFun:{amount:0, user:{}},
        mostTimeWorked:{amount:0, user:{}},
        mostTimeRelaxed:{amount:0, user:{}},
        mostTimeSlept:{amount:0, user:{}},
        mostTimeTrained:{amount:0, user:{}}
    })
    
    let maxSleepTime = {user: {}, amount: 0}
    let minSleepTime = {user: {}, amount: 24}
    let maxWorkTime = {user: {}, amount: 0}
    let maxFunTime = {user: {}, amount: 0}
    let maxRelaxTime = {user: {}, amount: 0}
    let maxTrainTime = {user: {}, amount: 0}

    function getRecordsFromUser(userChecked: User){
        userChecked.userDateInfo?.forEach(( dateInfo : UserDateInfo)=>{
            minSleepTime.amount > dateInfo.sleepTime ? ( minSleepTime.amount = dateInfo.sleepTime, minSleepTime.user = userChecked  ): null
            maxSleepTime.amount < dateInfo.sleepTime ? ( maxSleepTime.amount = dateInfo.sleepTime, maxSleepTime.user = userChecked ): null
            maxWorkTime.amount < dateInfo.workTime ? ( maxWorkTime.amount = dateInfo.workTime, maxWorkTime.user = userChecked  ): null
            maxFunTime.amount < dateInfo.funTime ? ( maxFunTime.amount = dateInfo.funTime, maxFunTime.user = userChecked  ): null
            maxRelaxTime.amount < dateInfo.relaxTime ? ( maxRelaxTime.amount = dateInfo.relaxTime, maxRelaxTime.user = userChecked  ): null
            maxTrainTime.amount < dateInfo.trainTime ? ( maxTrainTime.amount = dateInfo.trainTime, maxTrainTime.user = userChecked  ): null
        })
    }
    
    useEffect(()=>{
        getRecordsFromUser(user)
        setStats({
            ...stats, 
            mostTimeSlept:maxSleepTime.amount,
            leastTimeSlept: minSleepTime.amount,
            mostTimeHadFun: maxFunTime.amount,
            mostTimeWorked: maxWorkTime.amount,
            mostTimeRelaxed: maxRelaxTime.amount,
            mostTimeTrained: maxTrainTime.amount
        })
    },[])

    useEffect(()=>{
        fetch('http://localhost:5000/users').then(resp => resp.json()).then(data => setUsers(data) )

        users?.forEach((singleUser)=>{
            getRecordsFromUser(singleUser)
        })

        setWorldStats({
            ...worldStats,
            mostTimeSlept:{
                amount: maxSleepTime.amount,
                user: maxSleepTime.user
            },
            mostTimeWorked:{
                amount: maxWorkTime.amount,
                user: maxWorkTime.user
            },
            mostTimeRelaxed:{
                amount: maxRelaxTime.amount,
                user: maxRelaxTime.user
            },
            mostTimeHadFun: {
                amount: maxRelaxTime.amount,
                user: maxFunTime.user
            },
            mostTimeTrained:{
                amount: maxTrainTime.amount,
                user: maxTrainTime.user
            }
        })


    },[])

    const mostSleptDate = moment( user?.userDateInfo?.filter(dateinfo => dateinfo.sleepTime === stats.mostTimeSlept).pop()?.date.date)
    const leastSleptDate = moment( user?.userDateInfo?.filter(dateinfo => dateinfo.sleepTime === stats.leastTimeSlept).pop()?.date.date)
    const mostWorkedDate = moment( user?.userDateInfo?.filter(dateinfo => dateinfo.workTime === stats.mostTimeWorked).pop()?.date.date)
    const mostTrainedDate = moment( user?.userDateInfo?.filter(dateinfo => dateinfo.trainTime === stats.mostTimeTrained).pop()?.date.date)
    const mostRelaxedDate = moment( user?.userDateInfo?.filter(dateinfo => dateinfo.relaxTime === stats.mostTimeRelaxed).pop()?.date.date)
    const mostFunDate = moment( user?.userDateInfo?.filter(dateinfo => dateinfo.funTime === stats.mostTimeHadFun).pop()?.date.date)
    
    return(
        <>
            <div className="personal-stats">
                <h1>Personal Stats </h1>
                <h3>Most slept time: {stats.mostTimeSlept} hours, {mostSleptDate.fromNow()}</h3>
                {/* <h3>Least slept time: {stats.leastTimeSlept} hours, {leastSleptDate.fromNow()}</h3> */}
                <h3>Most worked time: {stats.mostTimeWorked} hours, {mostWorkedDate.fromNow()}</h3>
                {/* <h3>Most trained time: {stats.mostTimeTrained} hours, {mostTrainedDate.fromNow()}</h3> */}
                <h3>Most relaxed time: {stats.mostTimeRelaxed} hours, {mostRelaxedDate.fromNow()}</h3>
                <h3>Most had fun time: {stats.mostTimeHadFun} hours, {mostFunDate.fromNow()}</h3>
            </div>
            <div className="wordStats">
                <h1>World Stats </h1>
                {/* @ts-ignore */}
                <h3>Most slept time: {worldStats.mostTimeSlept.amount} hours, from {worldStats.mostTimeSlept.user.firstName}, {mostSleptDate.fromNow()}</h3>
                {/* @ts-ignore */}
                {/* <h3>Least slept time: {worldStats.leastTimeSlept.amount} hours, {leastSleptDate.fromNow()}, from {worldStats.leastTimeSlept.user.firstName}</h3> */}
                {/* @ts-ignore */}
                <h3>Most worked time: {worldStats.mostTimeWorked.amount} hours, from {worldStats.mostTimeSlept.user.firstName}, {mostWorkedDate.fromNow()}, </h3>
                {/* @ts-ignore */}
                {/* <h3>Most trained time: {worldStats.mostTimeTrained.amount} hours, from {worldStats.mostTimeSlept.user.firstName}, {mostTrainedDate.fromNow()}, </h3> */}
                {/* @ts-ignore */}
                <h3>Most relaxed time: {worldStats.mostTimeRelaxed.amount} hours, from {worldStats.mostTimeSlept.user.firstName}, {mostRelaxedDate.fromNow()}, </h3>
                {/* @ts-ignore */}
                <h3>Most had fun time: {worldStats.mostTimeHadFun.amount} hours, from {worldStats.mostTimeSlept.user.firstName}, {mostFunDate.fromNow()}, </h3>
            </div>
        </>
    )
}