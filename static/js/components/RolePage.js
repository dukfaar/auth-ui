import React from 'react'
import axios from 'axios'
import { graphql, QueryRenderer, createFragmentContainer, createRefetchContainer, commitMutation, requestSubscription } from 'react-relay'

import relayEnvironment from '../common/relay'

import { Table, TableHead, TableBody, TableRow, TableCell, Card, CardContent, TextField, Button } from 'material-ui'

import Dialog, {
    DialogTitle, DialogActions, DialogContent
} from 'material-ui/Dialog'

class _Role extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.role.name}</TableCell>
                <TableCell>{_.join(_.map(this.props.role.permissions.edges, e => e.node.name), ', ')}</TableCell>
            </TableRow>
        )
    }
}

const Role = createFragmentContainer(_Role,
    graphql`fragment RolePage_role on Role { name permissions { edges { node { name } } } }`
) 

const roleCreatedSubscription = graphql`subscription RolePageRoleCreatedSubscription { roleCreated { _id name } }`

class _RoleList extends React.Component {
    componentDidMount() {
        this.createdSubscription = requestSubscription(relayEnvironment,
            {
                subscription: roleCreatedSubscription,
                variables: {},
                onNext: role => {
                    this.props.relay.refetch({}, null, null, { force: true })
                }
            }
        )
    }

    componentWillUnmount() {
        this.createdSubscription.dispose()
    }

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
                    {_.map(this.props.roles.edges, e => <Role key={e.node._id} role={e.node}/>)}
                </TableBody>
            </Table>
        )
    }
}

const RolePageRolesQuery = graphql`query RolePageQuery { roles { ...RolePage_roles } }`

const RoleList = createRefetchContainer(
    _RoleList,
    graphql`fragment RolePage_roles on RoleConnection { edges { node { _id ...RolePage_role } } }`,
    RolePageRolesQuery
)

let createRoleMutation = graphql`mutation RolePageCreateRoleMutation($name: String!) { createRole(name: $name) { _id name } }`

class RolePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = { newRoleDialogOpen: false, newRoleName: '' }
    }

    closeDialog() {
        this.setState({ newRoleDialogOpen: false })
    }

    openDialog() {
        this.setState({ newRoleDialogOpen: true })
    }

    createRole() {
        let newRoleName = this.state.newRoleName

        commitMutation(relayEnvironment,
            {
                mutation: createRoleMutation,
                variables: {
                    name: newRoleName
                },
                onCompleted: (response, errors) => {
                    this.closeDialog()
                }
            }
        )
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <QueryRenderer
                        environment={relayEnvironment}
                        query={RolePageRolesQuery}
                        render={({ error, props }) => {
                            if (error) return <div>derp</div>
                            else if (!props) return <div>loading</div>
                            else return <RoleList roles={props.roles} />
                        }}
                        />
                </CardContent>

                 <Dialog
                        open={this.state.newRoleDialogOpen}
                        onClose={this.closeDialog}
                    >
                        <DialogTitle>Create new Role</DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField
                                    label="Name"
                                    name="name"
                                    onChange={e => this.setState({ newRoleName: e.target.value })}
                                />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.createRole()}>Create</Button>
                            <Button onClick={() => this.closeDialog()}>Cancel</Button>
                        </DialogActions>
                    </Dialog>

                <Button
                    style={{ position: 'absolute', bottom: '1em', right: '1em' }}
                    variant="fab"
                    onClick={() => this.openDialog()}
                >
                    +
                </Button>
            </Card>
        )
    }    
}

export default RolePage