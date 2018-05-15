import { ApolloLink, Observable } from 'apollo-link'

export default function onError(errorHandler) {
    return new ApolloLink((operation, forward) => {
        return new Observable(observer => {
            let next = result => {
                if(result.errors) {
                    errorHandler({
                        graphQLErrors: result.errors,
                        response: result,
                        operation
                    })
                    .then(result => observer.next(result))
                    .catch(e => observer.error(error))
                } else {
                    observer.next(result)
                }
            }

            let error = networkError => {
                errorHandler({
                    graphQLErrors: networkError.result && networkError.result.errors,
                    networkError,
                    operation
                })
                .then(result => observer.next(result))
                .catch(e => observer.error(networkError))
            }

            let sub
            try {
                sub = forward(operation).subscribe({
                    next, error, 
                    complete: observer.complete.bind(observer)
                })
            } catch(e) {
                errorHandler({ networkError: e })
                .then(result => observer.error(e) )
                .catch(error => observer.error(e))
            }

            return () => {
                if(sub) sub.unsubscribe()
            }
        })
    })
}