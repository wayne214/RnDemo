import React, {useState, useEffect} from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Picker
} from 'react-native'

import CardView from 'react-native-cardview-wayne'

const demoHooks = () => {
    // 初始值
    const [text, setText] = useState('this is hook demo')
    // 副作用
    useEffect(()=> {
        console.log('加载后，调用的', text)
    },[])

    // 方法
    _changeTheDefaultText = () => {
        return setText('this is the new text')
    }

    return (
        <View style={{backgroundColor: '#f5f5f5'}}>
            {/*<Text style={{fontSize: 20, color: 'red'}}>{text}</Text>*/}
            {/*<TouchableOpacity onPress={_changeTheDefaultText}>*/}
                {/*<Text style={{fontSize: 20, color: 'red'}}>改变文字</Text>*/}
            {/*</TouchableOpacity>*/}
            <CardView
                style={{marginHorizontal: 12}}
                cardElevation={4}
                maxCardElevation={4}
                radius={10}
                backgroundColor={'#ffffff'}>
                <View style={{padding:10, margin: 12}}>
                    <View>
                        <Text>ReactNative CardView for iOS and Android</Text>
                    </View>
                    <View>
                        <Text>This is test</Text>
                    </View>
                </View>
            </CardView>
        </View>
    )
}

export default demoHooks