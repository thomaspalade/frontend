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
import Grid from '@material-ui/core/Grid';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { useTheme } from '@material-ui/core/styles';
import CardFooter from "components/Card/CardFooter.js";
import ContentEditable from "react-contenteditable";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";

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

const useStyles2 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 400,
    maxWidth: 400,
    textDecoration: 'none'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 6,
  },
  noLabel: {
    marginTop: theme.spacing(4),
  },
}));

const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      width: 800,
    },
  },
};

const names = [
  'Certificat de nastere',
  'Buletin in original',
  'Copie dupa Asigurare de Sanatate',
  'Acte de intabulare si cadastru',
  'Act de vanzare cumparare',
  'Declaratie de uzufruct',
  'Certificat de venit',
  'Declaratie de avere',
  'Numar kilograme aur',
  'Numar kilograme diamante',
  'Act aditional care mereu lipseste',
  'Declaratie de donatie',
  'Altele'
];

const namesInstitutions = [
  'ANAF - Administratie Nationala',
  'ISPJ - Inspectoratul Scolar',
  'IPGF - Inspectoratul feroviar',
  'ASNF - Asociatia Nationala',
];

const namesCounties = [
  'Arges',
  'Bacau',
  'Constanta',
  'Dolj',
  'Hunedoara',
  'Olt',
  'Vaslui',
  'Zalau',
  'Basarabia'
];

const namesCities = [
  'Husi',
  'Barlad',
  'Vaslui',
  'Murgeni',
  'Constanta',
  'Timisoara',
  'Iasi',
  'Craiova',
  'Brasov',
  'Adjud'
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function RequestDocument(props) {
  const classes = useStyles();
  const classes1 = useStyles1();
  const classes2 = useStyles2();
  const [succesAlert, setSuccesAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [personName, setPersonName] = React.useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [institution, setInstitution] = React.useState([]);
  const [county, setCounty] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const theme = useTheme();
  let history = useHistory();

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleChangeInstitution = (event) => {
    setInstitution(event.target.value);
  };

  const handleChangeCounty = (event) => {
    setCounty(event.target.value);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
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

  const getAllUserRequestData = () => {
    UserService.getCurrentUser1().then(
      (response) => {
        axios.get("http://localhost:5000/profile/" + response.data.id).then(res => {
          console.log(JSON.stringify(res.data));
          
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
    getAllUserRequestData(), []
  );

  const handleRequestDocument = (e) => {
    UserService.getCurrentUser1().then(
      (response) => {
        console.log(response);
        // HERE FOARTE IMPORTANT
        // daca s-a intors aici cu response ok atunci s-a autentificat bine si pot face orice actiune
        // adica token-ul e bine bine
        console.log(JSON.stringify(response.data.id));
        axios.post("http://localhost:5000/requests/" + response.data.id, {
          userId: response.data.id,
          name: name,
          description: description,
          personName: personName,
          county: county,
          city: city,
          institution: institution
        }).then(res => {
          showNotification("succesAlert");
          setTimeout(function() { history.push("/admin/" + "dashboard");}, 2000);
          console.log(res);
          console.log(JSON.stringify(res.data));
          window.location.reload(false);
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
          Request Documents
      </Typography>
      <CommentIcon style={{marginTop: -10, fontSize: 50}}/>
      </div>

    <GridContainer>
        <GridItem xs={12} sm={12} md={7}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Select which type of document you need and request it</h4>
              <p className={classes.cardCategoryWhite}>Complete the above data and then request</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {
                  // this is the textbox for firstname adress
                  <div style={{marginTop: "20px"}}>
                  <div>
                  <TextField
                  variant="outlined"
                  margin="normal"
                  // required
                  fullWidth
                  style={{marginLeft: "5px"}}
                  id="name"
                  label="Name"
                  // name="name"
                  autoComplete="name"
                  autoFocus
                  // onChange={e => setMail(e.target.value)}
                  type="name"
                  // className="form-control"
                  name="name"
                  value={name || ''}
                  // value="Thomas"
                  onChange={onChangeName}
                  multiline
                  // validations={[required]}
                  />

                  <TextField
                  variant="outlined"
                  margin="normal"
                  // required
                  fullWidth
                  style={{marginLeft: "5px"}}
                  id="description"
                  label="Description"
                  // name="heading"
                  autoComplete="description"
                  // autoFocus
                  // onChange={e => setMail(e.target.value)}
                  type="description"
                  // className="form-control"
                  name="description"
                  value={description || ''}
                  // value="Thomas"
                  onChange={onChangeDescription}
                  multiline
                  // validations={[required]}
                  />
                  </div>
                  </div>
                }
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={handleRequestDocument}>Request Document</Button>
            </CardFooter>
          </Card>
          
        </GridItem>


        <GridItem xs={12} sm={12} md={5}>
          <Card profile>
          <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Select which type of document you need and request it</h4>
              <p className={classes.cardCategoryWhite}>Complete the above data and then request</p>
            </CardHeader>

            <CardBody profile>

            <div style={{marginTop: "20px"}}>
          <Grid container spacing={1}>
            
                <div>
                

              <div style={{}}>
                <FormControl className={classes2.formControl}>
                  <InputLabel id="demo-mutiple-name-label"> Document type </InputLabel>
                  <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    
                    value={personName}
                    onChange={handleChange}
                    input={<Input />}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{}}>
                <FormControl className={classes2.formControl}>
                  <InputLabel id="demo-mutiple-name-label"> Public Institution </InputLabel>
                  <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    
                    value={institution}
                    onChange={handleChangeInstitution}
                    input={<Input />}
                    MenuProps={MenuProps}
                  >
                    {namesInstitutions.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, institution, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{}}>
                <FormControl className={classes2.formControl}>
                  <InputLabel id="demo-mutiple-name-label"> County </InputLabel>
                  <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    
                    value={county}
                    onChange={handleChangeCounty}
                    input={<Input />}
                    MenuProps={MenuProps}
                  >
                    {namesCounties.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, county, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div style={{}}>
                <FormControl className={classes2.formControl}>
                  <InputLabel id="demo-mutiple-name-label"> City </InputLabel>
                  <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    value={city}
                    onChange={handleChangeCity}
                    input={<Input />}
                    MenuProps={MenuProps}
                  >
                    {namesCities.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, city, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>


              </div>


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
  );
}
