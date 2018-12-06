import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'typeface-roboto'

import './interceptors'

import './services/loginService'

import services from './services'

import AuthUiApp from './components/auth-ui-app'

import {store} from './redux/store'

import { register as registerServiceWorker} from './registerServiceWorker'

ReactDOM.render(
    <Provider store={store}>
        <AuthUiApp/>
    </Provider>, 
    document.getElementById('mainAppBody')
)

registerServiceWorker()