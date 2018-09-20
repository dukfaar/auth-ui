import React from 'react'

import { 
    graphql, 
    createRefetchContainer, 
    requestSubscription,
    commitMutation
} from 'react-relay'  

import {
    TableRow,
    TableCell,
    Chip,
    TextField
} from '@material-ui/core'

import relayEnvironment from '../../common/relay'

const updateRoleMutation = graphql`mutation RoleUpdate_Mutation($id: ID!, $input: RoleInput!) { updateRole(id: $id, input: $input) { _id } }`
const roleUpdatedSubscription = graphql`subscription RoleUpdatedSubscription { roleUpdated { _id name permissions { edges { node { _id name }}} } }`

class Role extends React.Component {
    componentDidMount() {
        this.updatedSubscription = requestSubscription(relayEnvironment,
            {
                subscription: roleUpdatedSubscription,
                variables: {},
                onNext: role => {
                    this.props.relay.refetch({id: this.props.role._id}, null, null, { force: true })
                },
                updater: store => {
                    console.log(store)
                }
            }
        )
    }

    componentWillUnmount() {
        this.updatedSubscription.dispose()
    }

    setNewPermissions(permissions) {
        commitMutation(relayEnvironment, {
            mutation: updateRoleMutation,
            variables: {
                id: this.props.role._id,
                input: {
                    permissions
                }
            }
        })
    }

    removePermission(permission) {
        this.setNewPermissions( _.reject(_.map(this.props.role.permissions.edges, p => p.node._id), p => p === permission._id))
    }

    processKeyPress = (event) => {
        const key = event.key
        if(key === 'Enter') {
            let newPermissionName = event.target.value

            let permission = _.find(this.props.permissions.edges, p => p.node.name === newPermissionName)

            this.setNewPermissions(_.concat(_.map(this.props.role.permissions.edges, p => p.node._id), permission.node._id))
        }
    }

    render() {
        return (
            <TableRow>
                <TableCell>{this.props.role.name}</TableCell>
                <TableCell>
                    {_.map(this.props.role.permissions.edges, e => 
                        <Chip key={e.node._id} label={e.node.name} onDelete={() => this.removePermission(e.node)}/>
                    )}
                    <TextField label="New Permission" onKeyPress={this.processKeyPress}/>
                </TableCell>
            </TableRow>
        )
    }
}

export default createRefetchContainer(Role,
    { role: graphql`fragment Role_role on Role { _id name permissions { edges { node { _id name } } } }` },
    graphql`query Role_roleRefetchQuery($id: ID!) { role(id: $id) { ...Role_role } }`
) 