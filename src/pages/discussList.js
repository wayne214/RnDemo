import React, { Component } from 'react'
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
    TouchableOpacity,
    Easing,
    Button
} from 'react-native'
let {width, height} = Dimensions.get('window')

import DiscussItem from './../components/discuss/discuss'

import RoundImage from 'react-native-border-radius-image'


import dogbg from '../images/dog.jpg'
import glass from '../images/glasses.png'
import necklace from '../images/necklace.jpg'
import LocalImg from "../images";


/**
 * Animated.delay 给定延迟后开始动画
 * Animated.parallel 同时启动多个动画
 * Animated.sequence 按顺序启动动画，等待每一个动画完成后在开始下一个动画
 * Animated.stagger 按照给定的延时间隔，顺序并行的启动动画
 *
* */

class discussList extends Component{
    constructor(props) {
        super(props)
        // this.state = {
        //     fadeInOpacity: new Animated.Value(0), // 初始值
        //     rotation:new Animated.Value(0),
        //     fontSize: new Animated.Value(0),
        //
        //     springValue: new Animated.Value(0)
        // }
        //
        // this.springAnimated = Animated.spring(
        //     this.state.springValue,
        //     {
        //         toValue: 1,
        //         friction: 3, // 弹跳系数
        //         tension: 10, // 控制速度
        //     }
        // )

        this.state ={
            dogOpacityValue: new Animated.Value(0),
            dogAccValue: new Animated.Value(0),
            redValue: new Animated.Value(0),
            blueValue: new Animated.Value(0)
        }

        this.staggerAnimated = Animated.stagger(
            2000,
            [
                Animated.timing(
                    this.state.redValue,
                    {
                        toValue: 1,
                        duration: 5000,
                        easing: Easing.in
                    }
                ),
                Animated.timing(
                    this.state.blueValue,
                    {
                        toValue: 1,
                        duration: 5000,
                        easing: Easing.in
                    }
                )
            ]
        )

        this.parallelAnimated = Animated.parallel(
            [
                Animated.timing(
                    this.state.dogOpacityValue,
                    {
                        toValue: 1,
                        duration: 1000
                    }
                ),
                Animated.timing(
                    this.state.dogAccValue,
                    {
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.linear
                    }
                )
            ],
            {
                stopTogether: false
            }
        )
    }

    componentDidMount() {
        // Animated.timing(this.state.fadeInOpacity,{
        //     toValue: 1,
        //     duration: 10000,
        //     easing: Easing.linear
        // }).start()
        // let timing = Animated.timing;
        // Animated.parallel(['fadeInOpacity','rotation','fontSize'].map(
        //     property => {
        //         return timing(this.state[property],{
        //             toValue: 1,
        //             duration: 10000,
        //             easing: Easing.linear
        //         })
        //     }
        // )).start()
    }

    _startAnimated =()=> {
        this.state.dogOpacityValue.setValue(0.1);
        this.state.dogAccValue.setValue(0)
        this.parallelAnimated.start();


        this.state.redValue.setValue(0);
        this.state.blueValue.setValue(0)
        this.staggerAnimated.start()
    }

    render() {
        // 狗狗背景图片
        const dogOpacity = this.state.dogOpacityValue.interpolate({
            inputRange: [0,0.2,0.4,0.6,0.8,1],
            outputRange: [0,1,0,1,0,1]
        })
        // 项链位置
        const neckTop = this.state.dogAccValue.interpolate({
            inputRange: [0,1],
            outputRange: [250,135]
        })
        // 眼镜位置
        const left = this.state.dogAccValue.interpolate({
            inputRange: [0,1],
            outputRange: [-120, 120]
        })

        const rotateZ = this.state.dogAccValue.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg','360deg']
        })

        const redMarginLeft = this.state.redValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 200]
        })

        const blueMarginLeft = this.state.blueValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 200]
        })

        return(
            <View style={{flex: 1}}>
                <RoundImage size={40} source={LocalImg.bg}/>

                {/*<DiscussItem/>*/}
                {/*<Animated.View*/}
                    {/*style={[*/}
                        {/*styles.demo,*/}
                        {/*{opacity: this.state.fadeInOpacity,*/}
                            {/*transform:[{*/}
                            {/*rotateZ: this.state.rotation.interpolate({*/}
                                {/*inputRange: [0, 1],*/}
                                {/*outputRange: ['0deg', '360deg']*/}
                            {/*})*/}
                            {/*}]*/}
                        {/*}*/}
                    {/*]}*/}
                {/*>*/}
                    {/*<Animated.Text style={{fontSize: this.state.fontSize.interpolate({*/}
                            {/*inputRange: [0, 1],*/}
                            {/*outputRange: [12, 26]*/}
                        {/*}),*/}
                        {/*color: 'red'}}>*/}
                        {/*悄悄的，我出现了😈💨</Animated.Text>*/}
                {/*</Animated.View>*/}

                {/*<Animated.View*/}
                    {/*style={{*/}
                        {/*marginTop: 50,*/}
                        {/*width: 282,*/}
                        {/*height: 50,*/}
                        {/*transform:[*/}
                            {/*{scale: this.state.springValue}*/}
                        {/*]*/}
                    {/*}}*/}
                {/*>*/}
                    {/*<Text>哇咔咔</Text>*/}
                {/*</Animated.View>*/}



                <Animated.View
                    style={{
                        width: 375,
                        height: 240,
                        opacity: dogOpacity
                    }}
                >
                    <Image style={{width: 375, height: 242}} source={dogbg}/>
                </Animated.View>

                <Animated.View
                    style={{
                        width: 250,
                        height: 100,
                        position: 'absolute',
                        top: neckTop,
                        left: 93
                    }}
                >
                    <Image style={{width: 250, height: 100, resizeMode:'stretch'}}  source={necklace}/>
                </Animated.View>

                <View
                    style={{
                        width: 375,
                        height: 200,
                        backgroundColor:'white',
                    }}
                />

                <Animated.View
                    style={{
                        width: 120,
                        height: 25,
                        position: 'absolute',
                        top: 60,
                        left: left,
                        transform:[
                            {rotateZ: rotateZ}
                        ]
                    }}
                >
                    <Image style={{width: 120, height: 25, resizeMode:'stretch'}} source={glass}/>
                </Animated.View>


                <Animated.View
                    style={{
                        width: 50,
                        height: 50,
                        marginLeft: redMarginLeft,
                        backgroundColor: 'red'
                    }}
                />

                <Animated.View
                    style={{
                        width: 50,
                        height: 50,
                        marginLeft: blueMarginLeft,
                        backgroundColor: 'blue'
                    }}
                />


                <Button
                title={'开始动画'}
                onPress={this._startAnimated}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    demo: {
        backgroundColor: '#fff'
    }
})

export default discussList