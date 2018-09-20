import React from 'react'
import ReactDOM from 'react-dom'

import './interceptors'

import './services/loginService'

import services from './services'

import AuthUiApp from './components/auth-ui-app'

import { Provider } from 'react-redux'

import {store} from './redux/store'

import 'typeface-roboto'

ReactDOM.render(
    <Provider store={store}>
        <AuthUiApp/>
    </Provider>, 
    document.getElementById('mainAppBody')
)