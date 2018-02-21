import React from 'react'
import * as _ from 'lodash'

import { TableRow, TableCell, TextField, Chip } from 'material-ui'

import withUserPermissions from '../../common/withUserPermissions'

class UserRow extends React.Component {
    nonEditable() {
        return (<TableRow>
            <TableCell>{this.props.user.username}</TableCell>
            <TableCell>{this.props.user.email}</TableCell>
            <TableCell>{this.props.user.roles.map(r => r.name)}</TableCell>
        </TableRow>)
    }

    handleRoleDelete = (role) => () => {
        console.log(`delete ${role} from ${this.props.user}`)
    }

    editable() {
        return (
        <TableRow>
            <TableCell>
                <TextField value={this.props.user.username} />
            </TableCell>
            <TableCell>
                <TextField value={this.props.user.email} />
            </TableCell>
            <TableCell>
                {this.props.user.roles.map(r => <Chip key={r.name} label={r.name} onDelete={this.handleRoleDelete(r)}/>)}
            </TableCell>
        </TableRow>
        )
    }

    render() {
        return this.props.hasPermission('user update') ? this.editable() : this.nonEditable()
    }
}

export default withUserPermissions(UserRow)
