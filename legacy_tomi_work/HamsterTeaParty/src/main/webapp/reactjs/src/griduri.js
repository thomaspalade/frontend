import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Navbar from './Navbar';
import SidebarRight from './SidebarRight';
import SidebarLeft from './SidebarLeft';  
import CentralJokeViewer from './CenterJokeViewer';
import SignUpPage from './SignUpPage';
import JokePostTable from './JokePostTable';
import GiveAward from './GiveAward';
import DonateMoney from './DonateMoney';
import MostUpvotedJokes from './MostUpvotedJokes';
import LatestJokes from './LatestJokes';
import TrendingTags from './TrendingTags';
import TryJsitePremium from './TryJsitePremium';
import PostJoke from './PostJoke';
import About from './About';
import Login from './Login';
import Profile from './Profile';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <Router>
    <div className={classes.root} >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Navbar/>
        </Grid>
        <Grid item xs={2}>
        <SidebarLeft/>
        </Grid>
        <Grid item xs={8} >
          <Switch> 
            <Route path="/" exact component={JokePostTable} />
            <Route path="/signup" exact component={SignUpPage} />
            <Route path="/viewer" exact component={CentralJokeViewer} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/viewer/:joke_id" exact component={CentralJokeViewer} />
            <Route path="/profile/:profile_id" exact component={Profile} />
            <Route path="/giveaward" exact component={GiveAward} />
            <Route path="/donate" exact component={DonateMoney} />  
            <Route path="/upvoted" exact component={MostUpvotedJokes} />
            <Route path="/latest" exact component={LatestJokes} />
            <Route path="/trending" exact component={TrendingTags} />
            <Route path="/tryjsitepremium" exact component={TryJsitePremium} />
            <Route path="/about" exact component={About} />
            <Route path="/login" exact component={Login} />
            <Route path="/postjoke" exact component={PostJoke} />
          </Switch>
        </Grid>
        <Grid container item xs={2}
          style={{}}
        >
          <SidebarRight/>
        </Grid>
      </Grid>
    </div>
    </Router>
  );
}
