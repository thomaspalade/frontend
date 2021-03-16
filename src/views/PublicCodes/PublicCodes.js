import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Typography from '@material-ui/core/Typography';
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import moment from 'moment'
import CommentIcon from '@material-ui/icons/Comment';
import Rating from '@material-ui/lab/Rating';
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.js";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import SearchBar from 'material-ui-search-bar';

const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
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
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
    fontSize: "40px"
  },
}));


export default function PublicCodes(props) {
  const classes = useStyles();
  const classes1 = useStyles1();
  const [text, setText] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [visibleFeedbacks, setVisibleFeedbacks] = useState(true);
  const [open, setOpen] = useState(false);
  const [succesAlert, setSuccesAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [searchedDocument, setSearchedDocument] = useState("");
  const [documents, setDocuments] = useState([]);
  const [personal, setPersonal] = useState(true);
  const [profiles, setProfiles] = useState([]);

  const onChangeDocument = (e) => {
    setSearchedDocument(e);
  };

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

  const getAllUserExistingDocuments = () => {
    UserService.getCurrentUser1().then(
      (response) => {
        console.log("here tomi");
        const myQueryParams = '?searchedDocument=' + searchedDocument;
        const finalUrl = "http://localhost:5000/profiles/getPublicCodes" + myQueryParams;
        // if (searchedDocument !== '') {
        axios.get(finalUrl).then(res => {
          console.log(JSON.stringify(res.data));
          console.log("here tomi 2");
          console.log(res.data);
          const finalArray = res.data.map((e, index) => { return {
            id: index,
            firstName: e.firstName,
            lastName: e.lastName,
            email: e.email,
            publicCode: e.publicCode,
          }});
          console.log("here 1");
          console.log(JSON.stringify(finalArray));
          setProfiles(finalArray);
          console.log("here 2");
          console.log(JSON.stringify(finalArray));
            
            // window.location.reload(false); 
            // s-a intors un raspuns bun
            }).catch((error) => {
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
          // }
      })
  };

  useEffect(() => 
    getAllUserExistingDocuments(), []
  );

  const onRequestDocumentSearch = (e) => {
    getAllUserExistingDocuments();
  };

  const getFileExtensionImage = (extension) => {
    const stringEnd = '003-app.png';
    return require('assets/img/fileExtentions/png/' + stringEnd);
  };

  const handleSendFeedback = (e) => {
    console.log('inside handleSendFeedback');
    UserService.getCurrentUser1().then(
      (response) => {
        console.log(response);
        console.log(JSON.stringify(response.data.id));
        console.log("Thomas se gandeste bine.");
        axios.post("http://localhost:5000/feedbacks/", {
          userId: response.data.id,
          text: text
        }).then(res => {
          showNotification("succesAlert");
          console.log(res);
          console.log(JSON.stringify(res.data));
          setText(res.data.text);
          window.location.reload(false);
          // s-a intors un raspuns bun
          }).catch((error) => {
            // Error
            showNotification("errorAlert");
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

          }).catch((error) => {
            // Error
            console.log("here babyyyyyy");
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

      <div style={{textAlign: 'center'}}>
      <Typography variant="h2" style={{textAlign: 'center', marginBottom: '15px', marginTop: '-40px'}}>
          Public Codes
      </Typography>
      <CommentIcon style={{marginTop: -10, fontSize: 50}}/>
      </div>

    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" onClick={() => setVisibleFeedbacks(!visibleFeedbacks)}>
            <h3 className={classes.cardTitleWhite}>Each user has a unique public code. Here you can find them</h3>
            <p className={classes.cardCategoryWhite}>
              The unique public code can be used to share documents with that person
            </p>
          </CardHeader>
          <CardBody>
          <div>
    <React.Fragment>
      <h4>
        If you do not want to use any mail, you can write your message write here.
        Don't forget to specify who you are and how can we help you with that.
        We thought that you may think the public code system is the best to keep things fine.
        If you really believe this is a bad idea, then we expect your feedback at this exact address.
        Don't hesitate to write us about anything.
      </h4>
      <CssBaseline />
        <Toolbar>
          <div style={{width: "100%"}}>
          <SearchBar
            style={{marginTop: "20px", marginBottom: "20px"}}
            value={searchedDocument || ''}
            placeholder="Write here username, last name, first name, email or anything about the person you want to find out the public code"
            onChange={(e) => onChangeDocument(e)}
            onRequestSearch={onRequestDocumentSearch}
          />
          </div>
        </Toolbar>
      <main>
        {/* Hero unit */}

        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
              </Grid>
            </div>
          </Container>
        </div>
      </main>
      {/* Footer */}
    
      {/* End footer */}
    </React.Fragment>
    </div>

            {true && <Table
              tableHeaderColor="primary"
              tableHead={["ID", "First name", "Last name", "Email", "Public code"]}
              tableData={
                profiles.map((e, index) => [index, e.firstName, e.lastName, e.email, e.publicCode]) || [[0,"Thomas","Danutu","csv", "ceva"]]
                /*
                profiles === [] ? [
                  ["ID", "First name", "Last name", "Email", "Public code"],
                  ["ID", "First name", "Last name", "Email", "Public code"],
                  ["ID", "First name", "Last name", "Email", "Public code"]
                ] :
                profiles.map((e, index) => [index, e.firstName, e.lastName, e.email, e.publicCode]) || []
                */
              }
            ></Table>
            }


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
  );
}
