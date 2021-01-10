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
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import Grid from '@material-ui/core/Grid';
import moment from 'moment'

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

export default function FeedbackPage(props) {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const onChangeText = (e) => {
    const text = e.target.value;
    setText(text);
  };

  const getAllUserExistingFeedbacks = () => {
    UserService.getCurrentUser1().then(
      (response) => {
        console.log(response);
        // HERE FOARTE IMPORTANT
        // daca s-a intors aici cu response ok atunci s-a autentificat bine si pot face orice actiune
        // adica token-ul e bine bine
        console.log(JSON.stringify(response.data.id));
        axios.get("http://localhost:5000/feedbacks/" + response.data.id).then(res => {
          console.log(res);
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
        axios.post("http://localhost:5000/feedbacks/", {
          userId: response.data.id,
          text: text
        }).then(res => {
          console.log(res);
          console.log(JSON.stringify(res.data));
          setText(res.data.text);
          window.location.reload(false);

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

  return (
    <div>
      <div style={{textAlign: 'center'}}>
      <Typography variant="h2" style={{textAlign: 'center', marginBottom: '15px', marginTop: '-15px'}}>
          Feedback
      </Typography>
      </div>

    <Card>
      <CardHeader color="primary">
      <h3 className={classes.cardTitleWhite}>You can write us a personal message with your suggestions!</h3>
        <p className={classes.cardCategoryWhite}>
          We are open to any good ideas. Our community is the most important for us. You are a major key to our succes.
        </p>
      </CardHeader>
      <CardBody>
        <InputLabel style={{ color: "#AAAAAA" }}>Complete the text message from above</InputLabel>
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
      </CardBody>
    </Card>
    <Card>
    <CardFooter>
      <Button color="primary" onClick={handleSendFeedback}>Send Feedback</Button>
    </CardFooter>
    </Card>

    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h3 className={classes.cardTitleWhite}>Here are your previous feedback messages</h3>
            <p className={classes.cardCategoryWhite}>
              Check this to be sure you don't write the same feedback content twice.
            </p>
          </CardHeader>
          <CardBody>
            {true && <Table
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

    </div>
  );
}
