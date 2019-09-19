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

import DiscussItem from './../components/discuss/discuss'

class discussList extends Component{

    render() {
        return(
            <DiscussItem/>
        )
    }
}

export default discussList