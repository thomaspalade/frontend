import React, { useState, useEffect } from "react";
// import Button from '@material-ui/core/Button';
import Button from "components/CustomButtons/Button.js";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import SearchBar from 'material-ui-search-bar';
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import axios from 'axios';
import { useHistory } from "react-router-dom";
var AWS = require('aws-sdk');

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:8081/admin/dashboard">
        My Docs by Thomas-Emanuel Palade - 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    marginBottom: "-60px"
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '99.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Album() {
  const classes = useStyles();
  const [searchedDocument, setSearchedDocument] = useState("");
  const [documents, setDocuments] = useState([]);
  const [personal, setPersonal] = useState("personal");
  let history = useHistory();

  const onChangeDocument = (e) => {
    setSearchedDocument(e);
  };

  const handleRedirectToUploadPage = () => {
    history.push("/admin/" + "upload");
  };

  const handleRedirectToRequestPage = () => {
    history.push("/admin/" + "request");
  };

  const getAllUserExistingDocuments = () => {
    UserService.getCurrentUser1().then(
      (response) => {
        const baseUrl = 'http://localhost:5000';
        const selectedDocuments = (personal === "personal") ? '/documents/' : (personal === "shared") ? 
          '/shareddocuments/' : '/requesteddocuments/';
        const documentId = response.data.id;
        const myQueryParams = '?searchedDocument=' + searchedDocument;
        const finalUrl = baseUrl + selectedDocuments + documentId + myQueryParams;
        axios.get(finalUrl).then(res => {
          console.log(JSON.stringify(res.data));
          setDocuments(res.data.responseDocuments);
          })}).catch((error) => {
            // Error
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
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
    getAllUserExistingDocuments(), [personal]
  );

  const onRequestDocumentSearch = (e) => {
    getAllUserExistingDocuments();
  };

  let alternativeDownloadImage = () => {
    var albumBucketName = "documente-licenta";

    // **DO THIS**:
    //   Replace this block of code with the sample code located at:
    //   Cognito -- Manage Identity Pools -- [identity_pool_name] -- Sample Code -- JavaScript
    //
    // Initialize the Amazon Cognito credentials provider
    AWS.config.region = 'eu-central-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'IDENTITY_POOL_ID',
    });

    // Create a new service object
    var s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: albumBucketName}
    });
  };

  let getSignedUrlFunction = (event, fileLocationUrl) => {
    console.log(fileLocationUrl);
    window.open(fileLocationUrl, '_blank');
  };

  let downloadImage = () => {
    // window.open('https://documente-licenta.s3.eu-central-1.amazonaws.com/documents/Screenshot%202021-04-01%20at%2013.43.10.png', '_blank');
    window.open('https://documente-licenta.s3.eu-central-1.amazonaws.com/documents/sample_tomi.pdf', '_blank');
    // s3://documente-licenta/documents/sample_tomi.pdf

    // https://documente-licenta.s3.eu-central-1.amazonaws.com/documents/Screenshot%202021-04-01%20at%2013.43.10.png

    /*
    let url = "https://documente-licenta.s3.eu-central-1.amazonaws.com/userAvatar/mens-button-up-shirt-urban-fashion.jpeg";
    let urlArray = url.split("/")
    let bucket = "documente-licenta";
    let key = "userAvatar/mens-button-up-shirt-urban-fashion.jpeg"
    AWS.config.update({region: 'eu-central-1'});
    let params = {Bucket: bucket, Key: key}
    let s3 = new AWS.S3({ params: { Bucket: "documente-licenta"}, region: 'eu-central-1'});
    console.log(bucket);
    console.log(key);

    s3.getObject(params, (err, data) => {

      console.log("here baby");
      console.log(err);

      let blob=new Blob([data.Body], {type: data.ContentType});
      let link=document.createElement('a');
      link.href=window.URL.createObjectURL(blob);
      link.download=url;
      link.click();
    })
    */
  }

  const getFileExtensionImage = (extension) => {
    const stringEnd = (extension === 'app') ? '003-app.png' :
      (extension === 'css') ? '008-css.png' :
      (extension === 'csv') ? '009-csv.png' :
      (extension === 'xls') ? '047-xls.png' :
      (extension === 'doc') ? '012-doc.png' :
      (extension === 'docx') ? '013-docx.png' :
      (extension === 'exe') ? '017-exe.png' :
      (extension === 'jar') ? '023-jar.png' :
      (extension === 'jpeg') ? '024-jpeg.png' :
      (extension === 'iso') ? '022-iso.png' :
      (extension === 'jpg') ? '025-jpg.png' :
      (extension === 'pdf') ? '032-pdf.png' :
      (extension === 'otf') ? '034-otf.png' :
      (extension === 'ppt') ? '037-ppt.png' :
      (extension === 'rar') ? '040-rar.png' :
      (extension === 'xlsx') ? '048-xlsx.png' :
      (extension === 'zip') ? '050-zip.png' :
      '013-docx.png';

    return require('assets/img/fileExtentions/png/' + stringEnd);
  };

  return (
    <div>
    <React.Fragment>
      <CssBaseline />
        <Toolbar>
          <div style={{width: "100%"}}>
          <SearchBar
            style={{marginTop: "-20px"}}
            value={searchedDocument || ''}
            onChange={(e) => onChangeDocument(e)}
            onRequestSearch={onRequestDocumentSearch}
          />
          </div>
        </Toolbar>
      <main>
        {/* Hero unit */}
        {
          (personal === "personal" && documents.length === 0)  ? (
            <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography style={{marginTop: "-30px", marginBottom: "25px"}} component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Oops, It looks like you don't have any documents yet
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              {
                'Would you like to add some documents?' 
              }
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={1} justify="center">
                <Grid item>
                  <Button variant={(personal === "personal") ? "contained" : "outlined"} color="primary" 
                    onClick={handleRedirectToUploadPage}>
                    Upload file
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant={(personal === "personal") ? "outlined" : "contained"} color="primary" 
                    onClick={handleRedirectToRequestPage}>
                    Request file
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
          ) : (
            <div>
            <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography style={{marginTop: "-60px", marginBottom: "-5px"}} component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                My Documents
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                {
                  (personal === "personal") ? 'These are your personal Documents listed above' : 
                  (personal === "shared") ? 'These are the Documents people shared with you' : 
                    'These are the Documents that you requested from public institutions'
                }
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={1} justify="center">
                  <Grid item>
                    <Button variant={(personal === "personal") ? "contained" : "outlined"} color="primary" onClick={() => {
                      if (personal !== "personal") { 
                        setPersonal("personal"); 
                      }
                    }
                    }>
                      Personal Docs
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant={(personal === "personal") ? "outlined" : "contained"} color="primary" onClick={() => {
                      if (personal !== "shared") { 
                        setPersonal("shared"); 
                      }
                    }
                    }>
                      Shared with you
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant={(personal === "personal") ? "outlined" : "contained"} color="primary" onClick={() => {
                      if (personal !== "requested") { 
                        setPersonal("requested"); 
                      }
                    }
                    }>
                      Requested Docs
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>

            <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {
            documents.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    title="Image title"
                    image={getFileExtensionImage(card.extension)}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {`${card.heading}`}
                    </Typography>
                    <Typography>
                      {`${card.description}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Link color="inherit" href={"http://localhost:8081/admin/view/" + card._id}>
                    <Button size="small" color="primary" 
                      onClick={(event) => getSignedUrlFunction(event, card.locationUrl)}>
                      View
                    </Button>
                  </Link>
                  <Link color="inherit" href={"http://localhost:8081/admin/edit/" + card._id}>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        </div>
          )
        }

      </main>

    </React.Fragment>
    </div>
  );
}