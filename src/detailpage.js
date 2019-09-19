import React, {Fragment, Component,  useState, useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Animated,
    findNodeHandle,
    Dimensions,
    Platform,
    Image,
    TouchableOpacity
} from 'react-native';

import LocalImg from './images'

import { BlurView, VibrancyView } from "@react-native-community/blur";

import TabView from './components/tab-view'
import TabBar from './components/tabBar'

let {width, height} = Dimensions.get('window')

const topBarHeight = (Platform.OS === 'ios' ? 64 : 42)


import GoodList from './pages/GoodList'

class detailpage extends Component{
    constructor(props){
        super(props)
        this.state = {
            viewRef: 0,
            bgY: 0,
            titleOpacity: 0,
            bgScale: 1,
            headOpacity: 1,
            scrollY: 0,
            data: {
                name: "田老师红烧肉（知春路店）",
                isBrand: true,
                logo: 27,
                scores: 3.5,
                sale: 4013,
                bao: true,
                piao: true,
                ontime: true,
                fengniao: true,
                startPay: "￥20起送",
                deliverPay: "配送费￥4",
                evOnePay: "￥21/人",
                journey: "250m",
                time: "35分钟",
                bulletin: "公告：春节前，配送紧张，可能延时推送，请客户谅解",
                activities: [
                    {key: "减", text: "满20减2，满30减3，满40减4（不与美食活动同享）"},
                    {key: "特", text: "双人餐特惠"}
                ]
            },
            index: 0,
            routes: [
                {
                    key: 'fundingOverview',
                    title: '项目概览',
                },
                {
                    key: 'analysis',
                    title: '市场分析',
                },
                {
                    key: 'operateData',
                    title: '运营数据',
                },
                // {
                //   key: 'similarItem',
                //   title: '相似项目',
                // }
            ],
        }
    }

    componentDidMount() {
        let marginTop = 18+80
        let { scrollY } = this._goodslist.state
        let activeHeight = 18 * 2
        this.setState({
            bgScale: scrollY.interpolate({inputRange: [ -marginTop, 0, marginTop],outputRange: [2, 1, 1]}),
            headOpacity: scrollY.interpolate({inputRange: [0, activeHeight, marginTop],outputRange: [1, 1, 0]}),
            titleOpacity: scrollY.interpolate({inputRange: [0, marginTop-10, marginTop],outputRange: [0, 0, 1]}),
            scrollY: scrollY.interpolate({inputRange: [0, marginTop, marginTop],outputRange: [0, -marginTop, -marginTop]}),
            bgY: scrollY.interpolate({inputRange: [ -marginTop, 0, marginTop, marginTop],outputRange: [marginTop/2, 0, -marginTop/3, -marginTop/3]})
        })
    }

    renderLabel = scene => {
        const { focused, route } = scene;
        const textColor = focused ? "#2E2E2E" : '#616161';
        const size = focused ? 15 : 15
        return (
            <Text style={{ fontSize: size, color: textColor, fontWeight: focused ? '500' : 'normal' }}>
                {route.title}
            </Text>
        );
    }
    renderTabViewBarHeader = props => (
        <View style={styles.tabViewContainer}>
            <TabBar
                {...props}
                style={styles.tabBarContainer}
                tabStyle={styles.tab}
                labelStyle={styles.label}
                indicatorStyle={styles.indicator}
                renderLabel={this.renderLabel}
            />
        </View>
    )

    renderScene = ({ route }) => {
        let marginTop = 18+80
        const { key } = route;
        switch (key) {
            case 'fundingOverview':
                 return <GoodList onRef={(ref)=>this._goodslist = ref} headHeight={marginTop}/>
            case 'analysis':
                return (
                    <View />
                );
            case 'operateData':
                return (
                    <View />
                );
            default:
                return null
        }
    }

    renderGoods(){
        let MAIN_HEIGHT = height - topBarHeight
        let style = {
            transform: [{
                translateY: this.state.scrollY
            }]
        }
        if(Platform.OS == "android"){
            style.height = height + 80
        }
        return (
            <Animated.View style={[styles.topView, style]}>
                <View style={{
                    backgroundColor: "#f3f3f3",
                    height: MAIN_HEIGHT,
                    width,
                    marginTop: 18 + 80
                }}>
                    <TabView
                        lazyPreloadDistance={0}
                        navigationState={this.state}
                        renderScene={this.renderScene}
                        renderHeader={this.renderTabViewBarHeader}
                        onIndexChange={this.handleIndexChange}
                    />
                </View>
            </Animated.View>
        )
    }

    handleIndexChange = index => {
        this.setState({ index })
        switch (index) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                return;
        }
    };

    imageLoaded = () => {
        this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)})
    }
    render() {
        let { data } = this.state
        let props = Platform.OS === 'ios'?{
            blurType: "light",
            blurAmount: 25
        }:{
            viewRef: this.state.viewRef,
            downsampleFactor: 10,
            overlayColor: 'rgba(255,255,255,.1)'
        }
        return(
            <View style={{flex: 1, backgroundColor:  "#f3f3f3"}}>
                <Animated.Image
                    style={[styles.bg,
                        {
                        transform: [
                            {translateY: this.state.bgY},
                            {scale: this.state.bgScale}
                        ]
                        }
                    ]}
                    source={LocalImg.bg}
                    ref={'backgroundImage'}
                    onLoadEnd={this.imageLoaded}>

                    {/*<BlurView {...props} style={styles.blur}/>*/}
                </Animated.Image>

                <BlurView {...props} style={styles.blur}/>
                <View style={styles.head}>
                    <Animated.View style={{flexDirection: "row", paddingHorizontal: 16, opacity: this.state.headOpacity}}>
                        <Image source={LocalImg.bg} style={styles.logo}/>
                        <View style={{marginLeft: 14, flex: 1}}>
                            <Text style={{color: "#fff"}}>{data.name}</Text>

                            <View style={{flexDirection: "row", paddingTop: 8, paddingBottom: 18}}>
                                <Text style={[styles.label2, {marginRight: 5}]}>{"蜂鸟专送"}</Text>
                                <Text style={{color: "#fff", fontSize: 12}}>{`${data.time}分钟送达`}</Text>
                            </View>

                            <Text style={{color: "#fff", fontSize: 12}} numberOfLines={1}>{data.bulletin}</Text>
                        </View>
                    </Animated.View>
                </View>

                {this.renderGoods()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    head:{
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        paddingTop: (Platform.OS === 'ios' ? 64 : 42),
        backgroundColor: "rgba(0,0,0,.3)"
    },
    bg:{
        width,
        height: width,
        resizeMode: "cover"
    },
    blur: {
        position: "absolute",
        left:0,
        right:0,
        top:0,
        width,
        height: width,
    },
    label2: {
        fontSize: 10,
        color: "#fff",
        backgroundColor: "#00abff",
        textAlign: "center",
        paddingHorizontal: 2,
        paddingVertical: 1
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: "cover"
    },
    topView: {
        position: "absolute",
        top: (Platform.OS === 'ios' ? 64 : 42),
        bottom: 0,
        left: 0,
        right: 0
    },
    tabViewContainer: {
        flexDirection: 'row',
        width: width,
        height: 44,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    tabBarContainer: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#ffffff',
        flex: 1
    },
    tab: {
        // paddingBottom: 8
        width: width / 3
    },
    label: {
        color: '#616161'
    },
    indicator: {
        width: 30,
        height: 2,
        backgroundColor: '#FD3334',
        marginLeft: (width / 3 - 30)*0.5
    },
})

export default detailpage