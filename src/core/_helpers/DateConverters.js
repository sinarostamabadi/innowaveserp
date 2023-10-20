import moment from "jalali-moment";
import MomentJalali from 'moment-jalali'
export const DateObjToDate = (dateObj) => {
    if(!dateObj) return null;

    return dateObj.year + "/" + dateObj.month + "/" + dateObj.day;
}

export const FaObjToEnDateTime = (dateObj) => {
    if(!dateObj) return null;

    let persianDate = moment.from(DateObjToDate(dateObj),process.env.REACT_APP_DATE, "YYYY/MM/DD");
    return persianDate.locale("en").format("YYYY-MM-DDTHH:mm:ss");
}

export const EnToFaObjDateTime = (date) => {
    if(!date) return null;

    let persianDate = moment.from(date, "en", "YYYY-MM-DDTHH:mm:ss");
    return {year: +persianDate.format("YYYY"), month: +persianDate.format("MM"), day: +persianDate.format("DD")}
}

export const EnToFaObjDate = (date) => {
    if(!date) return null;
    
    let persianDate = moment.from(date, "en", "YYYY-MM-DDTHH:mm:ss").locale(process.env.REACT_APP_DATE);
    return {year: +persianDate.format("YYYY"), month: +persianDate.format("MM"), day: +persianDate.format("DD")}
}

export const FaToFaObjDate = (date) => {
    if(!!date == false)
    return null;
    
    let persianDate = moment.from(date, process.env.REACT_APP_DATE, "YYYY-MM-DD").locale(process.env.REACT_APP_DATE);
    return {year: +persianDate.format("YYYY"), month: +persianDate.format("MM"), day: +persianDate.format("DD")}
}

export const EnToFaDate = (date) => {
    if(!date) return null;

    let persianDate = moment.from(date);
    return persianDate.locale(process.env.REACT_APP_DATE).format("YYYY-MM-DD");
}

export const EnToFaDateTime = (date) => {
    if(!date) return null;

    let persianDate = moment.from(date);
    return persianDate.locale(process.env.REACT_APP_DATE).format("YYYY-MM-DD HH:mm");
}

export const EnToFaDateSlash = (date) => {
    if(!date) return null;

    let persianDate = moment.from(date);
    return persianDate.locale(process.env.REACT_APP_DATE).format("YYYY/MM/DD");
}

export const EnToFaDateTimeSlash = (date) => {
    if(!date) return null;

    let persianDate = moment.from(date);
    return persianDate.locale(process.env.REACT_APP_DATE).format("YYYY/MM/DD HH:mm");
}



export const EnToFaObject=(date)=>{
   return MomentJalali(date).format("jYYYY-jMM-jDD")
}