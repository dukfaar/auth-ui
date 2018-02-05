import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { fetchPermissions } from '../redux/actions/permissions.js'

import { Table, TableHead, TableBody, TableRow, TableCell, Card, CardContent } from 'material-ui'

class Permission extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.permission.name}</TableCell>
            </TableRow>
        )
    }
}

class PermissionList extends React.Component {
    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.permissions.map(p => <Permission key={p._id} permission={p}/>)}
                </TableBody>
            </Table>
        )
    }
}

class PermissionPage extends React.Component {
    constructor(props) {
        super(props)

        this.props.fetchPermissions()
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <PermissionList permissions={this.props.permissions}/>
                </CardContent>
            </Card>
        )
    }    
}

export default connect ( 
    state => { return {
      permissions: state.permissions.permissions
    } },
    dispatch => { return {
        fetchPermissions: () => dispatch(fetchPermissions())
    } }
)(PermissionPage)