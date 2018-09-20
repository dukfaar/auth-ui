import React from 'react'

import { createFragmentContainer, QueryRenderer, graphql } from 'react-relay'

import relayEnvironment from '../common/relay'

import { Table, TableHead, TableBody, TableRow, TableCell, Card, CardContent } from '@material-ui/core'

class _Client extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.client.clientId}</TableCell>
                <TableCell>{this.props.client.clientSecret}</TableCell>
                <TableCell>{this.props.client.grants}</TableCell>
            </TableRow>
        )
    }
}

const Client = createFragmentContainer(_Client,
    graphql`fragment ClientPage_client on Client { clientId clientSecret grants }`
) 

class ClientList extends React.Component {
    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Client-Id</TableCell>
                        <TableCell>Client-Secret</TableCell>
                        <TableCell>Grants</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {_.map(this.props.clients.edges, n => <Client key={n.node._id} client={n.node}/>)}
                </TableBody>
            </Table>
        )
    }
}

class ClientPage extends React.Component {
    render() {
        return (
            <Card>
                <CardContent>
                    <QueryRenderer
                        environment={relayEnvironment}
                        query={graphql`query ClientPageListQuery { clients { edges { node { _id ...ClientPage_client } } } }`}
                        render={({ error, props }) => {
                            if (error) return <div>derp</div>
                            else if (!props) return <div>loading</div>
                            else return <ClientList clients={props.clients} />
                        }}
                    />
                </CardContent>
            </Card>
        )
    }    
}

export default ClientPage