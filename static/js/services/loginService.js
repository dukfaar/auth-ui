import { store } from '../redux/store'
import { fetchAccountData } from '../redux/login/actions'

let refreshToken = JSON.parse(localStorage.getItem('refreshtoken'))
if(refreshToken) {
    store.dispatch({ type: 'SET REFRESHTOKEN', token: refreshToken })
}

let expiryDate = JSON.parse(localStorage.getItem('accesstokenvaliduntil'))
if(expiryDate) {
    store.dispatch({ type: 'SET LOGINEXPIRETIME', token: expiryDate })
}

let accessToken = JSON.parse(localStorage.getItem('accesstoken'))
if(accessToken) {
    store.dispatch({ type: 'SET ACCESSTOKEN', token: accessToken })
    store.dispatch(fetchAccountData())
}