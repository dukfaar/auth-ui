import React from 'react'
import { connect } from 'react-redux'

import { List } from '@material-ui/core'

import NavigationLink from './navigationLink'

import * as _ from 'lodash'

class Navigation extends React.Component {
    render() {
        let navItems = this.props.links.filter(this.props.isValidLink).map(link => (<NavigationLink key={link.text} link={link}></NavigationLink>))
        return (<List>{navItems}</List>)
    }
}

function mapStateToProps(state) {
    return {
        permissions: state.login && state.login.user && state.login.user.permissions
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

function mergeProps(state, dispatch, props) {
    return {
        ...state,
        ...dispatch,
        ...props,
        isValidLink: (link) => {
            return link.requires ? _.differenceWith(link.requires, state.permissions, (r, p) => r === p.name ).length===0 : true
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps, mergeProps)(Navigation)