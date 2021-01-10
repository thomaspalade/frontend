import React from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';
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

class SignUpPage extends React.Component {

    state = {
        username: '',
        password: '',
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        age: '',
        country: '',
        city: '',
        favoriteSite: '',
        showPassword: false,
        serverResponseUsernameNotAvailable: false,
        serverResponseNoResponse: false,
        serverResponseAccountCreatedSuccessfully: false
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
        /// send it to back-end/andor - mongodb
        axios.post("http://localhost:4000/users/register",{
            "firstName": "Thosdsmas",
            "lastName": "Palasdsdde",
            "username": "tomix",
            "password": "golanu"
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                setTimeout(() => {
                    this.setState({ serverResponseAccountCreatedSuccessfully: !this.state.serverResponseAccountCreatedSuccessfully });
                }, 0);
                setTimeout(() => {
                    this.setState({ serverResponseAccountCreatedSuccessfully: !this.state.serverResponseAccountCreatedSuccessfully });
                }, 1800);
                setTimeout(() => {
                    this.props.history.push('/');
                }, 2000);
            }
            ).catch((error) => {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    console.log(error.response.status);
                    if (error.response.status === 400) {
                        // username-ul este deja utilizat de altcineva, incearca cu altul
                        setTimeout(() => {
                            this.setState({ serverResponseUsernameNotAvailable: !this.state.serverResponseUsernameNotAvailable });   
                        }, 0);  // semnaleaza eroare print-un mesaj
                        setTimeout(() => {
                            this.setState({ serverResponseUsernameNotAvailable: !this.state.serverResponseUsernameNotAvailable });
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
            firstName,
            lastName,
            showPassword,
            serverResponseUsernameNotAvailable,
            serverResponseNoResponse,
            serverResponseAccountCreatedSuccessfully
        } = this.state;

        const {
            classes
        } = this.props;

        return (
            <div className>
                {
                    /// alert message
                    (!serverResponseNoResponse) ?
                    <div>
                    </div>
                    :
                        <div style={{marginTop: 80,
                                    marginBottom: 100
                            }}>   
                            <Alert variant="filled" severity="warning">
                                An error has occurred. We're very sorry, please try again to create the account.
                            </Alert>
                        </div>
                }

                {
                    /// alert message
                    (!serverResponseUsernameNotAvailable) ?
                    <div>
                    </div>
                    :
                        <div style={{marginTop: 80,
                                    marginBottom: 100
                            }}>   
                            <Alert variant="filled" severity="warning">
                                We're sorry! The username is not available. Change it and try again.
                            </Alert>
                        </div>
                }

                {
                    /// alert message
                    (!serverResponseAccountCreatedSuccessfully) ?
                    <div>
                    </div>
                    :
                        <div style={{marginTop: 80,
                                    marginBottom: 100
                            }}>   
                            <Alert variant="filled" severity="success">
                                The account has been created successfully! You're being redirected to the main page.
                            </Alert>
                        </div>
                }

                <form  
                    // className={}
                    noValidate 
                    autoComplete="off"
                    style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                <TextField style={{
                    marginTop: (serverResponseUsernameNotAvailable || 
                                serverResponseNoResponse || 
                                serverResponseAccountCreatedSuccessfully) 
                                ? 150 
                                : 80
                    }} 
                    id="firstName" 
                    label="First Name" 
                    value={firstName}
                    onChange={this.handleChange("firstName")}
                    />
                <br></br>
                <TextField 
                        id="lastName"
                        label="Last Name"
                        value={lastName} 
                        onChange={this.handleChange("lastName")}/>
                <br></br>
                <TextField id="phone" label="Phone Number" onChange={this.handleChange("phone")}/>
                <br></br>
                <TextField id="email" label="Email" onChange={this.handleChange("email")}/>
                <br></br>
                <TextField id="age" label="Age" onChange={this.handleChange("age")}/>
                <br></br>
                <TextField id="country" label="Country" onChange={this.handleChange("country")}/>
                <br></br>
                <TextField id="city" label="City" onChange={this.handleChange("city")}/>
                <br></br>
                <TextField id="favoriteSite" label="Facebook/Insta/Twitter" onChange={this.handleChange("favoriteSite")}/>
                <br></br>
                <br></br>
                <InputLabel>
                Username*
                </InputLabel>
                <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                value={username}
                required
                onChange={this.handleChange("username")}
                labelWidth={70}
                />

                <InputLabel htmlFor="outlined-adornment-password">
                Password*
                </InputLabel>
                <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                required
                onChange={this.handleChange("password")}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                    edge="end"
                    >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
                }
                labelWidth={70}
                />
                <br></br>
                <br></br>

                <div style={{ display: "flex" }}>

                <Button variant="contained"  
                        style={{ marginLeft: "auto" ,
                                backgroundColor: '#E1173F'}} 
                        // className={classes.marginTop}
                        endIcon={<Icon style={{color: 'white'}}>send</Icon>}
                        onClick={this.handleSubmit}>
                <Typography variant="h6" style={{textAlign: 'right', color: 'white'}}>
                    CREATE ACCOUNT
                </Typography>
                </Button>

                </div>
                </form>
            </div>
        );
    }
};


export default (SignUpPage);