import React from 'react'

import {
    graphql,
    QueryRenderer,
    createFragmentContainer,
    commitMutation,
    requestSubscription,
    createRefetchContainer
} from 'react-relay'

import relayEnvironment from '../common/relay'

import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Card,
    CardContent,
    Button,
    TextField,
    Dialog,
    DialogTitle, 
    DialogActions, 
    DialogContent
} from '@material-ui/core'

let createPermissionMutation = graphql`mutation PermissionPageCreatePermissionMutation($name: String!) { createPermission(name: $name) { _id name } }`

class _Permission extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.permission.name}</TableCell>
            </TableRow>
        )
    }
}

const Permission = createFragmentContainer(_Permission,
    graphql`fragment PermissionPage_permission on Permission { name }`
)

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
                    {this.props.permissions.edges.map(edge => <Permission key={edge.node._id} permission={edge.node} />)}
                </TableBody>
            </Table>
        )
    }
}

let permissionsQuery = graphql`query PermissionPageListQuery { permissions { edges { node { _id ...PermissionPage_permission } } } }`
let permissionCreatedSubscription = graphql`subscription PermissionPagePermissionCreatedSubscription { permissionCreated { _id name } }`

class PermissionPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = { newPermissionDialogOpen: false, newPermissionName: '' }
    }

    componentDidMount() {
        this.createdSubscription = requestSubscription(relayEnvironment,
            {
                subscription: permissionCreatedSubscription,
                variables: {},
                onNext: permission => {
                    this.props.relay.refetch({}, null, null, { force: true })
                }
            }
        )
    }

    componentWillUnmount() {
        this.createdSubscription.dispose()
    }

    closeDialog() {
        this.setState({ newPermissionDialogOpen: false })
    }

    openDialog() {
        this.setState({ newPermissionDialogOpen: true })
    }

    createPermission() {
        let newPermissionName = this.state.newPermissionName

        commitMutation(relayEnvironment,
            {
                mutation: createPermissionMutation,
                variables: {
                    name: newPermissionName
                },
                onCompleted: (response, errors) => {
                    this.closeDialog()
                }
            }
        )
    }

    render() {
        return (
            <div>
                <Card>
                    <CardContent>
                        <QueryRenderer
                            environment={relayEnvironment}
                            query={permissionsQuery}
                            render={({ error, props }) => {
                                if (error) return <div>derp</div>
                                else if (!props) return <div>loading</div>
                                else return <PermissionList permissions={props.permissions} />
                            }}
                        />
                    </CardContent>

                    <Dialog
                        open={this.state.newPermissionDialogOpen}
                        onClose={this.closeDialog}
                    >
                        <DialogTitle>Create new Permission</DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField
                                    label="Name"
                                    name="name"
                                    onChange={e => this.setState({ newPermissionName: e.target.value })}
                                />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.createPermission()}>Create</Button>
                            <Button onClick={() => this.closeDialog()}>Cancel</Button>
                        </DialogActions>
                    </Dialog>


                </Card>
                <Button
                    style={{ position: 'absolute', bottom: '1em', right: '1em' }}
                    variant="fab"
                    onClick={() => this.openDialog()}
                >
                    +
                </Button>
            </div>
        )
    }
}

export default PermissionPage