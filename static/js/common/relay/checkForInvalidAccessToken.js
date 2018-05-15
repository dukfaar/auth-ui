import {store} from '../../redux/store'
import onError from './onError'

import {refreshAccessToken} from '../../redux/login/actions'

export default onError(({operation, response, graphQLErrors, networkError}) => {
    let tokenError = graphQLErrors && _.find(graphQLErrors, e => e.message === 'valid accesstoken is required')

    if(tokenError) {
        return store.dispatch(refreshAccessToken())
    }

    return Promise.resolve(null)
})