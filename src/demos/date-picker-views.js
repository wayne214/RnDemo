import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
import Picker from 'react-native-picker'

import {isToday} from '../util'

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


    _showTimePicker =()=> {
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
            if(i%5 === 0) {
                minutes.push(i);
            }
        }

        let date = new Date();
        let year = date.getFullYear()
        let monthAndDay = []

        var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
        for(let i= 1; i<13; i++){
            if(i === 2) {
                if(year%4 === 0 && ((year % 100) !== 0) || ((year % 400) === 0)){
                    for(let j=1;j<30; j++){
                        let da = `2020-${i}-${j}`
                        var week = weekArray[new Date(da).getDay()]
                        let obj = i + '月' + j + '日' +week
                        if(isToday(da)){
                            monthAndDay.push('今天')
                        } else {
                            monthAndDay.push(obj);
                        }
                    }
                }else {
                    for(let j=1;j<29; j++){
                        let da = `2020-${i}-${j}`
                        var week = weekArray[new Date(da).getDay()]
                        let obj = i + '月' + j + '日'+ week
                        if(isToday(da)){
                            monthAndDay.push('今天')
                        } else {
                            monthAndDay.push(obj);
                        }
                    }
                }
            } else {
                if (i in {4:1, 6:1, 9:1, 11:1}) {
                    for(let j=1;j<31; j++){
                        let da = `2020-${i}-${j}`
                        var week = weekArray[new Date(da).getDay()]
                        let obj = i + '月' + j + '日'+week
                        if(isToday(da)){
                            monthAndDay.push('今天')
                        } else {
                            monthAndDay.push(obj);
                        }
                    }
                } else {
                    for(let j=1;j<32; j++){
                        let da = `2020-${i}-${j}`
                        var week = weekArray[new Date(da).getDay()]
                        let obj = i + '月' + j + '日'+week
                        if(isToday(da)){
                            monthAndDay.push('今天')
                        } else {
                            monthAndDay.push(obj);
                        }
                    }
                }
            }
        }

        console.log('---dddd', monthAndDay, date.getFullYear());

        let pickerData = [years, months, days, ['上午', '下午'], hours, minutes];
        let selectedValue = [
            date.getFullYear(),
            date.getMonth()+1,
            date.getDate(),
            date.getHours() > 11 ? 'pm' : 'am',
            date.getHours() === 12 ? 12 : date.getHours()%12,
            date.getMinutes()
        ];
        Picker.init({
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerConfirmBtnColor: [255,92,93,1],
            pickerCancelBtnColor: [46,46,46,1],
            pickerData,
            selectedValue,
            pickerTitleText: '',
            wheelFlex: [2, 1, 1, 2, 1, 1],
            onPickerConfirm: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerCancel: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                let targetValue = [...pickedValue];
                if(parseInt(targetValue[1]) === 2){
                    if(targetValue[0]%4 === 0 && targetValue[2] > 29){
                        targetValue[2] = 29;
                    }
                    else if(targetValue[0]%4 !== 0 && targetValue[2] > 28){
                        targetValue[2] = 28;
                    }
                }
                else if(targetValue[1] in {4:1, 6:1, 9:1, 11:1} && targetValue[2] > 30){
                    targetValue[2] = 30;

                }
                // forbidden some value such as some 2.29, 4.31, 6.31...
                if(JSON.stringify(targetValue) !== JSON.stringify(pickedValue)){
                    // android will return String all the time，but we put Number into picker at first
                    // so we need to convert them to Number again
                    targetValue.map((v, k) => {
                        if(k !== 3){
                            targetValue[k] = parseInt(v);
                        }
                    });
                    Picker.select(targetValue);
                    pickedValue = targetValue;
                }
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
