import http from './http'
import { loginUrl } from './apiUrl'

export const login = (data) => {
    return new Promise((resolve, reject) => {
        return http.post(loginUrl, data)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
}
