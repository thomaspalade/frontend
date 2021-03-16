import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import Button from "components/CustomButtons/Button.js";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.js";

import AuthService from "../services/auth.service";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
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
    marginTop: theme.spacing(3),
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

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [succesAlert, setSuccesAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const classes = useStyles();
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [mail, setMail] = useState('');

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
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

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    console.log(checkBtn.current.context._errors);
    // if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password, firstName, lastName).then(
        // ne propunem sa se logheze cu emailul
        (response) => {
          showNotification("succesAlert");
          setMessage(response.data.message);
          setSuccessful(true);
          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          showNotification("errorAlert");
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleRegister} ref={form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                // name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                // onChange={e => setfName(e.target.value)}
                type="text"
                // className="form-control"
                name="firstName"
                value={firstName}
                onChange={onChangeFirstName}
                // validations={[required, vusername]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                // name="lastName"
                autoComplete="lname"
                // onChange={e => setfName(e.target.value)}
                type="text"
                // className="form-control"
                name="lastName"
                value={lastName}
                onChange={onChangeLastName}
                // validations={[required, vusername]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                // name="email"
                autoComplete="email"
                // onChange={e => setMail(e.target.value)}
                type="text"
                // className="form-control"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />

              {message && (

              <div>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label={`${message}`}
              />

                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
                </div>
              )}

            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleRegister}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" style={{color: '#002000'}}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>

    {
      <div style={{display: 'none'}}>
        <div className="col-md-12">
          <div className="card card-container">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            />

            <Form onSubmit={handleRegister} ref={form}>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={username}
                      onChange={onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={onChangeEmail}
                      validations={[required, validEmail]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </div>

                  <div className="form-group">
                    <button className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>
              )}

              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>
        </div>
        </div>
    }

      <div>
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
  );
};

export default Register;
