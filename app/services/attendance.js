import http from './http'
import { getClassesUrl, getStudentsUrl, submitAttendanceUrl } from './apiUrl'

export const getClasses = () => {
    const classes = [{
            id: 'ukg',
            title: 'Ukg'
        },
        {
            id : 'lkg',
            title: 'Lkg'
        },
        {
            id: 'first',
            title: 'First'
        },
        {
            id: 'second',
            title: 'Second'
        }];

    return new Promise((resolve, reject) => {
        return http.get(getClassesUrl)
        .then(response => resolve(classes))
        .catch(error => resolve(classes))
        // .then(response => resolve(response))
        // .catch(error => reject(error))
    })
}


export const getStudents = (className) => {
    const url = getStudentsUrl + className
    return new Promise((resolve, reject) => {
        return http.get(url)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
}

export const submitAttendance = (data) => {
    return new Promise((resolve, reject) => {
        return http.post(submitAttendanceUrl, data)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
}