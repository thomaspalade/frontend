import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import avatar from "assets/img/faces/marc.jpg";
import ContentEditable from "react-contenteditable";

import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
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

export default function UserProfile() {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };
  const onChangeCompany = (e) => {
    const company = e.target.value;
    setCompany(company);
  };
  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };
  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };
  const onChangeCity = (e) => {
    const city = e.target.value;
    setCity(city);
  };
  const onChangeCountry = (e) => {
    const country = e.target.value;
    setCountry(country);
  };
  const onChangePostalCode = (e) => {
    const postalCode = e.target.value;
    setPostalCode(postalCode);
  };
  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };
  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };

  const getUserProfileData = () => {
    console.log('trying to get user data');
    
    UserService.getCurrentUser1().then(
      (response) => {
        console.log(response);
        // HERE FOARTE IMPORTANT
        // daca s-a intors aici cu response ok atunci s-a autentificat bine si pot face orice actiune
        // adica token-ul e bine bine
        console.log(JSON.stringify(response.data.id));
        axios.get("http://localhost:5000/profile/" + response.data.id).then(res => {
          console.log(res);
          console.log(JSON.stringify(res.data));
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setEmail(res.data.email);
          setPhone(res.data.phone);
          setCompany(res.data.company);
          setCity(res.data.city);
          setCountry(res.data.country);
          setPostalCode(res.data.postalCode);
          setDescription(res.data.description);
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
    getUserProfileData(), []
  );

  const handleProfileUpdate = (e) => {
    console.log('inside handleProfileUpdate');
    UserService.getCurrentUser1().then(
      (response) => {
        console.log(response);
        // HERE FOARTE IMPORTANT
        // daca s-a intors aici cu response ok atunci s-a autentificat bine si pot face orice actiune
        // adica token-ul e bine bine
        console.log(JSON.stringify(response.data.id));
        axios.put("http://localhost:5000/profile/" + response.data.id, {
          userId: response.data.id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          company: company,
          city: city,
          country: country,
          address: address,
          postalCode: postalCode,
          description: description
        }).then(res => {
          console.log(res);
          console.log(JSON.stringify(res.data));
          window.location.reload(false); 
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          // window.location.reload(false); 
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
      <div>
      <div style={{textAlign: 'center'}}>
      <Typography variant="h2" style={{textAlign: 'center', marginBottom: '15px', marginTop: '-15px'}}>
          My account info
      </Typography>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                {
                  // this is the textbox for email adress
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // required
                    fullWidth
                    id="company"
                    label="Company"
                    // name="company"
                    autoComplete="company"
                    autoFocus
                    // onChange={e => setMail(e.target.value)}
                    type="text"
                    // className="form-control"
                    name="company"
                    value={company || ''}
                    // value="VIO Dragu SRL"
                    onChange={onChangeCompany}
                    // validations={[required]}
                  />
                }
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                {
                  // this is the textbox for email adress
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // required
                    fullWidth
                    id="username"
                    label="Username"
                    // name="username"
                    autoComplete="username"
                    autoFocus
                    // onChange={e => setMail(e.target.value)}
                    type="text"
                    // className="form-control"
                    name="username"
                    value={email.slice(0, 5) || ''}
                    /// value="Tomi neb 1"
                    onChange={onChangeUsername}
                    // validations={[required]}
                  />
                }
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                {
                  // this is the textbox for email adress
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // required
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
                    value={email || ''}
                    /// value="thomas.e.palade@gmail.com"
                    onChange={onChangeEmail}
                    // validations={[required]}
                  />
                }
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                {
                  // this is the textbox for firstname adress
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    // name="firstName"
                    autoComplete="firstName"
                    autoFocus
                    // onChange={e => setMail(e.target.value)}
                    type="text"
                    // className="form-control"
                    name="firstName"
                    value={firstName || ''}
                    //value="Thomas"
                    onChange={onChangeFirstName}
                    // validations={[required]}
                  />
                }
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                {
                  // this is the textbox for firstname adress
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    // name="lastName"
                    autoComplete="lastName"
                    autoFocus
                    // onChange={e => setMail(e.target.value)}
                    type="text"
                    // className="form-control"
                    name="lastName"
                    value={lastName || ''}
                    /// value="Thomas"
                    onChange={onChangeLastName}
                    // validations={[required]}
                  />
                }
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                {
                  // this is the textbox for firstname adress
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // required
                    fullWidth
                    id="city"
                    label="City"
                    // name="city"
                    autoComplete="city"
                    autoFocus
                    // onChange={e => setMail(e.target.value)}
                    type="text"
                    // className="form-control"
                    name="city"
                    value={city || ''}
                    /// value="Bucharest"
                    onChange={onChangeCity}
                    // validations={[required]}
                  />
                }
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                {
                  // this is the textbox for firstname adress
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // required
                    fullWidth
                    id="country"
                    label="Country"
                    // name="country"
                    autoComplete="country"
                    autoFocus
                    // onChange={e => setMail(e.target.value)}
                    type="text"
                    // className="form-control"
                    name="country"
                    /// value={country}
                    value={country || ''}
                    onChange={onChangeCountry}
                    // validations={[required]}
                  />
                }
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                {
                  // this is the textbox for firstname adress
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // required
                    fullWidth
                    id="postalCode"
                    label="Postal Code"
                    // name="postalCode"
                    autoComplete="postalCode"
                    autoFocus
                    // onChange={e => setMail(e.target.value)}
                    type="text"
                    // className="form-control"
                    name="postalCode"
                    /// value={postalCode}
                    value={postalCode || ''}
                    onChange={onChangePostalCode}
                    // validations={[required]}
                  />
                }
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <div>  
                  {false&&
                <ContentEditable
                  className="editable"
                  tagName="pre"
                  placeholder="This is there place where you can insert text"
                  // html={//this.state.jokeText}
                  // disabled={//!this.state.editable} // use true to disable edition
                  //onChange={//this.handleChangeJokeText} // handle innerHTML change
                  // onBlur={this.sanitize}
                />
                  }
                </div>

                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  {
                  // this is the textbox for firstname adress
                  <TextField
                    variant="outlined"
                    margin="normal"
                    // required
                    fullWidth
                    id="postalCode"
                    label="Description"
                    // name="description"
                    autoComplete="description"
                    autoFocus
                    // onChange={e => setMail(e.target.value)}
                    type="text"
                    // className="form-control"
                    name="description"
                    value={description || ''}
                    // value="Thomas"
                    onChange={onChangeDescription}
                    multiline
                    // validations={[required]}
                  />
                }
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={handleProfileUpdate}>Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
    </div>
  );
}
