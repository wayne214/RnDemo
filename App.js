/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
    SafeAreaView,
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


import TTS from 'react-native-baidu-vtts'

import DetailPage from './src/detailpage'

import DemoHooks from './src/demos/demo_hooks'
import TwoList from './src/pages/twolist'

// const App = () => {
//     return (
//         <View style={styles.container}>
//             <TwoList/>
//         </View>
//
//     );
// }

class App extends Component{

    componentDidMount() {
        // TTS.initBaiduTTS('17583433','ycsP9o7cXTRAbU6E8XIZiSe3','eNKSZwlGucOKB73GUzaRxhQNXCwFn4Cz')
    }

    _speechText = () => {
        TTS.speak('百度语音')
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<TwoList/>*/}
                {/*<TouchableOpacity onPress={this._speechText}>*/}
                    {/*<Text style={{fontSize: 20, height: 30}}>测试语音</Text>*/}
                {/*</TouchableOpacity>*/}
                <DemoHooks/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100
    },
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
