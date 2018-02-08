import axios from 'axios'
import Querystring from 'query-string'

import config from '../../config'

export function requestLoginData(username, password) {
    const loginRefreshOptions = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        auth: {
            username: config.CLIENT_ID,
            password: config.CLIENT_SECRET
        }
    }

    return dispatch => {
        dispatch({ type: 'REQUESTING LOGIN' })
        return axios.post(`${config.AUTH_BACKEND_SERVER}/oauth/token`, 
            Querystring.stringify({
                username: username, 
                password: password,
                grant_type: 'password'
            }),
            loginRefreshOptions
        ).then(response => {
            dispatch(receiveLoginData(response.data))  
        }).catch(error => {
            dispatch(requestLoginDataFailed())
        })
    }
}

export function refreshAccessToken(refreshToken) {
    const loginRefreshOptions = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        auth: {
            username: config.CLIENT_ID,
            password: config.CLIENT_SECRET
        }
    }

    return dispatch => {
        dispatch({type: 'REFRESHING ACCESSTOKEN'})
        return axios.post(`${config.AUTH_BACKEND_SERVER}/oauth/token`, 
            Querystring.stringify({
                refresh_token: refreshToken, 
                grant_type: 'refresh_token'
            }),
            loginRefreshOptions
        ).then(response => {
            dispatch(receiveLoginData(response.data)) 
            return response 
        }).catch(error => {
            dispatch(requestLoginDataFailed())
            throw error
        })
    }
}

export function receiveLoginData(loginData) {
    return dispatch => {
        dispatch({ type: 'LOGIN DATA RECEIVED' })

        let expiryDate = new Date() + loginData.expires_in

        localStorage.setItem('accesstoken', JSON.stringify(loginData.access_token))
        localStorage.setItem('refreshtoken', JSON.stringify(loginData.refresh_token))
        localStorage.setItem('accesstokenvaliduntil', JSON.stringify(expiryDate))

        dispatch({ type: 'SET ACCESSTOKEN', token: loginData.access_token })
        dispatch({ type: 'SET REFRESHTOKEN', token: loginData.refresh_token })
        dispatch({ type: 'SET LOGINEXPIRETIME', token: expiryDate })

        return dispatch(fetchAccountData())
    }
}

export function fetchAccountData() {
    return dispatch => {
        dispatch({ type: 'FETCHING ACCOUNTDATA'})   

        return axios.post(`${config.AUTH_BACKEND_SERVER}`, {
            query: 'query { me { _id username email permissions { _id name } } }'
        })
        .then(response => {
            if(response.data.errors && response.data.errors[0].message === 'valid accesstoken is required') {
                dispatch({ type: 'ACCESSTOKEN INVALID'})  
                dispatch(refreshAccessToken(0))
            } else {
                dispatch({ type: 'SET USER', user: response.data.data.me })
            }
        })
        .catch(err => {
            dispatch(requestFetchAccountDataFailed())
        })
    }
}

export function requestLoginDataFailed() {
    return { type: 'REQUEST_LOGIN_FAILED' } 
}

export function requestFetchAccountDataFailed() {
    return { type: 'REQUEST_FETCHACCOUNTDATA_FAILED' }
}