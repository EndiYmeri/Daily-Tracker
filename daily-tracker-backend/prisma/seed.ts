import { Prisma, PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient({log:["error","info","query","warn"]})

const dateTimeEnding = "T00:00:00.000Z"

const users : Prisma.UserCreateInput[] = [
    {
        firstName: "Endi",
        lastName: "Ymeri",
        email:"endiymeri20@gmail.com",
        password: bcryptjs.hashSync('1998', 8),
        username: "ndymeri",
        dateOfBirth: "1998-06-19" + dateTimeEnding,
        gender: "Male",
        avatarImg: "robohash.com/ND",
        joinedAt: "2022-03-30"+ dateTimeEnding
    },
    {
        firstName: "Endi",
        lastName: "Ymeri",
        email:"endiymeri98@gmail.com",
        password: bcryptjs.hashSync('1998', 8),
        username: "endiymeri",
        dateOfBirth: "1998-06-19" + dateTimeEnding,
        gender: "Male",
        avatarImg: "robohash.com/ND",
        joinedAt: "2022-03-30"+ dateTimeEnding
    },
]

const dates : Prisma.DateCreateInput[] = [
    {
        date: "2022-03-23" + dateTimeEnding
    },
    {
        date: "2022-03-24" + dateTimeEnding
    },
    {
        date: "2022-03-25" + dateTimeEnding
    },
    {
        date: "2022-03-26" + dateTimeEnding
    },
    {
        date: "2022-03-27" + dateTimeEnding
    },
    {
        date: "2022-03-28" + dateTimeEnding
    },
    {
        date: "2022-03-29" + dateTimeEnding
    },
    {
        date: "2022-03-30" + dateTimeEnding
    },
]

const userDateInfos: Prisma.UserDateInfoCreateInput[] = [
    {
        sleepTime: 8,
        workTime: 6,
        physicalActivityTime: 2,
        brainActivityTime: 2,
        learningTime: 2,
        relaxTime: 2,
        funTime: 2,
        user: {connect: {id : 1}},
        date: {connect: {id : 1}},
    },
    {
        sleepTime: 8.5,
        workTime: 5.5,
        physicalActivityTime: 2,
        brainActivityTime: 2,
        learningTime: 2,
        relaxTime: 2,
        funTime: 2,
        user: {connect: {id : 1}},
        date: {connect: {id : 2}},
    },
    {
        sleepTime: 7,
        workTime: 6,
        physicalActivityTime: 2,
        brainActivityTime: 2,
        learningTime: 2,
        relaxTime: 2,
        funTime: 1,
        user: {connect: {id : 1}},
        date: {connect: {id : 3}},
    },
    {
        sleepTime: 9,
        workTime: 6,
        physicalActivityTime: 2,
        brainActivityTime: 1,
        learningTime: 1,
        relaxTime: 3,
        funTime: 2,
        user: {connect: {id : 1}},
        date: {connect: {id : 4}},
    },
    {
        sleepTime: 8,
        workTime: 6,
        physicalActivityTime: 2,
        brainActivityTime: 2,
        learningTime: 2,
        relaxTime: 2,
        funTime: 2,
        user: {connect: {id : 1}},
        date: {connect: {id : 5}},
    },
    {
        sleepTime: 8,
        workTime: 6,
        physicalActivityTime: 2,
        brainActivityTime: 2,
        learningTime: 2,
        relaxTime: 2,
        funTime: 2,
        user: {connect: {id : 1}},
        date: {connect: {id: 6} } 
    },
    {
        sleepTime: 8,
        workTime: 6,
        physicalActivityTime: 2,
        brainActivityTime: 2,
        learningTime: 2,
        relaxTime: 2,
        funTime: 2,
        user: {connect: {id : 1}},
        date: {connect: {id : 7}},
    },
    {
        sleepTime: 8,
        workTime: 6,
        physicalActivityTime: 3,
        brainActivityTime: 2,
        learningTime: 2,
        relaxTime: 2,
        funTime:1,
        user: {connect: {id : 1}},
        date: {connect: {id : 8}},
    },
]

async function createSeed(){
    
    for(const user of users){
        await prisma.user.create({
            data: user
        })
    }

    for(const date of dates){
        await prisma.date.create({
            data: date    
        })
    }

    for(const userDateInfo of userDateInfos){
        await prisma.userDateInfo.create({
            data: userDateInfo
        })
    }
}

createSeed()