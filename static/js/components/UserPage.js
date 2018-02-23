import React from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'

import { fetchUsers } from '../redux/actions/user.js'
import { fetchPermissions } from '../redux/actions/permissions'
import { fetchRoles } from '../redux/actions/roles'

import { Table, TableHead, TableBody, TableRow, TableCell, Card, CardContent, Grid, Collapse, List, ListItem, ListItemText, ListItemIcon, TextField, Icon } from 'material-ui'
import withUserPermissions from '../common/withUserPermissions'

class UserPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.props.fetchUsers()    
    }

    selectUser = user => {
        this.setState({selectedUser: user})

        if(this.props.permissions.length === 0) this.props.fetchPermissions()
        if(this.props.roles.length === 0) this.props.fetchRoles()
    }

    toggleRole = role => {
        console.log(role)
    }

    togglePermission = permission => {
        console.log(permission)
    }

    selectedUserHasPermission(permissionName) {
        return _.find(this.state.selectedUser.permissions, p => p.name === permissionName )
    }

    selectedUserHasRole(roleName) {
        return _.find(this.state.selectedUser.roles, r => r.name === roleName )
    }

    render() {
        return (
                <Card>
                    <Grid container>
                        <Grid item xs={2} style={{borderRight: "1px solid grey"}}>
                            <List>
                                {this.props.users.map((u, i, array) => (<ListItem divider={i!=array.length-1} key={u._id} button onClick={() => this.selectUser(u)}><ListItemText primary={u.username}/></ListItem>))}
                            </List>
                        </Grid>

                        {this.state.selectedUser && this.props.hasPermission('user update') && <Grid item xs={10}>
                            <Grid container>
                                <Grid item xs={12} md={8}>
                                    <Grid container>
                                        <Grid item xs={12} md={6}>
                                            <TextField id="username" label="Username" value={this.state.selectedUser.username}/>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField id="email" label="E-Mail" value={this.state.selectedUser.email}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={2} style={{borderLeft: "1px solid grey"}}>
                                    <List>
                                        {this.props.roles.map((r, i, array) => (
                                        <ListItem divider={i!=array.length-1} key={r._id} button onClick={() => this.toggleRole(r)}>
                                            <ListItemIcon>
                                                {this.selectedUserHasRole(r.name)?<Icon style={{color: 'green'}}>done</Icon>:<Icon style={{color: 'red'}}>clear</Icon>}
                                            </ListItemIcon>
                                            <ListItemText primary={r.name}/>
                                        </ListItem>))}
                                    </List>
                                </Grid>
                                <Grid item xs={12} md={2} style={{borderLeft: "1px solid grey"}}>
                                    <List>
                                        {this.props.permissions.map((p, i, array) => (
                                        <ListItem divider={i!=array.length-1} key={p._id} button onClick={() => this.togglePermission(p)}>
                                            <ListItemIcon>
                                                {this.selectedUserHasPermission(p.name)?<Icon style={{color: 'green'}}>done</Icon>:<Icon style={{color: 'red'}}>clear</Icon>}
                                            </ListItemIcon>
                                            <ListItemText primary={p.name}/>
                                        </ListItem>))}
                                    </List>
                                </Grid>
                            </Grid>
                        </Grid>}
                    </Grid>
                </Card>                   
        )
    }    
}

export default connect ( 
    state => ({
        users: state.users.users,
        permissions: state.permissions.permissions,
        roles: state.roles.roles
    }),
    dispatch => ({
        fetchUsers: () => dispatch(fetchUsers()),
        fetchPermissions: () => dispatch(fetchPermissions()),
        fetchRoles: () => dispatch(fetchRoles())
    })
)(withUserPermissions(UserPage))