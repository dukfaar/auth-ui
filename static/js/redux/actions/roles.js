import axios from 'axios'

import config from '../../config'

export function fetchRoles() {
    return dispatch => {
        dispatch({type: 'FETCHING ROLES'})
        
        axios.post(`${config.AUTH_BACKEND_SERVER}`, {
            query: 'query { roles { _id name permissions { _id name } } }'
        })
        .then(response => {
            dispatch({type: 'SET ROLES', roles: response.data.data.roles })
        })
        .catch(err => {
            dispatch({type: 'FAILURE FETCHING ROLES', error: err})
        })
    }
}