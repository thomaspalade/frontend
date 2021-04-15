import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import axios from 'axios';
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.js";

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
  const [text, setText] = useState("");
  const [succesAlert, setSuccesAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const onChangeText = (e) => {
    const text = e.target.value;
    setText(text);
  };

  const showNotification = place => {
    switch (place) {
      case "succesAlert":
        if (!succesAlert) {
          setSuccesAlert(true);
          setTimeout(function() {
            setSuccesAlert(false);
          }, 4000);
        }
        break;
      case "errorAlert":
        if (!errorAlert) {
          setErrorAlert(true);
          setTimeout(function() {
            setErrorAlert(false);
          }, 4000);
        }
        break;
      default:
        break;
    }
  };

  const handleSendMessage = (e) => {
    axios.post("http://localhost:9998/messages/", {
      text: text
    }).then(res => {
      showNotification("succesAlert");
      console.log(JSON.stringify(res.data));
      setText(res.data.text);
      window.location.reload(false);
      // s-a intors un raspuns bun
      }).catch((error) => {
        showNotification("errorAlert");
        // Error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data);
          console.log(error.response.status);
          if (error.response.status === 400) {
            // username-ul este deja utilizat de altcineva, incearca cu altul
          }
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
        }
        console.log(error.config);
        console.log(error);
      });
      
  };
  
  return (
    <div>
    <div>
      <div style={{textAlign: 'center'}}>
      <Typography variant="h2" style={{textAlign: 'center', marginBottom: '15px', marginTop: '-50px'}}>
          You can find us on
      </Typography>
      <PhoneIcon style={{marginTop: -20, marginRight: 14, fontSize: 40}}/>
      <EmailIcon style={{marginTop: -20, marginRight: 14, fontSize: 40}}/>
      <HomeIcon style={{marginTop: -20, marginRight: 14, fontSize: 40}}/>
      <FacebookIcon style={{marginTop: -20, marginRight: 14, fontSize: 40}}/>
      <TwitterIcon style={{marginTop: -20, marginRight: 14, fontSize: 40}}/>
      <InstagramIcon style={{marginTop: -20, marginRight: 14, fontSize: 40}}/>
      <FeedbackIcon style={{marginTop: -20, marginRight: 14, fontSize: 40}}/>
      </div>
    </div>

    <div>
      
      <div>
      <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h3 className={classes.cardTitleWhite}>Choose on of the following to contact us</h3>
              <p className={classes.cardCategoryWhite}>If you want to tell us more about a problem, use the feedback option.</p>
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
                      <h2 style={{textAlign: 'left'}}>Write us a message</h2>
                      <h4>
                        If you do not want to use any mail, you can write your message write here.
                        Don't forget to specify who you are and how can we help you with that.
                      </h4>
                            {
                            // this is the textbox for firstname adress
                            <TextField
                              variant="outlined"
                              margin="normal"
                              // required
                              fullWidth
                              id="message"
                              label="Message"
                              // name="text"
                              autoComplete="text"
                              autoFocus
                              // onChange={e => setMail(e.target.value)}
                              type="text"
                              // className="form-control"
                              name="text"
                              value={text || ''}
                              // value="Thomas"
                              onChange={onChangeText}
                              multiline
                              // validations={[required]}
                            />
                          }
                        <Button style={{float: 'left', marginTop: '25px'}} color="primary" onClick={handleSendMessage}>Send Message</Button>
                      
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
                <div style={{color: "#ff9800"}}>
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

      {
        // here we add the data for alerts
        <Snackbar
          place="tc"
          color={succesAlert ? "success" : "danger"}
          icon={AddAlert}
          message={succesAlert ? "Thank you! Your message has been successfully sent. We will contact you very soon!" : 
            "We are very sory but something went wrong with your request. Please try again!"}
          open={succesAlert || errorAlert}
          closeNotification={() => setSuccesAlert(false) && setErrorAlert(false)}
          close
        />
      }

    </div>
    </div>
    </div>
    </div>
  );
}
