import {GET_ALL, DELETE, CREATE, UPDATE, OPEN_MODAL, CLOSE_MODAL} from './../../constants/index'
import * as api from "./../../apis/callApi"
export const getAllItems = () => async(dispatch) => {
    try {
        dispatch({type : GET_ALL, items : []})
    } catch (error) {
        console.log(error.message)
    }
}

export const expandCallAPI = (item) => async(dispatch) => {
    try {
        let data2req = {sentenceWithAbbrev : item.input}
        const {data} = await api.expandWordApi(data2req)
        item.output = data.expand
        if(item.expected === data.expand) item.result = 'pass'
        else item.result = 'fail'
        dispatch({type : UPDATE, item : item})
    } catch (error) {
        console.log(error.message)
    }
}

export const createNewItem = (newItem) => async(dispatch) => {
    try {
        dispatch({type : CREATE, newItem : newItem})
    } catch (error) {
        console.log(error.message)
    }
}

export const updateItem = (id, item) => async(dispatch) => {
    try {
        dispatch({type : UPDATE, currentItem : {item : item, id : id}})
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteItem = (id) => async(dispatch) => {
    try {
        dispatch({type : DELETE, id : id})
    } catch (error) {
        console.log(error.message)
    }
}


export const openModal = () => async(dispatch) => {
    try {
        dispatch({type : OPEN_MODAL})
    } catch (error) {
        console.log(error.message)
    }
}

export const closeModal = () => async(dispatch) => {
    try {
        dispatch({type : CLOSE_MODAL})
    } catch (error) {
        console.log(error.message)
    }
}