import React,{Component} from 'react';
import {
    ImageBackground,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Text,
    View, Dimensions
} from 'react-native';

const floorArr = [{name: '1层', id: 1, floor: 1, outFloor: "电梯外", inFloor: "电梯内", jiedai: "接待点", select: false},
    {name: '2层', id: 2, floor: 2, outFloor: "电梯外", inFloor: "电梯内", jiedai: "接待点", select: false},
    {name: '3层', id: 3, floor: 3, outFloor: "电梯外", inFloor: "电梯内", jiedai: "接待点", select: false}];
const {width, height} = Dimensions.get('screen');

export default class JzDirectMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCamera: false,
            screenFlag: 1,// 2 表示领导  1 表示 自用无导览
            status: 'jiedai',
            floorNum:0,
            isChecked:false,
            dataSource: floorArr
        }
    }

    componentWillMount(): void {
    }
    /**
     * 选项点击时间
     *
     * @type {number} 当前选项的索引值
     */
    QAIndex = 0;
    _optionPress = (item) => {
        console.log('item', item)
        // const {isChecked} = this.state;
        // let cCheck = !isChecked;
        // this.setState({isChecked: cCheck});
        // alert(JSON.stringify(this.state.isChecked));
        const { dataSource } = this.state
        dataSource.forEach((elem) => {
            elem.select = false
            if (elem.id === item.id) {
                elem.select = true
            }
        })

        this.setState({
            dataSource: dataSource
        })
    };

    _pinzhiPress = (item, isChecked) => {
        const {name} = item;
        if (isChecked) {
            alert(name)
        } else {
            alert(isChecked)
        }
    };

    /**
     *  FlatList 组件渲染函数
     *
     * @param item
     * @param index
     * @returns {*}
     * @private
     */
    _renderItem = ({item, index}) => {
        console.log('---item---',item)
        // const {QA} = this.state;
        //单选
        return (<TouchableOpacity
            style={{width: width, marginTop: 30, alignItems:'center'}}
            onPress={()=>{
                this._optionPress(item)
            }}>
            <Text style={
                item.select ? {color: '#ff1300', fontSize: 20} : {color: '#000', fontSize: 16}
            }>{item.name}</Text>
        </TouchableOpacity>)
    };

    render(): * {
        return (
            <View style={styles.container}>
                <View style={styles.title_view}>
                    <Text style={styles.title_text}>
                        当前{this.state.floorNum}层
                    </Text>
                </View>
                <View style={styles.list}>
                    <FlatList
                        extraData={this.state}
                        data={this.state.dataSource}
                        renderItem={this._renderItem}
                        // renderItem = {({item})=><Text style = {styles.item}>{item.name}</Text>}
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewStyle: {
        width: width,
        height: 50,
        marginTop: 0,
        borderRadius: 25,
        fontSize: 18,
        color: "white",
        borderWidth: 1,
        borderColor: '#FFF',
        paddingLeft: 12,
        letterSpacing: 4
    },
    title_view:{
        flexDirection:'row',
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#27b5ee',
    },
    title_text: {
        fontSize:20,
        color:'white'
    },
    list: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
