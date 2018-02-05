import { combineReducers } from 'redux'
import { store } from './store'

let currentReducers = {   
}

export function addReducer(stateName, reducer) {
    currentReducers[stateName] = reducer
    store.replaceReducer(combineReducers(currentReducers))
}

export function addReducers(reducers) {
    for(let key in reducers) {
        currentReducers[key] = reducers[key]
    }
    store.replaceReducer(combineReducers(currentReducers))
}
