import axios from 'axios'

const url = 'http://localhost:5000'

export const expandWordApi = (info) => axios.post(`${url}/expand`, info)
export const postData2Excel = (data) => axios.post(`${url}/data2excel`, data)
export const addDataFromUrl = (uri) => axios.post(`${url}/get-data-from-url`, uri)