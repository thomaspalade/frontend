/*eslint-disable*/
import React, { useEffect, useState } from 'react'

// Libraries
import ReactFetchImage, { fetchBase64 } from 'react-fetch-image'

// Extra
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Grid from '@material-ui/core/Grid';

import TextField from "@material-ui/core/TextField";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import ContentEditable from "react-contenteditable";
import Avatar from "@material-ui/core/Avatar";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.js";
import Chip from '@material-ui/core/Chip';


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


const useStyles = makeStyles(styles);

const getViewType = () => {
  const lastFourLetters = window.location.href.slice(window.location.href.length - 4, window.location.href.length);
  const lastThreeLetter = lastFourLetters.slice(1, 4);
  console.log(lastFourLetters, lastThreeLetter);
  return (lastFourLetters === "jpeg" || lastThreeLetter === "png" || lastThreeLetter === "gif"
    || lastThreeLetter === "jpg" || lastThreeLetter === "tif" || lastThreeLetter === "bmp");
};

const getFileUrl = () => {
  const fileId = window.location.href.slice(35, window.location.href.length);
  const baseBucketId = "https://documente-licenta.s3.eu-central-1.amazonaws.com/documents/";
  console.log(fileId);
  return (baseBucketId + fileId);
};

const getFileName = () => {
  const fileId = window.location.href.slice(35, window.location.href.length);
  return fileId;
};

const download = (url) => {
  console.log("here baby");
  let image = fetch("https://documente-licenta.s3.eu-central-1.amazonaws.com/documents/001.jpeg");
};

const App = () => {
  const [backgroundSrc, setBackgroundSrc] = useState('')
  const [fetchingBackgroundSrc, setFetchingBackgroundSrc] = useState(true)
  const fetcher = {
    url: getFileUrl()
  };

  const classes = useStyles();
  const classes1 = useStyles1();

  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('lg');
  
  // used for document tags
  const [chipData, setChipData] = useState([
    {key: "tag1", label: "tag1"}, 
    {key: "tag2", label: "tag2"},
    {key: "tag3", label: "tag3"}, 
  ]);
  
  // used for people with whom the docuemnt is being shared
  const [chipDataCodes, setChipDataCodes] = useState([
    {key: "12321321", label: "12321321"}, 
    {key: "1231231231", label: "12312331"},
    {key: "1232232", label: "1232232"}, 
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchBase64({
      ...fetcher,
      ...{
        callback: (base64: any) => {
          setBackgroundSrc(base64)
          setFetchingBackgroundSrc(false)
        },
        callbackError: () => {
          setFetchingBackgroundSrc(false)
        }
      }
    })
  }, [fetcher])

  return (
    <>
    {!getViewType() 
      ? <iframe
        style={{
          height:"1300px", width:"1300px"
        }}
        src={`https://docs.google.com/viewer?url=${getFileUrl()}&embedded=true`}
      />
      :
      <div style={{
        display: "flex",
        flexWrap: "wrap", /* Optional. only if you want the items to wrap */
        justifyContent: "center", /* For horizontal alignment */
        alignItems: "center", /* For vertical alignment */}}>
      <ReactFetchImage
        className='mx-auto'
        loader={<div>Loading ...</div>}
        style={{
            // background: `url(${backgroundSrc})`,
            width: '50%',
            height: '50%',
            marginTop: "35px",
            // backgroundSize: 'contain',
            // backgroundPosition: 'center center',
            // backgroundRepeat: 'no-repeat'
          }}
        fetcher={fetcher}
      />

    <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{getFileName()}</DialogTitle>
        <DialogContent>

          <GridContainer>
<GridItem xs={12} sm={12} md={8}>
  <Card>
    <CardHeader color="primary">
      <h4 className={classes.cardTitleWhite}>Image Viewer</h4>
      <p className={classes.cardCategoryWhite}>Click on image for Full Screen</p>
    </CardHeader>
    <CardBody>
    <div style={{
        display: "flex",
        flexWrap: "wrap", /* Optional. only if you want the items to wrap */
        justifyContent: "center", /* For horizontal alignment */
        alignItems: "center", /* For vertical alignment */}}>
      <ReactFetchImage
        className='mx-auto'
        loader={<div>Loading ...</div>}
        style={{
            // background: `url(${backgroundSrc})`,
            width: '50%',
            height: '50%',
            marginTop: "20px",
            // backgroundSize: 'contain',
            // backgroundPosition: 'center center',
            // backgroundRepeat: 'no-repeat'
          }}
        fetcher={fetcher}
        />
        </div>
    </CardBody>
      </Card>
    </GridItem>


      <GridItem xs={12} sm={12} md={4}>
      <Card>
    <CardHeader color="primary">
    <h4 className={classes.cardTitleWhite}>Document Info</h4>
      <p className={classes.cardCategoryWhite}>Your Image Metadata</p>
    </CardHeader>
    <CardBody>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {
            <div>
              {<TextField
                variant="outlined"
                margin="normal"
                // required
                fullWidth
                id="publicCode"
                label="Title"
                // name="publicCode"
                autoComplete="publicCode"
                // autoFocus
                // onChange={e => setMail(e.target.value)}
                type="text"
                // className="form-control"
                name="publicCode"
                // value={publicCode || ''}
                value="Thomas"
                // onChange={"onChangepublicCode"}
                multiline
                // validations={[required]}
              />
              }
              </div>
            }
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
          {
            <div>
              {<TextField
                variant="outlined"
                margin="normal"
                // required
                fullWidth
                id="publicCode"
                label="Description"
                // name="publicCode"
                autoComplete="publicCode"
                // autoFocus
                // onChange={e => setMail(e.target.value)}
                type="text"
                // className="form-control"
                name="publicCode"
                // value={publicCode || ''}
                value="O poza cu familia mea"
                // onChange={"onChangepublicCode"}
                multiline
                // validations={[required]}
              />
              }
              </div>
            }
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
          {
            <div>
            <div style={{marginTop: "5px", fontSize: "15px"}}>
              Document tags:
            </div>
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
                  className={classes1.chip}
                  />
                </li>
                );
              })
            }
            </div>
            </div>
            }
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
          {
            <div>
            <div style={{marginTop: "5px", fontSize: "15px"}}>
              Shared with:
            </div>
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
                  className={classes1.chip}
                  />
                </li>
                );
              })
            }
            </div>
            </div>
            }
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
      </GridItem>

      </GridContainer>
          

        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>

    </div>
    }
    </>
    
  )
}

export default App
