import axios from 'axios'
import { API_BASE_URL } from '../config/url'
import { get } from './storage'

// const authToken = localStorage.getItem('authToken')

const http = {

    get : async (url, params) => {
        
        const authToken = await get('authToken')

        return axios({
            url: API_BASE_URL + url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            }
        })
    },
    
    post : async (url, data) => {
        
        const authToken = await get('authToken')

        return axios({
            url: API_BASE_URL + url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
            data
        })
    
    }
}

export default http;