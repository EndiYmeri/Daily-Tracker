export type User = {
    id:number
    firstName: string
    lastName: string,
    email: string,
    username: string
    password: string
    avatarImg: string
    gender: string
    dates? : Date[]
    userDataInfo? :[]
}
export type Date = { 
    id:number
    date: string
    users: User[]
    userDateInfo: UserDateInfo[]
}

export type UserDateInfo = {
    id: number
    sleepTime: number
    user: User
    userId: number
    date: Date
}

export type PieChartData = {
        name: string,
        value: number
}