import React from 'react'
import { Route } from 'react-router'
import Loadable from 'react-loadable'

import Home from '../home'

const Loading = () => <div>Loading</div>

export class Routes extends React.Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Loadable({loader: () => import('../loginForm'), loading: Loading})}/>
                <Route path="/user" component={Loadable({loader: () => import('../UserPage'), loading: Loading})}/>  
                <Route path="/client" component={Loadable({loader: () => import('../ClientPage'), loading: Loading})}/>  
                <Route path="/role" component={Loadable({loader: () => import('../RolePage'), loading: Loading})}/>  
                <Route path="/permission" component={Loadable({loader: () => import('../PermissionPage'), loading: Loading})}/>
                <Route path="/leve" component={Loadable({loader: () => import('../LevePage'), loading: Loading})} />
                <Route path="/classes" component={Loadable({loader: () => import('../Class/ClassPage'), loading: Loading})} />
            </div>
        )
    }
}