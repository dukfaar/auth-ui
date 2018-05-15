import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'

import loginReducer from './login/reducer'

export const history = createHistory()

export let store = createStore(
    combineReducers({
        router: routerReducer,
        login: loginReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunkMiddleware    
    )
)