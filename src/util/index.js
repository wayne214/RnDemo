'use strict';

import {Dimensions} from 'react-native'

const deviceH = Dimensions.get('window').height
const deviceW = Dimensions.get('window').width

const basePx = 375

export default function px2dp(px) {
    return px *  deviceW / basePx
}

export const isToday = (str) => {
    if (new Date(str).toDateString() === new Date().toDateString()) {
        //今天
        console.log("当天");

        return true
    } else if (new Date(str) < new Date()){
        //之前
        console.log("以前的日期");

        return false
    }

}
