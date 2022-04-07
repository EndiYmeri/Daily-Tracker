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
    userDateInfo? :UserDateInfo[]
}
export type Date = { 
    id:number
    date: string
    users?: User[]
    userDateInfo: UserDateInfo[]
}

export type UserDateInfo = {
    id: number
    sleepTime: number
    workTime: number,
    funTime: number,
    relaxTime: number,
    learnTime: number,
    trainTime: number,
    brainTime: number,
    user: User
    userId: number
    date: Date
}

export type PieChartData = {
        name: string,
        value: number
}

export type LineChartDateInfo = {
    Date: string
    Sleep: number
    Work: number,
    Fun: number,
    Relax: number,
    Learn: number,
    Train: number,
    Brain: number
}

export type DateRangeType = {
    latestDay: string,
    latestMonth: string,
    latestYear: string,
    earliestDay: string,
    earliestMonth: string,
    earliestYear:string
}