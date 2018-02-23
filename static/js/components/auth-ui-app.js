import React from 'react'
import { connect } from 'react-redux'

import Navigation from 'navigation/navigation'

import { ConnectedRouter } from 'react-router-redux'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { Drawer, Button, Reboot } from 'material-ui'

import { withStyles } from 'material-ui/styles'

import { store, history } from '../redux/store'

import { Routes } from 'navigation/routes'

const theme = createMuiTheme({
    palette: {
        type: 'dark'
    }
})

const drawerWidth = 240

const styles = theme => ({
    drawer: {
        position: 'relative',
        height: '100%',
        width: drawerWidth
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%'
    }
})

class AuthUiApp extends React.Component {
    render () {
        const { classes } = this.props

        let loggedIn = this.props.user !== null && this.props.user !== undefined

        let navLinks = [
            { href: '/', text: 'Home' },
            { href: '/user', text: 'User', requires: [ 'user read' ] },
            { href: '/client', text: 'Client', requires: [ 'client read'] },
            { href: '/permission', text: 'Permission', requires: [ 'permission read'] },
            { href: '/role', text: 'Role', requires: [ 'role read'] }
        ]

        if(!loggedIn) navLinks.push({ href: '/login', text: 'Login' })

        return (
            <MuiThemeProvider theme={theme}>
                <Reboot />
                <ConnectedRouter history={history}>
                    <div className={classes.appFrame}>
                        <Drawer variant="permanent" open classes={{paper: classes.drawer}}>
                            <Navigation links={navLinks}/>

                            {this.props.user?<Button>{this.props.user.username}</Button>:null}        
                        </Drawer>

                        <main className={classes.content}>      
                            <Routes/>                                    
                        </main>
                    </div>
                </ConnectedRouter>
            </MuiThemeProvider>
        )
    }
}

export default connect ( 
    state => { return {
      user: state.loginData.user,
    } },
    dispatch => { return {
    } }
)(withStyles(styles)(AuthUiApp))