import React from 'react'
import { connect } from 'react-redux'

import { requestLoginData } from '../redux/login/actions'

import { TextField, Card, CardContent, CardActions, Button, Grid } from 'material-ui'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    sendLogin = (e) => {       
        this.props.requestLoginData(this.state.username, this.state.password)

        e.preventDefault()
    }

    render () {
        return (
            <Card>
                <form onSubmit={this.sendLogin}>
                    <CardContent>  
                        <Grid container>                   
                            <Grid item xs={12} sm={12}>
                                <TextField fullWidth type="text" name="username" label="Username" value={this.state.username} onChange={this.handleUsernameChange}/>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField fullWidth type="password" name="password" label="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                            </Grid>
                        </Grid>                       
                    </CardContent>

                    <CardActions>
                        <Button raised color="primary" onClick={this.sendLogin}>Login</Button>
                    </CardActions>
                </form>
            </Card>
        )
    }
}

export default connect ( 
    state => { return {
      user: state.loginData.user,
      accessToken: state.loginData.accessToken
    } },
    dispatch => { return {
        requestLoginData: (username, password) => dispatch(requestLoginData(username, password))
    } }
)(LoginForm)