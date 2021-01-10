import React from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';

class Login extends React.Component {

    state = {
        username: '',
        password: '',
        showPassword: false,
        serverResponseBadPassword: false,
        serverResponseNoSuchUsername: false,
        serverResponseNoResponse: false
    };

    componentDidMount = () => { 
        this.setState ({
        })
    }

    componentDidUpdate = () => {    
    }

    handleClickShowPassword = () => {
        if (this.state.showPassword === false) {
            this.setState({
                showPassword: true
            });
        }
        else {
            this.setState({
                showPassword: false
            });
        }
    }

    handleMouseDownPassword = () => {
    }

    handleChange = (prop) => (event) => {
        this.setState({ 
            ...this.state, 
            [prop]: event.target.value 
        });
      };

    handleSubmit = () => {
        /// chestii de facut cand se apasa submit pe butonu de CREATE ACCOUNT
        console.log('onClick');
        axios.post('http://localhost:8090/login',{
            "userName" : this.state.username,
            "passwd"   : this.state.password
        }).then(res => {
            console.log(res);
            console.log(res.data);
            console.log(this.props);
            this.props.login_logout();
            setTimeout(() => {
                this.props.set_token(res.data.token, this.state.username, this.props);
                this.props.history.push('/');
            }, 1000);
        }).catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                console.log(error.response.status);
                if (error.response.status === 400) {
                    // exista user-ul dar parola proasta
                    setTimeout(() => {
                        this.setState({ serverResponseBadPassword: !this.state.serverResponseBadPassword });   
                    }, 0);  // semnaleaza eroare print-un mesaj
                    setTimeout(() => {
                        this.setState({ serverResponseBadPassword: !this.state.serverResponseBadPassword });
                    }, 1500);  /// fa sa dispara mesajul de eroare
                } else if (error.response.status === 500) {
                    // nu exista niciun user nu acest nume
                    setTimeout(() => {
                        this.setState({ serverResponseNoSuchUsername: !this.state.serverResponseNoSuchUsername });   
                    }, 0);  // semnaleaza eroare print-un mesaj
                    setTimeout(() => {
                        this.setState({ serverResponseNoSuchUsername: !this.state.serverResponseNoSuchUsername });
                    }, 1500);  /// fa sa dispara mesajul de eroare
                }
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the 
                // browser and an instance of
                // http.ClientRequest in node.js

                setTimeout(() => {
                    this.setState({ serverResponseNoResponse: !this.state.serverResponseNoResponse });   
                }, 0);  // semnaleaza eroare print-un mesaj

                setTimeout(() => {
                    this.setState({ serverResponseNoResponse: !this.state.serverResponseNoResponse });
                }, 1500);  /// fa sa dispara mesajul de eroare

                // console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
            }
            /// console.log(error.config);
        });
    }

    render () {

        const {
            username,
            password,
            showPassword,
            serverResponseNoResponse,
            serverResponseBadPassword,
            serverResponseNoSuchUsername
        } = this.state;

        return (
            <div className>
                {
                    /// alert message
                    (!serverResponseNoResponse) ?
                    <div>
                    </div>
                    :
                        <div style={{marginTop: 80,
                                    marginBottom: -30
                            }}>   
                            <Alert variant="filled" severity="warning">
                                An error has occurred. We're very sorry, please try again to login.
                            </Alert>
                        </div>
                }

                {
                    /// alert message
                    (!serverResponseBadPassword) ?
                    <div>
                    </div>
                    :
                        <div style={{marginTop: 80,
                                    marginBottom: -30
                            }}>   
                            <Alert variant="filled" severity="warning">
                                You have entered an incorrect password. Try again.
                            </Alert>
                        </div>
                }

                {
                    /// alert message
                    (!serverResponseNoSuchUsername) ?
                    <div>
                    </div>
                    :
                        <div style={{marginTop: 80,
                                    marginBottom: -30
                            }}>   
                            <Alert variant="filled" severity="warning">
                                There are not users with this particular name. Try sign up?
                            </Alert>
                        </div>
                }

            </div>
        )
    }
}

export default (Login);