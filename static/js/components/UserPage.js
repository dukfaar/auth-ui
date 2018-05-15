import React from 'react'
import * as _ from 'lodash'
import { QueryRenderer, createFragmentContainer } from 'react-relay'
import { graphql } from 'graphql'
import relayEnvironment from '../common/relay'

import { Table, TableHead, TableBody, TableRow, TableCell, Card, CardContent, Grid, Collapse, List, ListItem, ListItemText, ListItemIcon, TextField, Icon } from 'material-ui'
import withUserPermissions from '../common/withUserPermissions'
import { create } from 'domain';

class _UserPermission extends React.Component {
    render() {

    }
}

class _UserPermissionList extends React.Component {
    hasPermission(permissionName) {
        return _.find(this.props.user.permissions.edges, n => n.node.name === permissionName)
    }

    render() {
        return <List>
            {this.props.permissions.edges.map((n, i, array) => (
                <ListItem divider={i != array.length - 1} key={n.node._id} button onClick={() => this.togglePermission(n.node)}>
                    <ListItemIcon>
                        <Icon style={{ color: 'green' }}>done</Icon>
                    </ListItemIcon>
                    <ListItemText primary={n.node.name} />
                </ListItem>))}
        </List>
    }
}

const UserPermissionList = createFragmentContainer(
    _UserPermissionList,
    graphql`fragment UserPageUserDetailPermissions_user on User { permissions { edges { node { _id name } } } }`
)

class _UserRoleList extends React.Component {
    hasRole(roleName) {
        return _.find(this.props.user.roles.edges, n => n.node.name === roleName)
    }

    render() {
        return <List>
            {this.props.roles.edges.map((n, i, array) => (
                <ListItem divider={i != array.length - 1} key={n.node._id} button onClick={() => this.toggleRole(r)}>
                    <ListItemIcon>
                        <Icon style={{ color: 'green' }}>done</Icon>
                    </ListItemIcon>
                    <ListItemText primary={n.node.name} />
                </ListItem>))}
        </List>
    }
}

const UserRoleList = createFragmentContainer(
    _UserRoleList,
    graphql`fragment UserPageUserDetailRoles_user on User { roles { edges { node { _id name } } } }`
)

const User = createFragmentContainer(
    props => <div>{props.user.username}</div>
    , graphql`fragment UserPage_user on User { username }`)

class _UserDetail extends React.Component {
    render() {
        let props = this.props
        return <Grid container>
            <Grid item xs={12} md={8}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <TextField id="username" label="Username" value={props.user.username} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="email" label="E-Mail" value={props.user.email} />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} md={2} style={{ borderLeft: "1px solid grey" }}>
                <UserRoleList user={props.user} roles={props.roles} />
            </Grid>

            <Grid item xs={12} md={2} style={{ borderLeft: "1px solid grey" }}>
                <UserPermissionList user={props.user} permissions={props.permissions} />
            </Grid>
        </Grid>
    }
}

const UserDetail = createFragmentContainer(
    _UserDetail,
        graphql`fragment UserPageUserDetail_user on User { 
        _id username email 
        ...UserPageUserDetailRoles_user
        ...UserPageUserDetailPermissions_user
    }`
)

class UserPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    selectUser = user => {
        this.setState({ selectedUser: user })
    }

    toggleRole = role => {
        console.log(role)
    }

    togglePermission = permission => {
        console.log(permission)
    }

    render() {
        return (
            <Card>
                <Grid container>
                    <Grid item xs={2} style={{ borderRight: "1px solid grey" }}>
                        <List>
                            <QueryRenderer
                                query={graphql`query UserPageUsersQuery { 
                                    users { edges { node { _id ...UserPage_user } } }
                                }`}
                                environment={relayEnvironment}
                                render={({ error, props }) => {
                                    if (error) return <div>Ok, this is bad</div>
                                    if (!props) return <div>Still loading</div>
                                    else return _.map(props.users.edges, n => (
                                        <ListItem key={n.node._id} button onClick={() => this.selectUser(n.node._id)}>
                                            <User user={n.node}/>
                                        </ListItem>)
                                    )
                                }}
                            />
                        </List>
                    </Grid>

                    {this.state.selectedUser &&
                        <QueryRenderer
                            query={graphql`query UserPageUserQuery($userId: ID!) { 
                                user(id: $userId) { ...UserPageUserDetail_user }
                                permissions { edges { node { _id name } } }
                                roles { edges { node { _id name } } }
                            }`}
                            variables={{ userId: this.state.selectedUser }}
                            environment={relayEnvironment}
                            render={({ error, props }) => {
                                if (error) return <div>Ok, this is bad</div>
                                if (!props) return <div>Still loading</div>
                                else return <Grid item xs={10}>
                                    <UserDetail user={props.user} permissions={props.permissions} roles={props.roles}/>
                                </Grid>
                            }}
                        />
                    }
                </Grid>
            </Card>
        )
    }
}

export default withUserPermissions(UserPage)