import axios from 'axios'

import config from '../../config'

export function fetchUsers() {
    return dispatch => {
        dispatch({type: 'FETCHING USERS'})
        
        axios.post(`${config.AUTH_BACKEND_SERVER}`, {
            query: 'query { users { _id username email roles { _id name } } }'
        })
        .then(response => {
            dispatch({type: 'SET USERS', users: response.data.data.users })
        })
        .catch(err => {
            dispatch({type: 'FAILURE FETCHING USERS', error: err})
        })
    }
}