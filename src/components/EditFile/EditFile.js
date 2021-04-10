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
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import TextField from "@material-ui/core/TextField";

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
import { useHistory } from "react-router-dom";

/*
import app from "assets/img/fileExtentions/png/003-app.png";
import css from "assets/img/fileExtentions/png/008-css.png";
import csv from "assets/img/fileExtentions/png/009-csv.png";
import dat from "assets/img/fileExtentions/png/010-dat.png";
import doc from "assets/img/fileExtentions/png/012-doc.png";
import docx from "assets/img/fileExtentions/png/013-docx.png";
import exe from "assets/img/fileExtentions/png/017-exe.png";
import flv from "assets/img/fileExtentions/png/018-flv.png";
import gif from "assets/img/fileExtentions/png/019-gif.png";

import html from "assets/img/fileExtentions/png/020-html.png";
import iso from "assets/img/fileExtentions/png/022-iso.png";
import jar from "assets/img/fileExtentions/png/023-jar.png";
import jpeg from "assets/img/fileExtentions/png/024-jpeg.png";
import jpg from "assets/img/fileExtentions/png/025-jpg.png";
import log from "assets/img/fileExtentions/png/027-log format.png";
import pdf from "assets/img/fileExtentions/png/032-pdf.png";
import otf from "assets/img/fileExtentions/png/034-otf.png";
import ppt from "assets/img/fileExtentions/png/037-ppt.png";

import rar from "assets/img/fileExtentions/png/040-rar.png";
import sql from "assets/img/fileExtentions/png/041-sql.png";
import svg from "assets/img/fileExtentions/png/043-svg.png";
import ttf from "assets/img/fileExtentions/png/044-ttf.png";
import txt from "assets/img/fileExtentions/png/045-txt.png";
import wav from "assets/img/fileExtentions/png/046-wav format.png";
import xls from "assets/img/fileExtentions/png/047-xls.png";
import xlsx from "assets/img/fileExtentions/png/048-xlsx.png";
import zip from "assets/img/fileExtentions/png/050-zip.png";
*/

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
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
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

const mimeTypeMap = {
	"audio/aac": "aac",
	"application/x-abiword": "abw",
	"application/octet-stream": "bin",
	"image/bmp": "bmp",
	"application/x-bzip": "bz",
	"text/css": "css",
	"text/csv": "csv",
	"application/msword": "doc",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
	"image/gif": "gif",
	"text/html": "html",
	"image/vnd.microsoft.icon": "ico",
	"image/jpeg": "jpg",
	"text/javascript": "js",
	"application/json": "json",
	"text/javascript": "mjs",
	"video/mp4": "mp4",
	"video/mpeg": "mpeg",
	"application/vnd.oasis.opendocument.spreadsheet": "ods",
	"application/vnd.oasis.opendocument.text": "odt",
	"font/otf": "otf",
	"image/png": "png",
	"application/pdf": "pdf",
	"application/x-httpd-php": "php",
	"application/vnd.ms-powerpoint": "ppt",
	"application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
	"application/vnd.rar": "rar",
	"application/rtf": "rtf",
	"image/svg+xml": "svg",
	"application/x-tar": "tar",
	"image/tiff": "tiff",
	"text/plain": "txt",
	"audio/wav": "wav",
	"application/xhtml+xml": "xhtml",
	"application/vnd.ms-excel": "xls",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
	"application/xml": "xml",
	"text/xml": "xml",
	"application/zip": "zip",
	"application/x-7z-compressed": "7z"
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


export default function Album() {
  const classes = useStyles();
  const classes1 = useStyles1();
  const classes2 = useStyles2();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [succesAlert, setSuccesAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  // used for document tags
  const [newTag, setNewTag] = useState('');
  const [chipData, setChipData] = useState([]);

  // used for people with whom the docuemnt is being shared
  const [newCode, setNewCode] = useState('');
  const [chipDataCodes, setChipDataCodes] = useState([]);

  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [extension, setExtension] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // url for amazon file
  const [fileLocationUrl, setFileLocationUrl] = useState('');

  // file upload
  const [files, setFiles] = useState([]);

  let history = useHistory();

  const handleChangeFiles = (files) => {
    console.log("here baby");
    console.log(files);
    setFiles(files);
  };

  const handleChange = (event) => {
    setPersonName(event.target.value);
    setExtension(event.target.value);
  };

  const onChangeNewCode = (myNewCode) => {
    setNewCode(myNewCode.target.value);
  };

  const onChangeNewTag = (myNewTag) => {
    setNewTag(myNewTag.target.value);
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

  const showNotification = (place, customMessage) => {
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
          setErrorMessage(customMessage);
          setTimeout(function() {
            setErrorAlert(false);
          }, 4000);
        }
        break;
      default:
        break;
    }
  };


  const getDocumentData = () => {
    UserService.getCurrentUser1().then(
      (response) => {
        console.log(JSON.stringify(response.data.id));
        const fileId = window.location.href.slice(33, window.location.href.length);
        console.log(fileId);
        axios.get("http://localhost:5000/document/" + fileId).then(res => {
          console.log(JSON.stringify(res.data));
          setHeading(res.data.heading);
          setDescription(res.data.description);
          setExtension(res.data.extension);
          setPersonName(res.data.extension);
          setFileLocationUrl(res.data.locationUrl);

          let newChipData = [];
          for (var i = 0; i < res.data.tags.length; i++) {
            newChipData.push({key: i + 1, label: res.data.tags[i]});
          }
          setChipData(newChipData); // this needs to be filtered to {'label' 'key'} format

          let newChipCodes = [];
          for (var i = 0; i < res.data.sharedWith.length; i++) {
            newChipCodes.push({key: i + 1, label: res.data.sharedWith[i]});
          }
          setChipDataCodes(newChipCodes); // this needs to be filtered to {'label' 'key'} format

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
    getDocumentData(), []
  );

  const handleDelete = (chipToDelete) => () => {
    let updatedChipData = chipData.filter((chip) => chip.key !== chipToDelete.key);
    setChipData(updatedChipData);
  };

  const handleDeleteCode = (chipToDelete) => () => {
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

    if (alreadyThere === 0 && newTag !== '') {  
      setNewTag('');
      setChipData([...chipData, newChip]);
    }
    else {
      setNewTag('');
    }
  };

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

  const handleUpdateDocument = () => {
    console.log('here inside handleUpdateDocument');
    // axios post for current document info
    UserService.getCurrentUser1().then(
      (response) => {
        console.log(response);
        console.log(JSON.stringify(response.data.id));
        const fileId = window.location.href.slice(33, window.location.href.length);
        console.log(fileId);
    
        // let's set a flag so we don't have to reuplaod a file each time
        let metaDataOnly = false;

        // first upload the file to amazon aws s3 bucket
        // if that happens succesfully, then get the url location
        // and store everything in the database
        const data = new FormData();
        data.append("name", "tomitza"); // real file.name
        data.append("file", files[0]);  // only one file
        if (!files[0]) {
          metaDataOnly = true;
        }

        console.log("not empty files");
        !metaDataOnly && axios.post("http://localhost:5000/upload/file", data)
          .then(res => {
            // file uploaded succesfully
            console.log(res);
            console.log(JSON.stringify(res.data.locationUrl));
            console.log(JSON.stringify(res.data.extension));
            setPersonName(res.data.extension);
            axios.put("http://localhost:5000/document/" + fileId, {
              userId: response.data.id,
              heading: heading,
              extension: res.data.extension,
              tags: chipData.map(e => e.label),
              sharedWith: chipDataCodes.map(e => e.label),
              description: description,
              locationUrl: res.data.locationUrl
            }).then(res => { 
              showNotification("succesAlert");
              console.log(res);
              console.log(JSON.stringify(res.data));
              // window.location.reload(false); 
              setTimeout(function() {
                history.push("/admin/" + "album");
              }, 3000);
              }).catch((error) => {
                // Error
                showNotification("errorAlert", "We are very sory but something went wrong with your request. Please try again!");
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
          }).catch(err => {
            // something bad happend during the aws file upload
            console.log(err);
          });

          // update metadata only here
          metaDataOnly && axios.put("http://localhost:5000/document/" + fileId, {
            userId: response.data.id,
            heading: heading,
            tags: chipData.map(e => e.label),
            sharedWith: chipDataCodes.map(e => e.label),
            description: description,
            metaDataOnly: true
          })
          .then(res => {
            showNotification("succesAlert");
              console.log(res);
              console.log(JSON.stringify(res.data));
              // window.location.reload(false); 
              setTimeout(function() {
                history.push("/admin/" + "album");
              }, 3000);
          })
          .catch(error => {
            // Error
            showNotification("errorAlert", "We are very sory but something went wrong with your request. Please try again!");
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

    const handleDeleteDocument = () => {
      console.log('here inside handleDeleteDocument');
      // axios post for current document info
      UserService.getCurrentUser1().then(
        (response) => {
          console.log(response);
          console.log(JSON.stringify(response.data.id));
          const fileId = window.location.href.slice(33, window.location.href.length);
          console.log(fileId);
          console.log(response.data.id);
          console.log(chipDataCodes.map(e => e.label));
          axios.post("http://localhost:5000/documentDelete/" + fileId, {
            userId: response.data.id,
            sharedWith: chipDataCodes.map(e => e.label),
          }).then(res => {
            showNotification("succesAlert");
            console.log(res);
            console.log(JSON.stringify(res.data));
            setTimeout(function() {
              history.push("/admin/" + "album");
            }, 3000);
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

    const handleDownloadDocument = () => {
      console.log('here inside handleDownloadDocument');
      console.log(fileLocationUrl);
      window.open(fileLocationUrl, '_blank');
    };

    const handleKeyDownForTags = (event) => {
      if (event.key === 'Enter') {
        handleNewTag();
      }
    };
  
    const handleKeyDownForPublicCodes = (event) => {
      if (event.key === 'Enter') {
        handleNewCode();
      }
    };

  return (
    <div> 
      <div>
        <div style={{textAlign: 'center'}}>
          <Typography variant="h2" style={{textAlign: 'center', marginBottom: '15px', marginTop: '-40px'}}>
            Document Editor
          </Typography>
        </div>

    <Card>
      <CardHeader color="primary">
        <h3 className={classes.cardTitleWhite}>Use the above form to edit the information about your existing document</h3>
        <p className={classes.cardCategoryWhite}>
          Change the title, description, add new tags or remove old ones. 
          You can even replace the document by adding a brand new one.
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
            label="Title"
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
            onKeyDown={handleKeyDownForTags}
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
            onKeyDown={handleKeyDownForPublicCodes}
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
            <DropzoneArea
              onChange={handleChangeFiles}
            />
            </div>

          </Grid>

        </Grid>
      </Grid>
      </div>

      <div>


      <Button style={{float: 'left', marginTop: '25px', marginBottom: '25px', marginLeft: "15px"}} 
              color="primary" onClick={handleUpdateDocument}>Update Document</Button>

      <Button style={{float: 'left', marginTop: '25px', marginBottom: '25px', marginLeft: "15px"}} 
              color="primary" onClick={handleDeleteDocument}>Delete Document</Button>

      <Button style={{float: 'left', marginTop: '25px', marginBottom: '25px', marginLeft: "15px"}} 
              color="primary" onClick={handleDownloadDocument}>Download Document</Button>
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
            errorMessage}
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

