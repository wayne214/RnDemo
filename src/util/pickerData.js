import moment from 'moment';
import {isToday} from './index';

const dataArray = (monthAndDay, maxDateTime, minDateTime, weekArray, year,i, maxValue) => {
    for(let j=1;j<maxValue; j++){
        let da = `${year}-${i}-${j}`
        const currentTime = moment(da).format('x')
        if ((currentTime <= maxDateTime) && (currentTime >= minDateTime)) {
            var week = weekArray[new Date(da.replace(/-/g, '/')).getDay()]
            let obj = '0'.concat(i) + '月' + (j < 10 ? '0'.concat(j) : j) + '日' +week
            if(isToday(da.replace(/-/g, '/'))){
                monthAndDay.push('今天')
            } else {
                monthAndDay.push(obj);
            }
        }
    }
}


export const _initDateTimePikerData = () => {
    let years = [],
        months = [],
        days = [],
        hours = [],
        minutes = [];

    for(let i=1;i<51;i++){
        years.push(i+1980);
    }
    for(let i=1;i<13;i++){
        months.push(i);
        hours.push(i);
    }
    for(let i=1;i<32;i++){
        days.push(i);
    }
    for(let i=0;i<60;i++){
        // minutes.push(i);

        if(i%5 === 0) {
            minutes.push(i);
        }
    }

    let date = new Date();
    let year = date.getFullYear()
    let monthAndDay = []

    let maxDate = moment().add(1,'months').format('YYYY-MM-DD')
    let currentDate = '2020-4-9'
    let minDate = '2020-4-9'

    let currentTime = new Date(currentDate).getTime()
    let maxDateTime = new Date(maxDate).getTime()
    let minDateTime = new Date(minDate).getTime()

    console.log('---ddd--', maxDate, currentTime, maxDateTime, maxDateTime > currentTime)

    var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
    for(let i= 1; i<13; i++){
        if(i === 2) {
            if(year%4 === 0 && ((year % 100) !== 0) || ((year % 400) === 0)){
                for(let j=1;j<30; j++){
                    let da = `${year}-${i}-${j}`
                    let currentTime = new Date(da).getTime()
                    if ((currentTime <= maxDateTime) && (currentTime >= minDateTime)) {
                        var week = weekArray[new Date(da).getDay()]
                        let obj = '0'.concat(i) + '月' + (j < 10 ? '0'.concat(j) : j) + '日' +week
                        if(isToday(da)){
                            monthAndDay.push('今天')
                        } else {
                            monthAndDay.push(obj);
                        }
                    }
                }
            }else {
                for(let j=1;j<29; j++){
                    let da = `${year}-${i}-${j}`
                    let currentTime = new Date(da).getTime()
                    if ((currentTime <= maxDateTime) && (currentTime >= minDateTime)) {
                        var week = weekArray[new Date(da).getDay()]
                        let obj = '0'.concat(i) + '月' + (j < 10 ? '0'.concat(j) : j) + '日' +week
                        if(isToday(da)){
                            monthAndDay.push('今天')
                        } else {
                            monthAndDay.push(obj);
                        }
                    }
                }
            }
        } else {
            if (i in {4:1, 6:1, 9:1, 11:1}) {
                for(let j=1;j<31; j++){
                    let da = `${year}-${i}-${j}`
                    let currentTime = new Date(da).getTime()
                    if ((currentTime <= maxDateTime) && (currentTime >= minDateTime)) {
                        var week = weekArray[new Date(da).getDay()]
                        let obj = '0'.concat(i) + '月' + (j < 10 ? '0'.concat(j) : j) + '日' +week
                        if(isToday(da)){
                            monthAndDay.push('今天')
                        } else {
                            monthAndDay.push(obj);
                        }
                    }
                }
            } else {
                for(let j=1;j<32; j++){
                    let da = `${year}-${i}-${j}`
                    let currentTime = new Date(da).getTime()
                    if ((currentTime <= maxDateTime) && (currentTime >= minDateTime)) {
                        var week = weekArray[new Date(da).getDay()]
                        let obj = '0'.concat(i) + '月' + (j < 10 ? '0'.concat(j) : j) + '日' +week
                        if(isToday(da)){
                            monthAndDay.push('今天')
                        } else {
                            monthAndDay.push(obj);
                        }
                    }
                }
            }
        }
    }

    console.log('---dddd', monthAndDay, date.getFullYear());

    // let pickerData = [years, months, days, ['上午', '下午'], hours, minutes];
    // let selectedValue = [
    //     date.getFullYear(),
    //     date.getMonth()+1,
    //     date.getDate(),
    //     date.getHours() > 11 ? 'pm' : 'am',
    //     date.getHours() === 12 ? 12 : date.getHours()%12,
    //     date.getMinutes()
    // ];

    let pickerData = [monthAndDay, ['上午', '下午'], hours, minutes];

    return pickerData
}
