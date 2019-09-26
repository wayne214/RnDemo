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

class discussList extends Component{
    constructor(props) {
        super(props)
        this.state = {
            fadeInOpacity: new Animated.Value(0), // 初始值
            rotation:new Animated.Value(0),
            fontSize: new Animated.Value(0),

            springValue: new Animated.Value(0)
        }

        this.springAnimated = Animated.spring(
            this.state.springValue,
            {
                toValue: 1,
                friction: 3, // 弹跳系数
                tension: 10, // 控制速度
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
        this.state.springValue.setValue(0.1);
        this.springAnimated.start();
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <DiscussItem/>
                <Animated.View
                    style={[
                        styles.demo,
                        {opacity: this.state.fadeInOpacity,
                            transform:[{
                            rotateZ: this.state.rotation.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            })
                            }]
                        }
                    ]}
                >
                    <Animated.Text style={{fontSize: this.state.fontSize.interpolate({
                            inputRange: [0, 1],
                            outputRange: [12, 26]
                        }),
                        color: 'red'}}>
                        悄悄的，我出现了😈💨</Animated.Text>
                </Animated.View>

                <Animated.View
                    style={{
                        marginTop: 50,
                        width: 282,
                        height: 50,
                        transform:[
                            {scale: this.state.springValue}
                        ]
                    }}
                >
                    <Text>哇咔咔</Text>
                </Animated.View>

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