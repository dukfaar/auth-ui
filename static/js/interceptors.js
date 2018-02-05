import {store} from './redux/store'
import { refreshAccessToken } from './redux/login/actions'
import axios from 'axios'

import './redux/login/reducer'

axios.interceptors.request.use(request => {
    request.headers.Authorization = 'Bearer ' + store.getState().loginData.accessToken
    return request
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    if(response.data.errors && response.data.errors[0] && response.data.errors[0].message === 'valid accesstoken is required') {
        refreshAccessToken(store.getState().loginData.refreshToken)(store.dispatch)
        .then(result => {
            console.log('correcting:', result)
            return response
        })
        .catch(error => {
            localStorage.clear('accesstoken')
            localStorage.clear('refreshtoken')
            localStorage.clear('accesstokenvaliduntil')

            store.dispatch({ type: 'SET ACCESSTOKEN', token: undefined })
            store.dispatch({ type: 'SET REFRESHTOKEN', token: undefined })
            store.dispatch({ type: 'SET LOGINEXPIRETIME', token: undefined })
            return response
        })
    } else {
        return response
    }
}, error => {
    return Promise.reject(error)
})