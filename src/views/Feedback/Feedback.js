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


export default function FeedbackPage(props) {
  const classes = useStyles();
  const classes1 = useStyles1();
  const [text, setText] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [visibleFeedbacks, setVisibleFeedbacks] = useState(true);
  const [open, setOpen] = useState(false);
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

  const getAllUserExistingFeedbacks = () => {
    UserService.getCurrentUser1().then(
      (response) => {
        axios.get("http://localhost:9998/feedbacks/" + response.data.id).then(res => {
          console.log(JSON.stringify(res.data));
          setFeedbacks(res.data);
          // s-a intors un raspuns bun
          })}).catch((error) => {
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

  useEffect(() => 
    getAllUserExistingFeedbacks(), []
  );

  const handleSendFeedback = (e) => {
    console.log('inside handleSendFeedback');
    UserService.getCurrentUser1().then(
      (response) => {
        console.log(response);
        console.log(JSON.stringify(response.data.id));
        console.log("Thomas se gandeste bine.");
        axios.post("http://localhost:9998/feedbacks/", {
          userId: response.data.id,
          text: text
        }).then(res => {
          showNotification("succesAlert");
          console.log(res);
          console.log(JSON.stringify(res.data));
          setText(res.data.text);
          setTimeout(function() {
            window.location.reload(false);
          }, 1000);
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
          Feedback
      </Typography>
      <CommentIcon style={{marginTop: -10, fontSize: 50}}/>
      </div>

    <Card>
      <CardHeader color="primary">
      <h3 className={classes.cardTitleWhite}>You can write us a personal message with your suggestions!</h3>
        <p className={classes.cardCategoryWhite}>
          We are open to any good ideas. Our community is the most important for us. You are a major key to our succes.
        </p>
      </CardHeader>
      <CardBody>
        <InputLabel style={{ color: "#AAAAAA", marginBottom: '15px', marginTop: '10px' }}>Complete the text message from above</InputLabel>
        <div className={classes1.root}>
        </div>
          {
          // this is the textbox for firstname adress
          <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            id="postalCode"
            label="Fedback text box"
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

        <Button style={{marginTop: '20px'}} color="primary" onClick={handleSendFeedback}>Send Feedback</Button>
      </CardBody>
    </Card>

    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" onClick={() => setVisibleFeedbacks(!visibleFeedbacks)}>
            <h3 className={classes.cardTitleWhite}>Here are your previous feedback messages</h3>
            <p className={classes.cardCategoryWhite}>
              Check this to be sure you don't write the same feedback content twice.
            </p>
          </CardHeader>
          <CardBody>
            {visibleFeedbacks && <Table
              tableHeaderColor="primary"
              tableHead={["Date", "Message", "Customer Rating", "Answered", "Solved"]}
              tableData={
                feedbacks.map((feedback) => { return [moment(feedback.createdAt).format('MM/DD/YYYY'), feedback.text, '5 - Medium', "Not yet", "Not yet"] })
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
