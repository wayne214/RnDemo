import React, {Component} from 'react'
import {View, Text, ScrollView, FlatList, StyleSheet} from 'react-native'


//列表滚动变化监听配置
const VIEWABILITY_CONFIG = {

};

class twolist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            array: this.getData(),
            currentScrollView: ''
        }

        this.viewabilityConfig = {
            // minimumViewTime: 500,
            // viewAreaCoveragePercentThreshold: 0,
            itemVisiblePercentThreshold: 50,
            // waitForInteraction: true,
        }
    }

    getData = () => {
        let arr = []
        for (let i = 0; i < 50; i++) {
            arr.push(i)
        }

        return arr
    }

    _renderItemLeft = ({item}) => {
        return (
            <View style={{backgroundColor: 'blue',height: 50, width: 80}}>
                <Text>{item}</Text>
            </View>
        )
    }

    _keyExtractor = (item, index) => index;

    _renderItemRight = ({item}) => {
        // console.log('---dfafeoi--',item)
        return (
            <View style={{
                flexDirection:'row'
            }}>
                <View style={{backgroundColor: 'yellow',height: 50, width: 60}}>
                    <Text>{item}</Text>
                </View>
                <View style={{backgroundColor: 'green',height: 50, width: 70}}>
                    <Text>{item}</Text>
                </View>
                <View style={{backgroundColor: 'pink',height: 50, width: 80}}>
                    <Text>{item}</Text>
                </View>
                <View style={{backgroundColor: 'red',height: 50, width: 90}}>
                    <Text>{item}</Text>
                </View>
                <View style={{backgroundColor: 'green',height: 50, width: 90}}>
                    <Text>{item}</Text>
                </View>
                <View style={{backgroundColor: 'blue',height: 50, width: 90}}>
                    <Text>{item}</Text>
                </View>

            </View>

        )
    }

    _onScrollLeft = (event) => {
        console.log('---bian--info', event.nativeEvent.contentOffset)
        const offset = event.nativeEvent.contentOffset;
        const y = offset.y

        this.state.currentScrollView === 'leftListView' && this.rightList.setNativeProps({
            contentOffset: { x: 0, y: y }
        })
    }

    _onScroll = (event) => {
        console.log('---bian--info', event.nativeEvent.contentOffset)
        const offset = event.nativeEvent.contentOffset;
        const y = offset.y

        this.state.currentScrollView === 'rightListView' && this.refs._leftlist.setNativeProps({
            contentOffset: { x: 0, y: y }
        })
    }

    render() {
        const {array} = this.state
        return(
            <View style={styles.container}>
                <View onStartShouldSetResponderCapture={() => {
                    this.setState({ currentScrollView: 'leftListView' });
                }}>
                    <FlatList
                        ref={'_leftlist'}
                        style={styles.leftList}
                        data={array}
                        renderItem={this._renderItemLeft}
                        keyExtractor={this._keyExtractor}
                        onScroll={this._onScrollLeft}
                    />
                </View>

                <ScrollView horizontal={true}>
                    <View onStartShouldSetResponderCapture={() => {
                        this.setState({ currentScrollView: 'rightListView' });
                    }}>
                        <FlatList
                            extraData={this.state}
                            ref={fl => {this.rightList = fl}}
                            style={styles.rightList}
                            data={array}
                            renderItem={this._renderItemRight}
                            keyExtractor={this._keyExtractor}
                            onScroll={this._onScroll}
                        />
                    </View>
                </ScrollView>


            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    leftList: {
        width: 100,
    },
    rightList: {
        marginLeft: 10,
        flex: 1
    }
})

export  default twolist