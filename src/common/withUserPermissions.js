import React from 'react'
import { connect } from 'react-redux'

import find from 'lodash/find'

const mapStateToProps = state => ({
    permissions: state.loginData && state.loginData.user && state.loginData.user.permissions
})

const mapDispatchToProps = dispatch => ({

})

const mergeProps = (state, dispatch, props) => ({
    ...state,
    ...dispatch,
    ...props,
    hasPermission: permissionName => find(state.permissions, p => p.name === permissionName)
})

export default function withUserPermissions(WrappedComponent) {
    return connect(
        mapStateToProps, 
        mapDispatchToProps,
        mergeProps
    )(props => { 
        return (<WrappedComponent {...props}/>)
    })
}