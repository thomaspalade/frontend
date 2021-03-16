import React, { useState, useEffect, Component } from "react";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import axios from 'axios';
import {DropzoneArea} from 'material-ui-dropzone';
import {DropzoneDialog} from 'material-ui-dropzone';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";

// @material-ui/core components
// core components
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.js";

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

const useStyles1 = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    marginBottom: "-30px"
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '81.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    display: 'flex',
    justifyContent: 'left',
    marginLeft: 0,
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 0,
    marginTop: 0,
    margin: 0,
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatar: {
    backgroundColor: '#E1173F'
  },
  chip: {
    margin: 10,
  }
}));

const useStyles2 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 600,
    textDecoration: 'none'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'docx',
  'css',
  'csv',
  'xls',
  'doc',
  'docx',
  'exe',
  'jar',
  'jpeg',
  'iso',
  'jpg',
  'pdf',
  'otf',
  'ppt',
  'rar',
  'xlsx',
  'zip'
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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


class DropzoneAreaExample extends Component{
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files){
    this.setState({
      files: files
    });
  }
  render(){
    return (
      <DropzoneArea
        onChange={this.handleChange.bind(this)}
        />
    )
  }
}

/*
export default class DropzoneDialogExample extends Component {
  constructor(props) {
      super(props);
      this.state = {
          open: false,
          files: []
      };
  }

  handleClose() {
      this.setState({
          open: false
      });
  }

  handleSave(files) {
      //Saving files to state for further use and closing Modal.
      this.setState({
          files: files,
          open: false
      });
  }

  handleOpen() {
      this.setState({
          open: true,
      });
  }

  render() {
      return (
          <div>
              <Button onClick={this.handleOpen.bind(this)}>
                Add Image
              </Button>
              <DropzoneDialog
                  open={this.state.open}
                  onSave={this.handleSave.bind(this)}
                  acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                  showPreviews={true}
                  maxFileSize={5000000}
                  onClose={this.handleClose.bind(this)}
              />
          </div>
      );
  }
}
*/

/*
class DropzoneDialogExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: []
    };
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleSave(files) {
    //Saving files to state for further use and closing Modal.
    this.setState({
      files: files,
      open: false
    });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    return (
      <div>
                  <Card>
        <Button onClick={this.handleOpen.bind(this)}>
          <CardMedia
            style={{'paddingTop': '81.25%'}}
            title="Image title"
            image={true ? require('assets/img/fileExtentions/png/upload_file_image') :
            require('assets/img/fileExtentions/png/upload_file_image')
          }
          />
        </Button>
        <DropzoneDialog
          open={this.state.open}
          onSave={this.handleSave.bind(this)}
          acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={this.handleClose.bind(this)}
        />
        </Card>
      </div>
    );
  }
}
*/


export default function Album() {
  const classes = useStyles();
  const classes1 = useStyles1();
  const classes2 = useStyles2();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  // used for document tags
  const [newTag, setNewTag] = useState('');
  const [chipData, setChipData] = useState([]);

  // used for people with whom the docuemnt is being shared
  const [newCode, setNewCode] = useState('');
  const [chipDataCodes, setChipDataCodes] = useState([]);

  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [extension, setExtension] = useState('');
  const [succesAlert, setSuccesAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  let history = useHistory();

  const onChangeDocument = (e) => {
  };

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const onChangeNewTag = (myNewTag) => {
    setNewTag(myNewTag.target.value);
  };

  const onChangeNewCode = (myNewCode) => {
    setNewCode(myNewCode.target.value);
  };

  const onChangeHeading = (e) => {
    const heading = e.target.value;
    setHeading(heading);
  };
  const onChangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };
  const onChangeExtension = (e) => {
    const extension = e.target.value;
    setExtension(extension);
  };

  const getAllUserExistingDocuments = () => {
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

  const handleUploadDocument = () => {
    // axios post for current document info
      UserService.getCurrentUser1().then(
        (response) => {
          console.log(JSON.stringify(response.data.id));
          axios.post("http://localhost:5000/documents", {
            userId: response.data.id,
            heading: heading,
            extension: personName,
            tags: chipData.map(e => e.label),
            sharedWith: chipDataCodes.map(e => e.label),
            description: description
          }).then(res => {
            showNotification("succesAlert");
            console.log(JSON.stringify(res.data));
            // window.location.reload(false);
            setTimeout(function() {
              history.push("/admin/" + "album");
            }, 2000);
            // setFirstName(res.data.firstName);
            // setLastName(res.data.lastName);
            // window.location.reload(false); 
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
    getAllUserExistingDocuments(), []
  );

  const onRequestDocumentSearch = (e) => {
    getAllUserExistingDocuments();
  };

  const handleDelete = (chipToDelete) => () => {
    console.log('here');
    console.log(chipData);
    let updatedChipData = chipData.filter((chip) => chip.key !== chipToDelete.key);
    setChipData(updatedChipData);
  };

  const handleDeleteCode = (chipToDelete) => () => {
    console.log('here');
    console.log(chipDataCodes);
    let updatedChipData = chipDataCodes.filter((chip) => chip.key !== chipToDelete.key);
    setChipDataCodes(updatedChipData);
  };

  const handleNewTag = () => {
    let newKey = 0;
    let alreadyThere = 0;

    chipData.map((chip) => {
      if (chip.key > newKey) {
        newKey = chip.key;
      }
      if (chip.label === newTag) {
        alreadyThere = 1;
      }
    });

    const newChip = {
      key: newKey + 1,
      label: newTag
    };

    console.log("here inima");
    console.log(newTag);

    if (alreadyThere === 0 && newTag !== '') {  
      setNewTag('');
      setChipData([...chipData, newChip]);
    }
    else {
      setNewTag('');
    }
  }

  const handleNewCode = () => {
    let newKey = 0;
    let alreadyThere = 0;

    console.log(newCode);

    chipDataCodes.map((chip) => {
      if (chip.key > newKey) {
        newKey = chip.key;
      }
      if (chip.label === newCode) {
        alreadyThere = 1;
      }
    });

    const newChip = {
      key: newKey + 1,
      label: newCode
    };

    if (alreadyThere === 0 && newCode !== '') {  
      setNewCode('');
      setChipDataCodes([...chipDataCodes, newChip]);
    }
    else {
      setNewCode('');
    }
  };

  return (
    <div> 
      <div>
        <div style={{textAlign: 'center'}}>
          <Typography variant="h2" style={{textAlign: 'center', marginBottom: '15px', marginTop: '-40px'}}>
            Document Upload
          </Typography>
        </div>

    <Card>
      <CardHeader color="primary">
        <h3 className={classes.cardTitleWhite}>Upload your file using the form above</h3>
        <p className={classes.cardCategoryWhite}>
          Don't forget to add some tags so you can find your documents easily in the future
        </p>
      </CardHeader>



      <div style={{marginTop: "20px"}}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
        
          <Grid item xs={5}>
            <div>
            <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            style={{marginLeft: "15px"}}
            id="heading"
            label="Heading"
            // name="heading"
            autoComplete="heading"
            autoFocus
            // onChange={e => setMail(e.target.value)}
            type="heading"
            // className="form-control"
            name="heading"
            value={heading || ''}
            // value="Thomas"
            onChange={onChangeHeading}
            multiline
            // validations={[required]}
          />

          <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            style={{marginLeft: "15px"}}
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

          <div style={{marginLeft: "10px"}}>
            <FormControl className={classes2.formControl}>
              <InputLabel id="demo-mutiple-name-label"> File extension </InputLabel>
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

          <div style={{marginLeft: "20px", marginTop: "20px", fontSize: "18px"}}>
            Document tags helps us find your document easier. Add a few, please
          </div>

          <TextField
            id="newTag"
            label="Add tag here"
            value={newTag}
            style={{marginBottom: "15px", marginLeft: "20px", minWidth: "200px"}}
            onChange={onChangeNewTag}
            onBlur={handleNewTag}
            onSubmit={handleNewTag}
          />

          <div component="ul" className={classes1.root}>
            {
              chipData.map((data) => {
              let icon;

              if (data.label === 'React') {
              icon = <TagFacesIcon />;
              }

              return (
              <li key={data.key}>
                <Chip
                icon={icon}
                label={'#' + data.label}
                onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                className={classes1.chip}
                />
              </li>
              );
            })
          }
          </div>

          <div style={{marginLeft: "20px", marginTop: "20px", fontSize: "18px"}}>
            People who have acces to this Document
          </div>

          <TextField
            id="newCode"
            label="Add public user code here"
            value={newCode}
            style={{marginBottom: "15px", marginLeft: "20px", minWidth: "200px"}}
            onChange={onChangeNewCode}
            onBlur={handleNewCode}
            onSubmit={handleNewCode}
          />

          <div component="ul" className={classes1.root}>
            {
              chipDataCodes.map((data) => {
              let icon;

              if (data.label === 'React') {
              icon = <TagFacesIcon />;
              }

              return (
              <li key={data.key}>
                <Chip
                icon={icon}
                label={'#' + data.label}
                onDelete={data.label === 'React' ? undefined : handleDeleteCode(data)}
                className={classes1.chip}
                />
              </li>
              );
            })
          }
          </div>

          </div>
          </Grid>

          <Grid item xs={7}>
            <div style={{marginTop: "20px"}}>
          <DropzoneAreaExample/>
            </div>

          </Grid>

        </Grid>
      </Grid>
      </div>


      <div>




      <Button style={{float: 'left', marginTop: '25px', marginBottom: '25px', marginLeft: "15px"}} 
              color="primary" onClick={handleUploadDocument}>Upload Document</Button>
        </div>

        
        </Card>
    </div>
      
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
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    </div>
  );
}