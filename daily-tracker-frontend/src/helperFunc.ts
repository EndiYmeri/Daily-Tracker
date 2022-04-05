
export const  getDateString =(theDate: number) => {
    if(theDate < 9){
       return( "0" + String(theDate) )
    }else{
        return (String(theDate))
    }
}
export  const getMonthString = (theDate: number) => {
    if(theDate < 9){
       return( "0" + String(theDate + 1) )
    }else{
        return (String(theDate + 1))
    }
}