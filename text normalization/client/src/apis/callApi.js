import axios from 'axios'

const url = 'http://localhost:5000'

export const expandWordApi = (info) => axios.post(`${url}/expand`, info)
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)
export const deletePost = (id) => axios.delete(`${url}/${id}`)
export const getHistory = (id) => axios.delete(`${url}/${id}`)
export const updatePost = (id, updatePost) => axios.patch(`${url}/${id}`, updatePost)