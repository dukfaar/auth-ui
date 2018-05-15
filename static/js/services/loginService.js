import { store } from '../redux/store'
import { fetchAccountData } from '../redux/login/actions'
import * as Cookies from 'js-cookie'

let accessToken = Cookies.get('Authorization')
if(accessToken) {
    store.dispatch(fetchAccountData())
}