import * as Cookies from 'js-cookie'

import { graphql } from 'react-relay'
import { fetchQuery, client } from '../../common/relay'

export function requestLoginData(username, password) {
    return dispatch => {
        dispatch({ type: 'REQUESTING LOGIN' })
        return fetchQuery(
            graphql`query actionsLoginQuery($username: String!, $password: String!, $clientId: String!, $clientSecret: String!) { login(username: $username, password: $password, clientId: $clientId, clientSecret: $clientSecret) { accessToken refreshToken } }`
            ,{
                username, password,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET
            }
        ).then(response => {
            dispatch(receiveLoginData(response.login))  
        }).catch(error => {
            dispatch(requestLoginDataFailed())
        })
    }
}

export function refreshAccessToken() {
    return dispatch => {
        dispatch({type: 'REFRESHING ACCESSTOKEN'})
        return fetchQuery(
            graphql`query actionsRefreshQuery($token: String!, $clientId: String!, $clientSecret: String!) { refresh(refreshToken: $token, clientId: $clientId, clientSecret: $clientSecret) { accessToken refreshToken } }`
            ,{
                token: Cookies.get('RefreshToken'),
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET
            }
        ).then(response => {
            dispatch(receiveLoginData(response.refresh))  
        }).catch(error => {
            dispatch(requestLoginDataFailed())
        })
    }
}

export function receiveLoginData(loginData) {
    return dispatch => {
        dispatch({ type: 'LOGIN DATA RECEIVED' })

        Cookies.set('Authentication', `Bearer ${loginData.accessToken}`)
        Cookies.set('RefreshToken', loginData.refreshToken)

        client.close()

        return dispatch(fetchAccountData())
    }
}

export function fetchAccountData() {
    return dispatch => {
        dispatch({ type: 'FETCHING ACCOUNTDATA'})  
        
        return fetchQuery(graphql`query actionsMeQuery { me { _id username email permissions { edges { node { name } } } } }`)
        .then(response => {
            let me = _.assign({}, response.me)
            me.permissions = _.map(me.permissions.edges, e => e.node)
            dispatch({ type: 'SET USER', user: me })
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