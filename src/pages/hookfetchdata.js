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

const dataFetchReducer = (state,action) => {
    switch (action.type){
        case 'FETCH_INIT':
            return{
                ...state,
                isLoading: true,
                isError: false
            }
        case 'FETCH_SUCCESS':
            return{
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'FETCH_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state
    }
}

const useDataApi = (initUrl,initData) => {
    // const [data, setData] = useState(initData)
    const [url, setUrl] = useState(initUrl)
    // const [isLoading, setIsLoading] = useState(false)
    // const [isError, setIsError] = useState(false)


    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initData
    })

    useEffect(()=> {
        const fetchData = async() => {
            // setIsError(false)
            // setIsLoading(true)
            //
            // try {
            //     const result = await axios(url)
            //     setData(result.data)
            // } catch (e) {
            //     setIsError(true)
            // }
            //
            // setIsLoading(false)

            // 使用reducer hook for data fetching

            dispatch({
                type: 'FETCH_INIT'
            })

            try {
                const result = await axios(url)
                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: result.data
                })
            }catch (e) {
                dispatch({
                    type: 'FETCH_FAILURE'
                })
            }
        }

        fetchData()
    },[url])

    return [state, setUrl]
}



const hookdata = () => {
    const [query, setQuery] = useState('redux')
    const [{data, isLoading, isError}, doFetch] = useDataApi(
        'https://hn.algolia.com/api/v1/search?query=redux',
        {hits: []}
    )

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
                onPress={()=> doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`)}
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