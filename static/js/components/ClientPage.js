import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { fetchClients } from '../redux/actions/client'

import { Table, TableHead, TableBody, TableRow, TableCell, Card, CardContent } from 'material-ui'

class Client extends React.Component {
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
                    {this.props.clients.map(c => <Client key={c._id} client={c}/>)}
                </TableBody>
            </Table>
        )
    }
}

class ClientPage extends React.Component {
    constructor(props) {
        super(props)

        this.props.fetchClients()
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <ClientList clients={this.props.clients}/>
                </CardContent>
            </Card>
        )
    }    
}

export default connect ( 
    state => { return {
      clients: state.clients.clients
    } },
    dispatch => { return {
        fetchClients: () => dispatch(fetchClients())
    } }
)(ClientPage)