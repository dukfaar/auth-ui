import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { fetchRoles } from '../redux/actions/roles.js'

import { Table, TableHead, TableBody, TableRow, TableCell, Card, CardContent } from 'material-ui'

class Role extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.role.name}</TableCell>
                <TableCell>{this.props.role.permissions.map(p => p.name)}</TableCell>
            </TableRow>
        )
    }
}

class RoleList extends React.Component {
    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Permissions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.roles.map(r => <Role key={r._id} role={r}/>)}
                </TableBody>
            </Table>
        )
    }
}

class RolePage extends React.Component {
    constructor(props) {
        super(props)

        this.props.fetchRoles()
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <RoleList roles={this.props.roles}/>
                </CardContent>
            </Card>
        )
    }    
}

export default connect ( 
    state => { return {
      roles: state.roles.roles
    } },
    dispatch => { return {
        fetchRoles: () => dispatch(fetchRoles())
    } }
)(RolePage)