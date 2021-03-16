import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import Button from "components/CustomButtons/Button.js";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.js";
import AuthService from "../services/auth.service";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:8081/admin/dashboard/">
      Thomas-Emanuel Palade
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#9c27b0',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const ResetPassword = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [succesAlert, setSuccesAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const classes = useStyles();
  const [mail, setMail] = useState('');

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
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

  const handleResetPassword = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4001/forgotPassword/",{
      "email": email,
    })
    .then(res => {
      console.log(res);
      showNotification("succesAlert");
      // error handling above
      }
    ).catch((error) => {
      showNotification("errorAlert");
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        console.log(error.response.status);
        if (error.response.status === 400) {
          // username-ul este deja utilizat de altcineva, incearca cu altul
          // error handling
          console.log(error.response);
          
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the 
        // browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.response);
        // error handling
        // console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log(error.response);
      }
      /// console.log(error.config);
      console.log(error.config);
    });
  }

  return (
      <div>
        
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          { 

          }
          <form className={classes.form} noValidate onSubmit={handleResetPassword} ref={form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              // name="email"
              autoComplete="email"
              autoFocus
              // onChange={e => setMail(e.target.value)}
              type="text"
              // className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required]}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleResetPassword}
            >
              SEND EMAIL TO RESET PASSWORD
            </Button>
            {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>

    {
        
      <div style={{display: 'none'}}>
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form onSubmit={handleResetPassword} ref={form}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>ResetPassword</span>
              </button>
            </div>

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    }

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
};

export default ResetPassword;
