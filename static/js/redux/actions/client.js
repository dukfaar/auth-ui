import axios from 'axios'

export function fetchClients() {
    return dispatch => {
        dispatch({type: 'FETCHING CLIENTS'})
        
        axios.post(`${AUTH_BACKEND_SERVER}`, {
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