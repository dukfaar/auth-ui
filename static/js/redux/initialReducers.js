import { addReducers } from './storeUtil'
import { routerReducer } from 'react-router-redux'

import * as reducers from './reducers'

addReducers({
    router: routerReducer,
    users: reducers.usersReducer,
    clients: reducers.clientsReducer,
    roles: reducers.roleReducer,
    permissions: reducers.permissionReducer
})