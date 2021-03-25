import axios from 'axios';
import {API_BASE_URL} from '../config/url';
import {get} from './storage';

axios.interceptors.request.use(
    async (req) => {
        const authToken = await get('authToken');

        // req.headers['Access-Control-Allow-Origin'] = '*'
        if (!req.url.includes('/login')) {
            req.headers.Authorization = `Bearer ${authToken}`;
        }
        return req;
    },
    (error) => {
        console.log('ERROR REQUEST : ', error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        console.log('ERROR RESPONSE : ', error);
        let errorResp =
            error.isAxiosError && error.response
                ? error.response.data
                : error.message;
        return Promise.reject(errorResp);
    }
);

const http = {
    get: async (url, params) => {
        // const authToken = await get('authToken')

        return axios({
            url: API_BASE_URL + url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': authToken
            }
        });
    },

    post: async (url, data) => {
        // const authToken = await get('authToken')

        return axios({
            url: API_BASE_URL + url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': authToken
            },
            data
        });
    }
};

export default http;
