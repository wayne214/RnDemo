import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
import Picker from 'react-native-picker'

import moment from 'moment';

import {isToday} from '../util'
import {_initDateTimePikerData} from '../util/pickerData'

class DatePickerViews extends Component{

    componentDidMount(): void {
    }

    _createDateData =()=> {
        let date = [];
        for(let i=1970;i<2020;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    }


    _dateFormatArray = (i, j, weekArray, maxDateTime, minDateTime) => {
        let monthAndDay = []
        let da = `2020-${i}-${j}`
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

        return monthAndDay
    }

    _showTimePicker =()=> {
        let date = new Date();
        let year = date.getFullYear()
        let selectedValue = [
            '今天',
            date.getHours() > 11 ? '下午' : '上午',
            date.getHours() === 12 ? 12 : date.getHours()%12,
            date.getMinutes()
        ];

        const pickerData = _initDateTimePikerData()

        Picker.init({
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerConfirmBtnColor: [255,92,93,1],
            pickerCancelBtnColor: [46,46,46,1],
            pickerBg: [255, 255, 255, 1],
            pickerToolBarBg: [255, 255, 255, 1],
            pickerData,
            selectedValue,
            pickerTitleText: '',
            wheelFlex: [2, 1, 1, 1],
            onPickerConfirm: pickedValue => {
                console.log('area', pickedValue);
                const date = pickedValue[0]

                let dateString = ''
                if (date === '今天'){
                    dateString = moment().format('YYYY-MM-DD')
                } else {
                    const monthAndDay = date.substring(0,date.length - 2)
                    const dataArray = monthAndDay.split('月')
                    const month = dataArray[0]
                    const day = dataArray[1].substring(0, dataArray[1].length - 1)
                    dateString = 2020 + '-' + month + '-' + day
                }

                const hour = pickedValue[1] === '上午' ? pickedValue[2] : pickedValue[2] + 12

                let hours = hour < 10 ? '0'.concat(hour) : hour
                let minutes = pickedValue[3] < 10 ? '0'.concat(pickedValue[3]) : pickedValue[3]


                console.log('---日期--', dateString, hours, minutes )



            },
            onPickerCancel: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                let targetValue = [...pickedValue];
                // if(parseInt(targetValue[1]) === 2){
                //     if(targetValue[0]%4 === 0 && targetValue[2] > 29){
                //         targetValue[2] = 29;
                //     }
                //     else if(targetValue[0]%4 !== 0 && targetValue[2] > 28){
                //         targetValue[2] = 28;
                //     }
                // }
                // else if(targetValue[1] in {4:1, 6:1, 9:1, 11:1} && targetValue[2] > 30){
                //     targetValue[2] = 30;
                //
                // }
                // // forbidden some value such as some 2.29, 4.31, 6.31...
                // if(JSON.stringify(targetValue) !== JSON.stringify(pickedValue)){
                //     // android will return String all the time，but we put Number into picker at first
                //     // so we need to convert them to Number again
                //     targetValue.map((v, k) => {
                //         if(k !== 3){
                //             targetValue[k] = parseInt(v);
                //         }
                //     });
                //     Picker.select(targetValue);
                //     pickedValue = targetValue;
                // }
            }
        });
        Picker.show();
    }

    render() {
        return(
            <View style={{
                flex: 1
            }}>
                <TouchableOpacity onPress={this._showTimePicker}>
                    <Text style={{fontSize: 20, color: 'red'}}>展示滚轮</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default DatePickerViews
