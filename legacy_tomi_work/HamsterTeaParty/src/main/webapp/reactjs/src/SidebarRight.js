import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { connect } from 'react-redux';

class SidebarRight extends React.Component {

    state = {
      username: '',
      loggedIn: false
  };

    componentDidMount = () => { 
        this.setState ({
            ...this.state,
        })
    }

    componentDidUpdate = () => {   
      
    }
    

    render () {

    const {
      loggedIn
    } = this.props.userToken;


    console.log('Atentie maxima')
    console.log(this.props);

    return (
      <div>
      <List component="nav" 
            style={{
              width: '100%',
              maxWidth: 360,
              marginTop: 135,
              position: 'fixed',
            }} 
            aria-label="mailbox folders">
        {
          loggedIn ?
          <div>
          <Link to="/postjoke" className="removeUnderline">
          <ListItem button>
          <PostAddIcon />
            <ListItemText disableTypography
                          primary={<Typography variant='h5' style={{ color: '#C82840' }}>Post Joke</Typography>}
                          style = {{
                            marginLeft: 30
                          }}/>
          </ListItem>
          </Link>
          <Divider light />

          <Divider light />
        <Link to="/giveaward" className="removeUnderline">
        <ListItem button margin>
        <AttachMoneyIcon />
        <ListItemText 
                        disableTypography
                        primary={<Typography variant='h5' style={{ color: '#C82840' }}>Give Award</Typography>}
                        style = {{
                          marginLeft: 30,
                          marginTop: 25
                        }}/>
        </ListItem>
        </Link>
        <Divider />
        <Link to="/tryjsitepremium" className="removeUnderline">
        <ListItem button divider >
        <LocalAtmIcon />
          <ListItemText 
                        disableTypography
                        primary={<Typography variant='h5' style={{ color: '#C82840' }}>Try Premium</Typography>}
                        style = {{
                          marginTop: 35,
                          marginLeft: 30,
                        }}
          />

        </ListItem>
        </Link>


          </div>
            :
            <div style={{
              marginTop: 100
            }}>
            </div>
        }

    

        <Link to="/donate" className="removeUnderline">
        <ListItem button>
        <EmojiEventsIcon />
          <ListItemText disableTypography
                        primary={<Typography variant='h5' style={{ color: '#C82840' }}>Donate Us</Typography>}
                        style = {{
                          marginTop: 35,
                          marginLeft: 30
                        }}/>
        </ListItem>
        </Link>
        <Divider light />

        <Link to="/trending" className="removeUnderline">
        <ListItem button>
        <TrendingUpIcon />
        
          <ListItemText 
                        disableTypography
                        primary={<Typography variant='h5' style={{ color: '#C82840' }}>Trending Now</Typography>} 
                        style = {{
                          marginTop: 35,
                          marginLeft: 30
                        }}
                        />
        </ListItem>
        </Link>
        <Divider light />
        <Link to="/latest" className="removeUnderline">
        <ListItem button>
        <NewReleasesIcon />
          <ListItemText 
                        disableTypography
                        primary={<Typography variant='h5' style={{ color: '#C82840' }}>Latest Jokes</Typography>}
                        style = {{
                          marginTop: 35,
                          marginLeft: 30
                        }}/>
        </ListItem> 
        </Link>
        <Divider light />
        <Link to="/upvoted" className="removeUnderline">
        <ListItem button>
        <WhatshotIcon />
          <ListItemText 
                        disableTypography
                        primary={<Typography variant='h5' style={{ color: '#C82840' }}>Most Upvoted</Typography>}  
                        style = {{
                          marginTop: 35,
                          marginLeft: 30
                        }}/>
        </ListItem>
        </Link>
        <Divider light />
      </List>
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
        type: 'SIGN_IN'
      })
    } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarRight);