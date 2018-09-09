import React from 'react'

import { createFragmentContainer, QueryRenderer, graphql } from 'react-relay'

import relayEnvironment from '../common/relay'

import { Table, TableHead, TableBody, TableRow, TableCell, Card, CardContent } from '@material-ui/core'

class _Leve extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.leve.name}</TableCell>
                <TableCell>{this.props.leve.xp}</TableCell>
                <TableCell>{this.props.leve.level}</TableCell>
            </TableRow>
        )
    }
}

const Leve = createFragmentContainer(_Leve,
    graphql`fragment LevePage_leve on Leve { name xp level }`
) 

class LeveList extends React.Component {
    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>XP</TableCell>
                        <TableCell>Level</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {_.map(this.props.leves.edges, n => <Leve key={n.node._id} leve={n.node}/>)}
                </TableBody>
            </Table>
        )
    }
}

class LevePage extends React.Component {
    render() {
        return (
            <Card>
                <CardContent>
                    <QueryRenderer
                        environment={relayEnvironment}
                        query={graphql`query LevePageListQuery { leves { edges { node { _id ...LevePage_leve } } } }`}
                        render={({ error, props }) => {
                            if (error) return <div>derp</div>
                            else if (!props) return <div>loading</div>
                            else return <LeveList leves={props.leves} />
                        }}
                    />
                </CardContent>
            </Card>
        )
    }    
}

export default LevePage