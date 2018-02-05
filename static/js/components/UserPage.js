import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { fetchUsers } from '../redux/actions/user.js'

import { Table, TableHead, TableBody, TableRow, TableCell, Card, CardContent } from 'material-ui'

class User extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.user.username}</TableCell>
                <TableCell>{this.props.user.email}</TableCell>
                <TableCell>{this.props.user.roles.map(r => r.name)}</TableCell>
            </TableRow>
        )
    }
}

class UserList extends React.Component {
    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Roles</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.users.map(u => <User key={u._id} user={u}/>)}
                </TableBody>
            </Table>
        )
    }
}

class UserPage extends React.Component {
    constructor(props) {
        super(props)

        this.props.fetchUsers()
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <UserList users={this.props.users}/>
                </CardContent>
            </Card>
        )
    }    
}

export default connect ( 
    state => { return {
      users: state.users.users
    } },
    dispatch => { return {
        fetchUsers: () => dispatch(fetchUsers())
    } }
)(UserPage)