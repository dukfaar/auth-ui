import * as _ from 'lodash'

function toObjectById(input) {
    return _.reduce(input, (o, k) => {
        o[k._id] = k
        return o
    }, {})
}

export let clientsReducer = (state = {clients: []}, action) => {
    switch (action.type) {
        case 'SET CLIENTS': return {...state, clients: action.clients, byId: toObjectById(action.clients)}
        default: return state
    }
}

export let usersReducer = (state = {users: []}, action) => {
    switch (action.type) {
        case 'SET USERS': return {...state, users: action.users, byId: toObjectById(action.users)}
        default: return state
    }
}

export let roleReducer = (state = {roles: []}, action) => {
    switch (action.type) {
        case 'SET ROLES': return {...state, roles: action.roles, byId: toObjectById(action.roles)}
        default: return state
    }
}

export let permissionReducer = (state = {permissions: []}, action) => {
    switch (action.type) {
        case 'SET PERMISSIONS': return { ...state, permissions: action.permissions, byId: toObjectById(action.permissions) }
        case 'UPDATE PERMISSION': 
            let update = {}
            update[action.permission._id] = { ...state.byId[action.permission._id], ...action.permission }
        return { 
            ...state, 
            permissions: _.map(state.permissions, p => p._id === action.permission._id?{ ...p, ...action.permission}:p),
            byId: {
                ...state.byId,
                ...update
            }
         }
        default: return state
    }
}
