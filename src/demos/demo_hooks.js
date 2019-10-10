import React, {useState} from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'

const demoHooks = () => {
    // 初始值
    const [text, setText] = useState('this is hook demo')
    // 方法
    _changeTheDefaultText = () => {
        return setText('this is the new text')
    }

    return (
        <View>
            <Text style={{fontSize: 20, color: 'red'}}>{text}</Text>
            <TouchableOpacity onPress={_changeTheDefaultText}>
                <Text style={{fontSize: 20, color: 'red'}}>改变文字</Text>
            </TouchableOpacity>
        </View>
    )
}

export default demoHooks