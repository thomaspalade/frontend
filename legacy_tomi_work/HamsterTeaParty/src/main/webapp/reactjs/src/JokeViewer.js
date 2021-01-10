import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Navbar from './Navbar';
import SidebarRight from './SidebarRight';
import SidebarLeft from './SidebarLeft';
import CenterJokeViewer from './CenterJokeViewer';

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
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <Navbar/>
        </Grid>
        <Grid item xs={2}>
        <SidebarLeft/>
        </Grid>
        <Grid item xs={8}>
          <CenterJokeViewer/>
        </Grid>
        <Grid container item xs={2}>
            <SidebarRight/>
        </Grid>
      </Grid>
    </div>
  );
}
