import React from 'react'

import { createFragmentContainer, QueryRenderer, graphql } from 'react-relay'

import relayEnvironment from '../../common/relay'

import { Card, CardContent, Grid } from '@material-ui/core'

let ClassCard = createFragmentContainer(
  ({ c }) => (
    <Card>
      <CardContent>
        {c.name}
        {c.namespaceId}
        {c.maxLevel}
        {c.synonyms}
      </CardContent>
    </Card>
  ), graphql`fragment ClassPage_c on Class { name maxLevel namespaceId synonyms }`
)


let ClassList = ({ classes }) =>
  _.map(classes.edges, n => <Grid item key={n.node._id} xs={12} sm={6} md={4} lg={3}><ClassCard c={n.node} /></Grid>)


class ClassPage extends React.Component {
  render() {
    return (
      <Grid container spacing={16}>
        <QueryRenderer
          environment={relayEnvironment}
          query={graphql`query ClassPageListQuery { classes { edges { node { _id ...ClassPage_c } } } }`}
          render={({ error, props }) => {
            if (error) return <div>derp</div>
            else if (!props) return <div>loading</div>
            else return <ClassList classes={props.classes} />
          }}
        />
      </Grid>
    )
  }
}

export default ClassPage