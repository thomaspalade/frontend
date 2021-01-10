import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends React.Component {

  state = {
    username: '',
    loggedIn: this.props.userToken.loggedIn
};

componentDidMount = () => { 
    this.setState ({

    })
}

componentDidUpdate = () => {    
    
}

  handleLogout = () => {
      this.props.login_logout();
  }

handleChange = (prop) => (event) => {
    this.setState({ 
        ...this.state, 
        [prop]: event.target.value 
    });
  };

handleSubmit = () => {
   
}   


render () {


  const {
    loggedIn,
  } = this.props.userToken;

  console.log(this.props);

  return (
    <div className="root">
      <AppBar position="static" 
              style={{
                // backgroundColor: '#453535',
                backgroundColor: '#C82840',
                position: 'fixed' /* Fixed Sidebar (stay in place on scroll) */}}>
        <Toolbar>
        <Button color="inherit" style={{  }} className="marginTop2">
        <Link to="/" className="removeUnderline">
          <Typography variant="h6" style={{textAlign: 'right'}} >
            HOME
          </Typography> 
        </Link>     
            </Button>
        <Grid container spacing={2}>
        <Grid item xs={2}>
          </Grid>
        <Grid item xs={2}>
            </Grid>
        <Grid item xs={4}>
        <Link to="/" className="removeUnderline">
        <Typography variant="h2" 
                    style={{
                      flexGrow: 1,
                      alignItems: 'center',
                      textAlign: 'center',
          }}>
            Jokes Site
          </Typography>
        </Link>
        </Grid>
        <Grid item xs={1}>
            </Grid>
        <Grid item xs={3}>
        <div style={{ display: "flex" }}>
        <Button color="inherit" className="marginTop1" style={{ marginLeft: "auto" }} >
        <Link to="/about" className="removeUnderline">
          <Typography variant="h6" 
                      style={{
                        textAlign: 'right',
                        marginTop: 16,
                        }}>
            ABOUT
          </Typography> 
        </Link>   
            </Button>
          {
            (!loggedIn) ?
            <div>
                <Button color="inherit" style={{ marginLeft: "auto" }} className="marginTop1">
                <Link to="/login" className="removeUnderline">
                <Typography variant="h6" 
                        style={{
                          textAlign: 'right',
                          marginTop: 16,
                          // color: '#E1173F'
                        }}>
                    LOGIN
                </Typography>    
                </Link>
                    </Button>
                <Button color="inherit" style={{ marginLeft: "auto" }} className="marginTop1">
                <Link to="/signup" className="removeUnderline">
                <Typography variant="h6" 
                            style={{
                              textAlign: 'right',
                              marginTop: 16
                              }}>
                    SIGN UP
                </Typography>    
                </Link>
                    </Button>
            </div>
            :
            <div>
                <Button color="inherit" style={{ marginLeft: "auto" }} className="marginTop1" 
                        onClick={this.handleLogout}>
                <Link to="/" className="removeUnderline">
                <Typography variant="h6" 
                            style={{
                              textAlign: 'right',
                              marginTop: 16,
                              }}>
                    LOGOUT
                </Typography>
                </Link>
                </Button>
                <Link to="/profile" className="removeUnderline">
                    <Button color="inherit" style={{ marginLeft: "auto" }} className="marginTop1">
                <Typography variant="h6" 
                            style={{
                              textAlign: 'right',
                              marginTop: 16,
                            }}>
                    PROFILE
                </Typography>    
                    </Button>
                </Link>
            </div>
            }
        </div>
        </Grid>
        </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    login_logout: () => {
      dispatch({
        type: 'REMOVE_TOKEN'
      })
    } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);