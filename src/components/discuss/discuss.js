import React, { Component, useState, useEffect, useReducer } from 'react'
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

const initialState = {count: 0}


const reducer =(state, action) => {
    switch (action.type) {
        case 'add':
            return {count: state.count + 1}
        case 'minus':
            return {count: state.count - 1}
        default:
            return state
    }
}


const discussItem = () => {
    const [count, add] = useState(0)

    useEffect(()=>{
        console.log('加载成功', count)
    },[count])

    const [state, dispatch] = useReducer(reducer, initialState)




    return(
        <View style={style.container}>
            <TouchableOpacity onPress={()=> add(preCount => preCount + 1)}>
                <View>
                    <Text>数量：{count}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> dispatch({
                type: 'add'
            })}>
                <View>
                    <Text>数量加：</Text>
                </View>
            </TouchableOpacity>

            <Text>userReducer:{state.count}</Text>

            <TouchableOpacity onPress={()=> dispatch({
                type: 'minus'
            })}>
                <View>
                    <Text>数量减：</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default discussItem