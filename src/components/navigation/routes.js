import React from 'react'
import { Route } from 'react-router'

import LoginForm from 'loginForm'
import { Home } from 'home'
import UserPage from 'UserPage'
import ClientPage from 'ClientPage'
import RolePage from 'RolePage'
import PermissionPage from 'PermissionPage'
import LevePage from '../LevePage'  
import ClassPage from '../Class/ClassPage'

export class Routes extends React.Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={LoginForm}/>
                <Route path="/user" component={UserPage}/>  
                <Route path="/client" component={ClientPage}/>  
                <Route path="/role" component={RolePage}/>  
                <Route path="/permission" component={PermissionPage}/>
                <Route path="/leve" component={LevePage} />
                <Route path="/classes" component={ClassPage} />
            </div>
        )
    }
}