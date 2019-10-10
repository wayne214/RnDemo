import React, {Component} from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'

export default class demo_class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: 'this is class demo'
        }
    }

    componentDidMount() {

    }

    _changeTheDefaultText = () => {
        this.setState({
            text: 'this is the new text'
        })
    }

    render() {
        const {text} = this.state
        return (
            <View>
                <Text style={{fontSize: 20, color: 'red'}}>{text}</Text>
                <TouchableOpacity onPress={this._changeTheDefaultText}>
                    <Text style={{fontSize: 20, color: 'red'}}>改变文字</Text>
                </TouchableOpacity>
            </View>
        )
    }
}