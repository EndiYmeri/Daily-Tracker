import express, { query } from 'express'
import cors from 'cors'
import bcryptjs from 'bcryptjs'
import jwt, { Secret } from 'jsonwebtoken'
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'


// @ts-ignore
const secret : Secret = process.env.notMySecret

const prisma = new PrismaClient({log:["error","info","query","warn"]})

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 4000

const createTokenFromUser = (id: number)=>{
    const token =  jwt.sign( {id}, secret)
    return token
}

const getUserFromToken = async (token:string)=>{
    const data = jwt.verify(token, secret)
    const user = await prisma.user.findUnique({ 
        // @ts-ignore
        where: { id : data.id},
        include:{
           userDateInfo:{ include: { date:true }}
        }
    })
    return user
}   

app.get('/validate', async (req, res) => {
    const token = req.headers.authorization || ''
    try {
        const user = await getUserFromToken(token)
        if (user) {
            res.status(200).send(user)
        } else {
            res.status(404).send({ error: 'Token invalid' })
        }
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.get('/',async (req, res) => {
})

app.post('/users',async (req, res) => {
    const { firstName, lastName, password, username, email, avatarImg, dateOfBirth, gender } = req.body
    try{
        const hash = bcryptjs.hashSync(password, 8)
        const user = await prisma.user.create({
            data:{
                firstName,
                lastName,
                email,
                password: hash,
                username,
                avatarImg,
                dateOfBirth,
                gender
            }
        })
        if(user){
            const token = createTokenFromUser(user.id)
            res.send({user, token})
        }
        else{
            throw Error
        }

    }catch(err){
        // @ts-ignore
        res.status(400).send({error: err.message})
    }
})

app.post('/login',async (req, res)  => {
    const {email, password} = req.body
    try{
        const user = await prisma.user.findUnique({
            where: {email}
        })
        if(user){
            const passwordMatches = bcryptjs.compareSync(password, user.password)
            passwordMatches
            if(passwordMatches){
                const token =  createTokenFromUser(user.id)
                res.send({user,token})
            } else { res.status(400).send({ error: "Password doesn't match" })}
        } else { res.status(400).send({ error: "Email doesn't match" })}
    }catch(err){
          //@ts-ignore
          res.status(400).send({ error: err.message })
    }
 })

app.post('user/:username/date-info', async (req, res) => {
    const token = req.headers.authorization || ''
    const {sleepTime, date, workTime, brainActivityTime, physicalActivityTime, learningTime } = req.body
    try{
       const user = await getUserFromToken(token)
       if(user){
            const dateInfo = await prisma.userDateInfo.create({
                data:{
                    sleepTime,
                    workTime,
                    brainActivityTime,
                    physicalActivityTime,
                    learningTime,
                    user:{
                        connect:{
                            email: user.email
                        }
                    },
                    date:{
                        connectOrCreate:{
                            where: { date },
                            create:{ date }
                        }
                    }
                },
            })
            if(dateInfo){
                res.send(dateInfo)
            }else{ throw Error }
        }else{ throw Error }


    }catch(err){
        // @ts-ignore
        res.status(400).send({error: err.message})
    }
})


app.post('/follow-request', async (req, res) => {
    const token = req.headers.authorization || ''
    const username = req.body.username
    try{
        const fromUser = await getUserFromToken(token)
        const toUser = await prisma.user.findUnique({ where: {username}})
        if(fromUser && toUser){
            const followingUpdated = await prisma.following.create({
                data:{
                    userId: toUser.id
                }
            })
            const followersUpdated = await prisma.followers.create({
                data: {
                    userId : fromUser.id
                }
            })
            res.send({message: "Follow request send successfully"})
        } else { throw Error}
        
    }catch(err){
        // @ts-ignore
        res.status(400).send({error: err.message})
    }
})


app.get('/date/',async (req, res) => {
    const token = req.headers.authorization || ''
    const {year, month, day} = req.query
    // 2022-04-31T00:00:00.000Z
    const dateTimeEnding = "T00:00:00.000Z"
    let begginingDate = ''
    let endingDate = ''
    let date = ''
    let nextYear = Number(year) 
    let nextMonth = Number(month)
    if(year){
        begginingDate = `${year}-01-01` + dateTimeEnding
        endingDate = `${nextYear + 1}-01-01` + dateTimeEnding
        if(month) {
            if(month === "12"){
                nextMonth = 1,
                nextYear++
            }else{
                nextMonth++
            }

            begginingDate = `${year}-${month}-01` + dateTimeEnding


            endingDate = nextMonth >= 10 
            ? `${nextYear}-${nextMonth}-01` + dateTimeEnding
            : `${nextYear}-0${nextMonth}-01` + dateTimeEnding
            
            
            if(day){
                date = `${year}-${month}-${day}`+ dateTimeEnding
                
            }
        }
    }
    try{
        const user = await getUserFromToken(token)
        if(user){
            if(day){
                const dateInfo = await prisma.date.findUnique({
                    where: { date:date },
                    include:{ userDateInfo: { where: {userId : user.id }}}
                }) 
                res.send(date)
            }else{
                const dateInfo = await prisma.date.findMany({
                    include: { userDateInfo: { where: { userId : user.id }}},
                    where:{
                        date:{
                            gte: begginingDate,
                            lt: endingDate
                        }
                    }
                })
                res.send(date)
            }
        }
    }catch(err){
        // @ts-ignore
        res.status(400).send({error: err.message})
    }
})
app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}`)) 