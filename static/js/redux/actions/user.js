import axios from 'axios'

export function fetchUsers() {
    return dispatch => {
        dispatch({type: 'FETCHING USERS'})
        
        axios.post(`${AUTH_BACKEND_SERVER}`, {
            query: 'query { users { _id username email roles { _id name } permissions { _id name } } }'
        })
        .then(response => {
            dispatch({type: 'SET USERS', users: response.data.data.users })
        })
        .catch(err => {
            dispatch({type: 'FAILURE FETCHING USERS', error: err})
        })
    }
}