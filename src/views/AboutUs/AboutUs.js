import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FeedbackIcon from '@material-ui/icons/Feedback';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardAvatar from "components/Card/CardAvatar.js";
import axios from 'axios';
import avatar from "assets/img/faces/marc.jpg";
import ContentEditable from "react-contenteditable";


const styles = {
  typo: {
    // paddingLeft: "7%",
    marginBottom: "-30px",
    // position: "relative"
    textAlign: "left",
    display: 'inline-block'
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "500",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "16px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "15px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1000
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

const useStyles2 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function TypographyPage() {
  const classes = useStyles();
  const classes1 = useStyles1();
  const classes2 = useStyles2();
  
  return (
    <div>
    <div>
      <div style={{textAlign: 'center'}}>
      <Typography variant="h2" style={{textAlign: 'center', marginBottom: '15px', marginTop: '-70px'}}>
          About us
      </Typography>
      <SupervisedUserCircleIcon style={{marginTop: -10, fontSize: 50}}/>
      </div>
</div>

    <div>
      
      <div>
      <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
          <h3 className={classes.cardTitleWhite}>About Us</h3>
            <p className={classes.cardCategoryWhite}>
              We’re on a mission to make building UIs with React fun.
            </p>
          </CardHeader>
            <CardBody>
              
              <Paper elevation={0} className={classes1.paper} style={{marginTop: -30}}> 
              <Grid container spacing={2}>
                <Grid item></Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <h2 style={{textAlign: 'left'}}>Our Mission</h2>
                      <h4>
                        Our company is focused on making React UIs development easier,
                        better, and accessible to more people. We build open source
                        and commercial tools used by many hundreds of thousands of
                        developers in production. We're proud not only of the products
                        we make, but also the community and partnerships we've
                        cultivated with other developers and companies.
                      </h4>
                      <h2 style={{textAlign: 'left'}}>Our Values</h2>
                      <h4>
                        Our core values include transparency (our work is public most
                        of the time); creating a safe, high-trust team; building
                        incredible developer experiences; maintaining a healthy
                        working environment;
                      </h4>
                      <h2 style={{textAlign: 'left'}}>Our Story</h2>
                      <h4>
                      </h4>
                      <h4>
                        Today, Material-UI has grown to become one of the world's most
                        popular React UI libraries – backed by a vibrant community of
                        more than 1M developers in over 180 countries.
                      </h4>
                    
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>

            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardBody profile>
          <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <PhoneIcon style={{fontSize: 35}}/>
              </Grid>
              <Grid item xs={8}>
                <div >
                  <p style={{textAlign: 'left', fontSize: 17}}>Call us now: 0760987383</p> 
                </div>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <EmailIcon style={{fontSize: 35}}/>
              </Grid>
              <Grid item xs={8}>
                <div >
                  <p style={{textAlign: 'left', fontSize: 17}}>Write us an email: thomas.e.palade@gmail.com</p>
                </div>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <HomeIcon style={{fontSize: 35}}/>
              </Grid>
              <Grid item xs={8}>
                <div >
                  <p style={{textAlign: 'left', fontSize: 17}}>Or come have a talk with us: Bucuresti, Sectorul 5, Strada Plutonier Rascanu nr. 2, ap. 42, scara 2. etaj 5</p>
                </div>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <FacebookIcon style={{fontSize: 35}}/>
              </Grid>
              <Grid item xs={8}>
                <div >
                  <a href={'https://www.facebook.com/palade.thomas'}>
                  <p style={{textAlign: 'left', fontSize: 17}}>Join or Facebook community: https://www.facebook.com/palade.thomas</p> </a>
                </div>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <TwitterIcon style={{fontSize: 35}}/>
              </Grid>
              <Grid item xs={8}>
                <div >
                  <a href={'https://www.instagram.com/paladethomas'}>
                  <p style={{textAlign: 'left', fontSize: 17}}>Tweet about us: https://twitter.com/paladethomas</p> </a>
                </div>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <InstagramIcon style={{fontSize: 35}}/>
              </Grid>
              <Grid item xs={8}>
                <div >
                  <a href={'https://www.instagram.com/paladethomas'}>
                  <p style={{textAlign: 'left', fontSize: 17}}>Follow us on Instagram: https://www.instagram.com/paladethomas</p> </a>
                </div>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <FeedbackIcon style={{fontSize: 35}}/>
              </Grid>
              <Grid item xs={8}>
                <div >
                  <a href={'http://localhost:8081/admin/feedback'}>
                  <p style={{textAlign: 'left', fontSize: 17}}>Share your opinion with us, go to our FEEDBACK PAGE</p> </a>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
        </CardBody>
          </Card>
        </GridItem>

      </GridContainer>
    </div>
    </div>
    </div>
    </div>
  );
}
