/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {SafeAreaView} from 'react-native-safe-area-context'


import DetailPage from './src/detailpage'

import DemoHooks from './src/demos/demo_hooks'
import ReactView from './src/demos/react-views'
import TwoList from './src/pages/twolist'
import DatePickerViews from './src/demos/date-picker-views';
import TextDemo from './src/text';

// const App = () => {
//     return (
//         <View style={styles.container}>
//             <TwoList/>
//         </View>
//
//     );
// }

class App extends Component{
    constructor() {
        super();
    }
    
    render() {
        return (
            <View style={{backgroundColor: '#fff', flex: 1, paddingTop: 40}}>
                <DemoHooks/>
            </View>

        );
    }
}

export default App;
