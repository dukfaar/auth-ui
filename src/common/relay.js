import {
    Environment,
    Network,
    RecordSource,
    Store,
    fetchQuery as runtimeFetchQuery,
} from 'relay-runtime'

import { parse } from 'graphql'

import { SubscriptionClient } from 'subscriptions-transport-ws/dist/client'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink, makePromise, execute } from 'apollo-link'
import * as Cookies from 'js-cookie'

import checkForInvalidAccessToken from './relay/checkForInvalidAccessToken'

export const client = new SubscriptionClient(API_GATEWAY_WS,{
    reconnect: true,
    connectionParams: () => ({
        Authentication: Cookies.get('Authentication')
    })
})

const wsLink = new WebSocketLink(client)

let gatewayLink = ApolloLink.from([
    checkForInvalidAccessToken,
    wsLink
])

const setupSubscriptionClient = (operation, variables, cacheConfig, observer) => {
    let subscription = client.request({query: operation.text, variables})
    .subscribe({
        next: observer.onNext,
        error: observer.onError,
        complete: observer.onCompleted
    })

    return {
        dispose: () => subscription.unsubscribe()
    }
} 

const network = Network.create((operation, variables) => {
    return makePromise(execute(gatewayLink, {query: parse(operation.text), variables}))
}, setupSubscriptionClient)

const relayStore = new Store(new RecordSource()) 
const environment = new Environment({ network, store: relayStore })

export let fetchQuery = (query, variables) => {
    return runtimeFetchQuery(environment, query, variables)
}
  
export default environment