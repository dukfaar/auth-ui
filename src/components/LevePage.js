import React from 'react'

import { createFragmentContainer, QueryRenderer, graphql } from 'react-relay'

import relayEnvironment from '../common/relay'

import { Table, TableHead, TableBody, TableRow, TableCell, Card, CardContent } from '@material-ui/core'

import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import filter from 'lodash/filter'

class _Leve extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.leve.name}</TableCell>
                <TableCell>{this.props.leve.xp}</TableCell>
                <TableCell>{this.props.leve.level}</TableCell>
                <TableCell>{this.props.leve.class}</TableCell>
                <TableCell>{this.props.leve.gil}</TableCell>
            </TableRow>
        )
    }
}

const Leve = createFragmentContainer(_Leve,
    graphql`fragment LevePage_leve on Leve { name xp level gil class }`
) 

class LeveList extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        minLevel: 15,
        maxLevel: 20
      }
    }

    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>XP</TableCell>
                        <TableCell>Level</TableCell>
                        <TableCell>Class</TableCell>
                        <TableCell>Gil</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {map(
                      sortBy(
                        filter(
                          this.props.leves.edges,
                          n => n.node.level >= this.state.minLevel && n.node.level <= this.state.maxLevel && n.node.xp > 0
                        ), 
                        n => n.node.level
                      ),
                      n => <Leve key={n.node._id} leve={n.node}/>)
                    }
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
                        query={graphql`query LevePageListQuery { leves { edges { node { _id level xp ...LevePage_leve } } } }`}
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