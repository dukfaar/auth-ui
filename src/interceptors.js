import {store} from './redux/store'
import { refreshAccessToken } from './redux/login/actions'
import axios from 'axios'

import './redux/login/reducer'

axios.interceptors.response.use(response => {
    if(response.data.errors && response.data.errors[0] && response.data.errors[0].message === 'valid accesstoken is required') {
        console.log('broken response')
        console.log(response)

        return refreshAccessToken()(store.dispatch)
        .then(result => {
            return axios(response.config).then(response => {
                console.log('retryResponse')
                console.log(response)
                return response
            })
        })
        .catch(error => {
            return response
        })
    } else {
        return response
    }
}, error => {
    return Promise.reject(error)
})