import {
    Environment,
    Network,
    RecordSource,
    Store,
    fetchQuery as runtimeFetchQuery
} from 'relay-runtime'

import {parse} from 'graphql'

import { SubscriptionClient, Middleware } from 'subscriptions-transport-ws/dist/client'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink, Operation, concat, makePromise, execute } from 'apollo-link'

import checkForInvalidAccessToken from './relay/checkForInvalidAccessToken'

export const client = new SubscriptionClient(API_GATEWAY_WS,{
    reconnect: true,
})

const wsLink = new WebSocketLink(client)

let gatewayLink = ApolloLink.from([
    checkForInvalidAccessToken,
    wsLink
])

const setupSubscriptionClient = (operation, variables, cacheConfig, observer) => {
    let subscription = client.request({query: operation.text, variables})
    .subscribe({
        onNext: observer.onNext,
        onError: observer.onError,
        onComplete: observer.onCompleted
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