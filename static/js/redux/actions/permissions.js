import axios from 'axios'

import config from '../../config'

export function fetchPermissions() {
    return dispatch => {
        dispatch({type: 'FETCHING PERMISSIONS'})
        
        axios.post(`${config.AUTH_BACKEND_SERVER}`, {
            query: 'query { permissions { _id name } }'
        })
        .then(response => {
            dispatch({type: 'SET PERMISSIONS', permissions: response.data.data.permissions })
        })
        .catch(err => {
            dispatch({type: 'FAILURE FETCHING PERMISSIONS', error: err})
        })
    }
}