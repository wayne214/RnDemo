import React, {useState, useEffect, useRef} from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Picker,
    FlatList,
    UIManager,
    findNodeHandle,
    NativeModules
} from 'react-native'

import CardView from 'react-native-cardview-wayne'

const demoHooks = () => {
    // 初始值
    const [text, setText] = useState('this is hook demo')
    const [data, setData] = useState([])
    const [position, setPosition] = useState(0)

    const buttonEl = useRef([0,1,2,3].map(()=>React.createRef()))
    // 副作用
    useEffect(()=> {
        console.log('加载后，调用的', text)
        setData(this.getData())

        // UIManager.measure(findNodeHandle(this.text),(x,y, width, height, pageX, pageY)=> {
        //     console.log('位置，', y, pageY)
        // })


    },[])

    getData = () => {
        let data = []
        for (let i = 0; i< 4;i++) {
            data.push(i)
        }
        return data
    }

    // 方法
    _changeTheDefaultText = () => {
        return setText('this is the new text')
    }


    _renderItem = ({item}) => {
        console.log('rowData',item)
        return <View style={{flexDirection: 'row', height: 50, width: 200}}>
            <TouchableOpacity onPress={()=> {
                buttonEl.current[item].current.measureInWindow((x,y,width, height)=> {
                    console.log('位置',x, y, width, height)
                })

            }
            }>
                <View ref={buttonEl.current[item]} style={{opacity:1 }}>
                    <Text style={{height: 20, width: 60}}>{item}</Text>
                </View>
            </TouchableOpacity>

        </View>
    }


    return (
        <View style={{backgroundColor: '#f5f5f5'}}>
            {/*<Text style={{fontSize: 20, color: 'red'}}>{text}</Text>*/}
            {/*<TouchableOpacity onPress={_changeTheDefaultText}>*/}
                {/*<Text style={{fontSize: 20, color: 'red'}}>改变文字</Text>*/}
            {/*</TouchableOpacity>*/}
            {/*<CardView*/}
                {/*style={{marginHorizontal: 12}}*/}
                {/*cardElevation={4}*/}
                {/*maxCardElevation={4}*/}
                {/*radius={10}*/}
                {/*backgroundColor={'#ffffff'}>*/}
                {/*<View style={{padding:10, margin: 12}}>*/}
                    {/*<View>*/}
                        {/*<Text>ReactNative CardView for iOS and Android</Text>*/}
                    {/*</View>*/}
                    {/*<View>*/}
                        {/*<Text>This is test</Text>*/}
                    {/*</View>*/}
                {/*</View>*/}
            {/*</CardView>*/}

            <FlatList
                data={data}
                renderItem={this._renderItem}
            />

        </View>
    )
}

export default demoHooks