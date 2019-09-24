import React, { Component, useState, useEffect, useReducer } from 'react'
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
    TouchableOpacity,
    TextInput,
    Button
} from 'react-native'
let {width, height} = Dimensions.get('window')

import axios from 'axios'

const style = {
    container: {
        height: 50,
        width
    }
}


const hookdata = () => {
    const [data, setData] = useState({hits: []})

    const [query, setQuery] = useState('react')

    // const [search,setSearch] = useState('react')

    const [url, setUrl] = useState(`https://hn.algolia.com/api/v1/search?query=react`)

    const [isLoading, setIsLoading] = useState(false)

    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false)
            setIsLoading(true)


            try {
                const result = await axios(url)
                setData(result.data)
            } catch (error) {
                setIsError(true)
            }

            setIsLoading(false)
        }

        fetchData()

    },[url])


    return(
        <View style={style.container}>
            <TextInput
                style={{height: 48,borderColor: 'gray', borderWidth: 1}}
                onChangeText={text=> setQuery(text)}
                value={query}
            />
            <Button
                title={'Search'}
                color={'#841584'}
                onPress={()=> setUrl(`http://hn.algolia.com/api/v1/search?queryD=${query}`)}
            />

            {
                isError && <View>
                    <Text>Something went wrong ...</Text>
                </View>
            }
            {
                isLoading ? <View>
                        <Text>Loading...</Text>
                    </View>
                    : data.hits.map(item=> {
                    return (
                        <TouchableOpacity>
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default hookdata