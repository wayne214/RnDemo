import React, { Component, useState, useEffect } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Platform,
    ScrollView,
    Dimensions,
    AlertIOS,
    Animated,
    RefreshControl,
    TouchableOpacity
} from 'react-native'
let {width, height} = Dimensions.get('window')

const style = {
    container: {
        height: 50,
        width
    }
}

const discussItem = () => {
    const [count, add] = useState(0)

    useEffect(()=>{
        console.log('加载成功', count)
    },[count])


    return(
        <View style={style.container}>
            <TouchableOpacity onPress={()=> add(preCount => preCount + 1)}>
                <View>
                    <Text>数量：{count}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default discussItem