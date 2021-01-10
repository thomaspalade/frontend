import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import LanguageIcon from '@material-ui/icons/Language';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import FaceIcon from '@material-ui/icons/Face';
import FacebookIcon from '@material-ui/icons/Facebook';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import axios from 'views/SignUp/node_modules/axios';
import { connect } from 'react-redux';
import Alert from 'views/SignUp/node_modules/@material-ui/lab/Alert';

const styles = theme => ({
    root: {
        "& > *": {
          margin: 2 ,
          width: "100ch"
        }
      },
    square: {
        color: '#C82840',
        backgroundColor: '#C82840',
        height: 120,
        width: 120
      },
  });

class Profile extends React.Component {

    state = {
        profileId: '',
        isSuperAdmin: false, 
        jokeArray: [],
        user: {
        },
        serverResponseAccountUpdatedSuccessfully: false,
        serverResponseAccountUpdatedNotAvailable: false,
        serverResponseNoResponse: false
    };

    removeDivsFromJokeContent = (jokes) => {
        jokes.map((joke) => {
            let res = joke.content.split("<div>");
            let newRes = '';
            for (let i = 0; i < res.length; i++) {
                newRes = newRes + res[i] + "\n";
            }
            res = newRes.split("</div>");
            newRes = '';
            for (let i = 0; i < res.length; i++) {
                newRes = newRes + res[i] + "\n";
            }
            res = newRes.split("<br>");
            newRes = '';
            for (let i = 0; i < res.length; i++) {
                newRes = newRes + res[i] + "\n";
            }
            res = newRes.split("&nbsp;");
            newRes = '';
            for (let i = 0; i < res.length; i++) {
                newRes = newRes + res[i] + "\n";
            }
            joke.content = newRes;
        })
        return jokes;
    }
 

    componentDidMount = () => { 
        let id = this.props.match.params.profile_id;

        if (!id) {
            /// trebuie sa luam id-ul user-ului din back-end

            axios.get("http://localhost:8090/userById",
            {headers :{
                Authorization : this.props.userToken.userToken
            }})
            .then(res => {
                console.log(res);
                console.log(res.data);
                id = res.data;
            }
        );

        }

        this.setState ({
            ...this.state,
            profileId: id
        })

        setTimeout(() => {
            fetch("http://localhost:8090/jokesByPoster?posterId=" + id).then(res => res.json())
        .then(
          (result) => { 
            this.setState({
              isLoaded: true,
              jokeArray: result
            });

            console.log(result);

            let newJokeArray = this.removeDivsFromJokeContent(result);
            this.setState({
              isLoaded: true,
              jokeArray: newJokeArray
            });
          },
          // Note: it's important to handle errors here
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    
        fetch("http://localhost:8090/user?_id=" + id).then(res => res.json())
        .then(
          (result) => { 
            this.setState({
              user: result,
              isSuperAdmin : result.isPrivileged
            });
            
          },
          // Note: it's important to handle errors here
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )

        }, 300);

    }

    componentDidUpdate = () => {    
        
    }

      handleChange = (prop) => (event) => {
        this.setState({ 
            ...this.state, 
            [prop]: event.target.value 
        });
      };


    handleSubmit = () => {
        
    }

    submitData = () => {
        // tre sa updatez cu datele din username si etc
        console.log(this.state.user.userName);
        axios.post("http://localhost:8090/updateUser",{
                _id: this.props.match.params.profile_id,
                userName : this.state.user.userName,
                phone : this.state.phone,
                email : this.state.email,
                firstName : this.state.firstName,
                lastName : this.state.lastName,
                age : this.state.age,
                country : this.state.country,
                city : this.state.city,
                favoriteSite : this.state.favoriteSite,
                passwd : this.state.user.passwd,
                awardedCounter: this.state.user.awardedCounter,
                upvotedCounter: this.state.user.upvotedCounter
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
                setTimeout(() => {
                    this.setState({ serverResponseAccountUpdatedSuccessfully: !this.state.serverResponseAccountUpdatedSuccessfully });
                }, 0);
                setTimeout(() => {
                    this.setState({ serverResponseAccountUpdatedSuccessfully: !this.state.serverResponseAccountUpdatedSuccessfully });
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
                            this.setState({ serverResponseAccountUpdatedNotAvailable: !this.state.serverResponseAccountUpdatedNotAvailable });   
                        }, 0);  // semnaleaza eroare print-un mesaj
                        setTimeout(() => {
                            this.setState({ serverResponseAccountUpdatedNotAvailable: !this.state.serverResponseAccountUpdatedNotAvailable });
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
            user,
            isSuperAdmin,
            serverResponseAccountUpdatedSuccessfully,
            serverResponseAccountUpdatedNotAvailable,
            serverResponseNoResponse,
            isLoaded
        } = this.state;

        const {
            userName,
            email,
            phone,
            firstName,
            lastName,
            age,
            country,
            city,
            favoriteSite,
            upvotedCounter,
            awardedCounter,
            accountType
        } = user;

        const {
            classes
         } = this.props;

        return (
            <div>
            {
                    /// alert message
                    (!serverResponseAccountUpdatedSuccessfully) ?
                    <div>
                    </div>
                    :
                        <div style={{marginTop: 50,
                                    marginBottom: -30
                            }}>   
                            <Alert variant="filled" severity="success">
                                The profile has been edited successfully! You're being redirected to the main page.
                            </Alert>
                        </div>
                }

                {
                    /// alert message
                    (!serverResponseAccountUpdatedNotAvailable) ?
                    <div>
                    </div>
                    :
                        <div style={{marginTop: 50,
                                    marginBottom: -30
                            }}>   
                            <Alert variant="filled" severity="warning">
                                An error has occurred. We're very sorry, please try again to edit the profile info. 
                            </Alert>
                        </div>
                }

                {
                    /// alert message
                    (!serverResponseNoResponse) ?
                    <div>
                    </div>
                    :
                        <div style={{marginTop: 50,
                                    marginBottom: -30
                            }}>   
                            <Alert variant="filled" severity="warning">
                                An error has occurred. We're very sorry, please try again to edit the profile. 
                            </Alert>
                        </div>
                }


            {
                isLoaded && 
                (isSuperAdmin === true) 
                ? 

                <div>
                <div style={{textAlign: 'center'}}>
                <Typography variant="h2" 
                            style={{textAlign: 'center',
                                    marginTop: 100}}>
                    PROFILE PAGE
                </Typography>
                </div>

                <div style={{
                    position: 'absolute', left: '1%', top: '15%',
                }}>
                <List component="nav" 
                        style={{
                        width: '100%',
                        maxWidth: 360,
                        marginTop: 155,
                        position: 'fixed',
                        }} 
                        aria-label="mailbox folders">
                    

                    <div style={{
                            position: 'absolute', left: '10%', top: '-1150%',
                        }}>   
                        <Avatar style={{
                            position: 'absolute', left: '10%', top: '-950%',
                        }}>   
                        TP
                        </Avatar>
                        </div>

                    <Typography variant="h6" 
                            style={{textAlign: 'center',
                                    marginTop: -190,
                                    marginBottom: 0}}>
                        USER ACTIVITY
                    </Typography>

                    <Divider light />
                    
                    <ListItem button margin>
                    <AttachMoneyIcon />
                    <ListItemText 
                                    disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                        {`awarded jokes: ${awardedCounter}`}
                                        </Typography>}
                                    style = {{
                                    marginLeft: 20,
                                    marginTop: -2
                                    }}/>
                    </ListItem>
                  
                    <Divider />
                    
                    <ListItem button>
                    <TrendingUpIcon />
                    <ListItemText 
                                    disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`upvoted jokes: ${upvotedCounter}`}
                                        </Typography>}
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}/>
                    </ListItem> 
                    <Divider light />
                    <h1> </h1>

                </List>


                <div style={{
                    position: 'absolute', left: '27%', top: '10%',
                    /*transform: 'translate(-50%, -50%)'*/
                }}>

                <div >
                <List component="nav" 
                        style={{
                        width: '100%',
                        maxWidth: 360,
                        marginTop: 155,
                        position: 'fixed',
                        }} 
                        aria-label="mailbox folders">

                    <Typography variant="h6" 
                            style={{textAlign: 'center',
                                    marginTop: -50,
                                    marginBottom: 0}}>
                        ACCOUNT INFO
                    </Typography>

                    <Divider light />

                    <ListItem button>
                    <PersonIcon />
                    <ListItemText 
                                    disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`username: ${userName}`}
                                        </Typography>}
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}/>
                    </ListItem> 
                    <Divider light />

                    <ListItem button>
                    <PersonOutlineIcon />
                    
                    <ListItemText 
                                    disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`fullname: ${firstName + ' ' +  lastName}`}
                                    </Typography>} 
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}
                                    />
                    </ListItem>

                    <Divider light />

                    <ListItem button>
                    <LanguageIcon />
                    <ListItemText disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`country: ${country}`}
                                        </Typography>}
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}/>
                    </ListItem>

                    <Divider light />


                     <Divider light />

                        <ListItem button>
                        <LanguageIcon />
                        <ListItemText disableTypography
                                        primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                             {`account type: ${accountType}`}
                                            </Typography>}
                                        style = {{
                                        marginTop: -2,
                                        marginLeft: 20
                                        }}/>
                        </ListItem>

                    <Divider light />

                    <ListItem button>
                    <LocationCityIcon />
                    <ListItemText disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`city: ${city}`}
                                        </Typography>}
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}/>
                    </ListItem>

                    <Divider light />

                    <ListItem button>
                    <FaceIcon />
                    <ListItemText disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`age: ${age}`}
                                        </Typography>}
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}/>
                    </ListItem>

                    <Divider light />
  
                    <h1> </h1>
                </List>

                
                </div>

                <div >
                <List component="nav" 
                        style={{
                        width: '100%',
                        maxWidth: 360,
                        marginTop: 155,
                        position: 'fixed',
                        }} 
                        aria-label="mailbox folders">

                    <Typography variant="h6" 
                            style={{textAlign: 'center',
                                    marginTop: 315,
                                    marginBottom: 0}}>
                        CONTACT INFO
                    </Typography>

                    <Divider light />

                    <ListItem button>
                    <ContactPhoneIcon />
                    <ListItemText 
                                    disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`phone: ${phone}`}
                                        </Typography>}
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}/>
                    </ListItem> 
                    <Divider light />

                    <ListItem button>
                    <FacebookIcon />
                    
                    <ListItemText 
                                    disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`social media: ${favoriteSite}`}
                                    </Typography>} 
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}
                                    />
                    </ListItem>

                    <Divider light />

                    <ListItem button>
                    <ContactMailIcon />
                    <ListItemText disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`email: ${email}`}
                                        </Typography>}
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}/>
                    </ListItem>

                    <Divider light />
  
                    <h1> </h1>
                </List>

                </div>

                </div>

                </div>

                <div style={{
                    position: 'absolute', left: '28%', top: '32%',
                    maxWidth: 950
                    /*transform: 'translate(-50%, -50%)'*/
                }}>

                <div style={{marginTop: -40, marginBottom: 40}}>
                

                <div>

                    <h2 style={{
                        marginBottom: 50
                    }}>Check some more jokes from this user...</h2>

                </div>

                {
                this.state.jokeArray.slice(0, (this.state.jokeArray.length > 3) ? 3 : this.state.jokeArray.length).map
                (joke => (
                    <div >
                       <Card> 
                       <Link to={ `/profile/${joke.posterId}` }
                             className="removeUnderline"
                       >
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe" style={{backgroundColor: '#E1173F' }}                
                            >
                                {`${joke.title[0]}`}
                            </Avatar>
                            }
                            title={`${joke.title}`}
                            subheader={`${joke.createdAt}`}
                        />
                        </Link>
                       <Link to={ `/viewer/${joke._id}` }
                             className="removeUnderline"
                       >
                        <CardContent className="marginTop">
                            <p className="Blend"
                                onClick={this.handleChangeText}> 
                            { `${joke.content}`} 
                            </p>
                        </CardContent>
                        </Link>
                        </Card>
                    </div>
                ))
            }


                </div>
                </div>

                <div style={{
                    position: 'absolute', left: '27%', top: '10%',
                    /*transform: 'translate(-50%, -50%)'*/
                }}>

                <div >
    
                
                </div>
                </div>

                </div>
                :   
            <div className>
                <br></br>
                <br></br>

                <div>
                <div style={{
                    position: 'absolute', left: '1%', top: '15%',
                }}>
                <List component="nav" 
                        style={{
                        width: '100%',
                        maxWidth: 360,
                        marginTop: 150,
                        position: 'fixed',
                        }} 
                        aria-label="mailbox folders">
                    

                    <Typography variant="h6" 
                            style={{textAlign: 'center',
                                    marginTop: -190,
                                    marginBottom: 0}}>
                        USER ACTIVITY
                    </Typography>

                    <Divider light />
                    
                    <ListItem button margin>
                    <AttachMoneyIcon />
                    <ListItemText 
                                    disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                        {`awarded jokes: ${awardedCounter}`}
                                        </Typography>}
                                    style = {{
                                    marginLeft: 20,
                                    marginTop: -2
                                    }}/>
                    </ListItem>
                  
                    <Divider />
                    
                    <ListItem button>
                    <TrendingUpIcon />
                    <ListItemText 
                                    disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`upvoted jokes: ${upvotedCounter}`}
                                        </Typography>}
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}/>
                    </ListItem> 
                    <Divider light />
                    <h1> </h1>

                </List>


                <div style={{
                    position: 'absolute', left: '27%', top: '10%',
                    /*transform: 'translate(-50%, -50%)'*/
                }}>

                <div >
                <List component="nav" 
                        style={{
                        width: '100%',
                        maxWidth: 360,
                        marginTop: 155,
                        position: 'fixed',
                        }} 
                        aria-label="mailbox folders">

                    <Typography variant="h6" 
                            style={{textAlign: 'center',
                                    marginTop: -60,
                                    marginBottom: 0}}>
                        ACCOUNT INFO
                    </Typography>

                    <Divider light />

                    <ListItem button>
                    <PersonIcon />
                    <ListItemText 
                                    disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`username: ${userName}`}
                                        </Typography>}
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}/>
                    </ListItem> 
                    <Divider light />


                    <ListItem button>
                    <PersonOutlineIcon />
                    
                    <ListItemText 
                                    disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`fullname: ${firstName + ' ' +  lastName}`}
                                    </Typography>} 
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}
                                    />
                    </ListItem>

                    <Divider light />

                    <ListItem button>
                    <LanguageIcon />
                    <ListItemText disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`country: ${country}`}
                                        </Typography>}
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}/>
                    </ListItem>

                    <Divider light />

                    <Divider light />

                        <ListItem button>
                        <PersonIcon />
                        <ListItemText
                                    disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`account type: ${accountType}`}
                                        </Typography>}
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}/>
                        </ListItem>
                    <Divider light />

                    <ListItem button>
                    <LocationCityIcon />
                    <ListItemText disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`city: ${city}`}
                                        </Typography>}
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}/>
                    </ListItem>

                    <Divider light />

                    <ListItem button>
                    <FaceIcon />
                    <ListItemText disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`age: ${age}`}
                                        </Typography>}
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}/>
                    </ListItem>

                    <Divider light />
  
                    <h1> </h1>
                </List>

                
                </div>

                <div >
                <List component="nav" 
                        style={{
                        width: '100%',
                        maxWidth: 360,
                        marginTop: 155,
                        position: 'fixed',
                        }} 
                        aria-label="mailbox folders">

                    <Typography variant="h6" 
                            style={{textAlign: 'center',
                                    marginTop: 315,
                                    marginBottom: 0}}   >
                        CONTACT INFO
                    </Typography>

                    <Divider light />

                    <ListItem button>
                    <ContactPhoneIcon />
                    <ListItemText 
                                    disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`phone: ${phone}`}
                                        </Typography>}
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}/>
                    </ListItem> 
                    <Divider light />

                    <ListItem button>
                    <FacebookIcon />
                    
                    <ListItemText 
                                    disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`${favoriteSite}`}
                                    </Typography>} 
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}
                                    />
                    </ListItem>

                    <Divider light />

                    <ListItem button>
                    <ContactMailIcon />
                    <ListItemText disableTypography
                                    primary={<Typography variant='h6' style={{ color: '#C82840' }}>
                                         {`${email}`}
                                        </Typography>}
                                    style = {{
                                    marginTop: -2,
                                    marginLeft: 20
                                    }}/>
                    </ListItem>

                    <Divider light />
  
                    <h1> </h1>
                </List>

                </div>

                </div>

                </div>

                <div style={{
                    position: 'absolute', left: '28%', top: '32%',
                    maxWidth: 950
                    /*transform: 'translate(-50%, -50%)'*/
                }}>

                <div style={{marginTop: -40, marginBottom: 40}}>


                </div>
                </div>

                <div style={{
                    position: 'absolute', left: '27%', top: '10%',
                    /*transform: 'translate(-50%, -50%)'*/
                }}>

                <div >
    
                
                </div>
                </div>

                </div>


                <form  
                    className={classes.root}
                    noValidate 
                    autoComplete="off"
                    style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    >
                <div style={{textAlign: 'center'}}>
                <div>
                <Typography variant="h2" 
                            style={{textAlign: 'center'
                            }}>
                    PROFILE PAGE
                </Typography>
                </div>

                </div>
                <TextField style={{
                    marginTop: 30
                }} 
                    id="firstName" 
                    label="First Name"
                    /// placeholder=" "
                    /// required
                    /// disabled="true"
                    /// value={firstName}
                    onChange={this.handleChange("firstName")}
                    />
                <br></br>
                <TextField 
                        id="lastName"
                        label="Last Name"
                        // disabled="true"
                        /// value={lastName} 
                        onChange={this.handleChange("lastName")}/>
                <br></br>
                <TextField 
                        id="phone" 
                        label="Phone Number"
                        // disabled="true" 
                        /// value={phone} 
                        onChange={this.handleChange("phone")}/>
                <br></br>
                <TextField 
                        id="email" 
                        label="Email"
                        // disabled="true"
                        /// value={email} 
                        onChange={this.handleChange("email")}/>
                <br></br>
                <TextField 
                        id="age" 
                        label="Age" 
                        /// disabled="true"
                        /// value={age}
                        onChange={this.handleChange("age")}/>
                <br></br>
                <TextField 
                        id="country" 
                        label="Country"
                        /// disabled="true"
                        /// value={country} 
                        onChange={this.handleChange("country")}/>
                <br></br>
                <TextField 
                        id="city" 
                        label="City"
                        /// disabled="true"
                        /// value={city} 
                        onChange={this.handleChange("city")}/>
                <br></br>
                <TextField 
                        id="favoriteSite" 
                        label="Facebook/Insta/Twitter"
                        /// disabled="true"
                        /// value={favoriteSite} 
                        onChange={this.handleChange("favoriteSite")}/>
                <br></br>
                
                <div>
                        <Button variant="contained" 
                        style={{
                            position: 'absolute', left: '85%', top: '110%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#E1173F'
                        }} 
                        className={classes.marginTop}
                        onClick={this.submitData}
                        >
                        <Typography variant="h6" style={{textAlign: 'right', color: 'white'}}>
                            SUBMIT MODIFIED INFO
                        </Typography>
                        </Button>
                </div>
                </form>
            </div>
            }
            </div>
          );
        }
 }

    Profile.propTypes = {
      classes: PropTypes.object.isRequired,
   };
  
const mapStateToProps = (state) => {
    return state;
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      login_logout: () => { dispatch({ type: 'REMOVE_TOKEN' }) },
      set_token: (newToken, newUserName, previousState) => { 
          dispatch({ 
              type: 'SET_TOKEN', 
              token: newToken, 
              userName: newUserName, 
              previousState: previousState
            }) 
      }, 
    }
  }
  

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile)))