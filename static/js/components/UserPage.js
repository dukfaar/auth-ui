import React from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'

import { fetchUsers } from '../redux/actions/user.js'

import { Table, TableHead, TableBody, TableRow, TableCell, Card, CardContent } from 'material-ui'
import UserRow from './User/UserRow'

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
                    {this.props.users.map(u => <UserRow key={u._id} user={u}/>)}
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
    state => ({
        users: state.users.users
    }),
    dispatch => ({
        fetchUsers: () => dispatch(fetchUsers())
    })
)(UserPage)