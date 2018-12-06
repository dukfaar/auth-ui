import {store} from '../../redux/store'
import onError from './onError'

import {refreshAccessToken} from '../../redux/login/actions'

import find from 'lodash/find'

export default onError(({operation, response, graphQLErrors, networkError}) => {
    let tokenError = graphQLErrors && find(graphQLErrors, e => e.message === 'valid accesstoken is required')

    if(tokenError) {
        console.log(tokenError)
        return store.dispatch(refreshAccessToken())
    }

    return Promise.resolve(null)
})