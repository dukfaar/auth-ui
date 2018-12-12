import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'

import loginReducer from './login/reducer'

export const history = createHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export let store = createStore(
    combineReducers({
        router: routerReducer,
        login: loginReducer
    }),
    composeEnhancers(applyMiddleware(thunkMiddleware))
)