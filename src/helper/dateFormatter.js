
export function dateTostring(date){
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-CA', options);
    return formattedDate;
}


export function stringToDate(){

}