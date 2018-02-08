import axios from 'axios'

import config from '../../config'

export function fetchClients() {
    return dispatch => {
        dispatch({type: 'FETCHING CLIENTS'})
        
        axios.post(`${config.AUTH_BACKEND_SERVER}`, {
            query: 'query { clients { _id clientId clientSecret grants } }'
        })
        .then(response => {
            dispatch({type: 'SET CLIENTS', clients: response.data.data.clients })
        })
        .catch(err => {
            dispatch({type: 'FAILURE FETCHING CLIENTS', error: err})
        })
    }
}