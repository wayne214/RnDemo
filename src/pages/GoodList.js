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
    TouchableOpacity
} from 'react-native'
let {width, height} = Dimensions.get('window')
import DemoClass from '../demos/demo_class'
import DemoHooks from '../demos/demo_hooks'

export default class GoodList extends Component{

    constructor(props) {
        super(props)
        this.state = {
            scrollY: new Animated.Value(0)
        }
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    renderList(){
        return [1,1,2,2,2,2,2,2].map(item=> {
            return(
                <View style={{
                    height: 100,
                    width: 500,
                    backgroundColor: 'blue',
                    borderBottomWidth: 1,
                    borderBottomColor: 'red',
                    marginBottom: 10
                }}/>
            )
        })
    }

    render() {
        let { headHeight } = this.props
        let scrollY = this.state.scrollY.interpolate({
            inputRange: [0, headHeight, headHeight],
            outputRange: [0, headHeight, headHeight+1]
        })

        console.log('---scrollY--',scrollY)

        let style = {flex: 1,flexDirection: "row", backgroundColor:"#FFF"}
        if(Platform.OS == "android"){
            style.height = height
        }
        return(
            <View style={style}>
                <View style={{flex: 1}}>
                    <DemoClass/>
                    <DemoHooks/>
                    {/*<Animated.ScrollView*/}
                        {/*style={{flex: 1}}*/}
                        {/*showsVerticalScrollIndicator={false}*/}
                        {/*onScroll={Animated.event(*/}
                            {/*[{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],*/}
                            {/*{*/}
                                {/*useNativeDriver: true,*/}
                                {/*isInteraction: false*/}
                            {/*}*/}
                        {/*)}*/}
                        {/*scrollEventThrottle={16}*/}
                    {/*>*/}
                        {/*<Animated.View style={{*/}
                            {/*paddingBottom: headHeight + 46,*/}
                            {/*transform: [{translateY: scrollY}]*/}
                        {/*}}>*/}
                            {/*{this.renderList()}*/}
                        {/*</Animated.View>*/}
                    {/*</Animated.ScrollView>*/}
                </View>
            </View>
        )
    }
}