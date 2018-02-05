import React from 'react'
import { connect } from 'react-redux'

import { List } from 'material-ui'

import NavigationLink from './navigationLink'

class Navigation extends React.Component {
    isValidLink(link) {
        return true
    }

    render() {
        let navItems = this.props.links.filter(this.isValidLink).map(link => (<NavigationLink key={link.text} link={link}></NavigationLink>))
        return (<List>{navItems}</List>)
    }
}

function mapStateToProps(state) {
    return {
        permissions: state.loginData && state.loginData.user && state.loginData.user.permissions
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Navigation)