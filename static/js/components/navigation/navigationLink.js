import React from 'react'

import { Link } from 'react-router-dom'

import { ListItem } from 'material-ui'

export default class NavigationLink extends React.Component {
    render() {
        return (<Link to={this.props.link.href}><ListItem button>{this.props.link.text}</ListItem></Link>)
    }
}