import React, { useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import ErrorIcon from '@material-ui/icons/Error';
import DescriptionIcon from '@material-ui/icons/Description';
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import axios from 'axios';
import { bugs, website, server } from "variables/general.js";
import { useHistory } from "react-router-dom";

import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [username, setUsername] = useState("");
  const [pendingDocuments, setPendingDocuments] = useState([]);
  const [rejectedDocuments, setRejectedDocuments] = useState([]);
  const [requestedDocuments, setRequestedDocuments] = useState([]);
  const [requestedDocumentsData, setRequestedDocumentsData] = useState([]);
  const [pendingDocumentsData, setPendingDocumentsData] = useState([]);
  const [rejectedDocumentsData, setRejectedDocumentsData] = useState([]);
  const [succesAlert, setSuccesAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  let history = useHistory();

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    props.history.push("/");
    window.location.reload(false);
    setUsername("mihaita");
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

  const handleClickOnPending = (e) => {
    history.push("/admin/" + "pending");
  };

  const handleClickOnRejected = (e) => {
    history.push("/admin/" + "rejected");
  };

  const handleClickOnRequested = (e) => {
    history.push("/admin/" + "album");
  };

  const handleSendMessage = (e) => {
    axios.post("http://localhost:5000/messages/", {
      text: "mihaita"
    }).then(res => {
      showNotification("succesAlert");
      console.log(JSON.stringify(res.data));
      // setText(res.data.text);
      window.location.reload(false);
      // s-a intors un raspuns bun
      }).catch((error) => {
        showNotification("errorAlert");
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

  const getAllUserExistingFeedbacks = () => {
    UserService.getCurrentUser1().then(
      (response) => {
        axios.get("http://localhost:5000/profile/" + response.data.id).then(res => {
          console.log(JSON.stringify(res.data));
          // setFeedbacks(res.data);
          setPendingDocuments(res.data.pendingDocumentsIds);
          setRejectedDocuments(res.data.rejectedDocumentsIds);
          setRequestedDocuments(res.data.requestedDocumentsIds);
          console.log(JSON.stringify(pendingDocuments), JSON.stringify(rejectedDocuments), JSON.stringify(requestedDocuments));

          if (res.data.requestedDocumentsIds !== [] || res.data.rejectedDocumentsIds || res.data.pendingDocumentsIds) {

            // add here support for pending and rejected documents tooo !!!

            console.log("here tomi")
            axios.post("http://localhost:5000/documents/getDocumentsByIds", {
            requestedDocumentsIds: res.data.requestedDocumentsIds,
            rejectedDocumentsIds: res.data.rejectedDocumentsIds,
            pendingDocumentsIds: res.data.pendingDocumentsIds,
          }).then(res => {
            console.log(JSON.stringify(res.data));
            console.log("here tomi 2");
            setRequestedDocumentsData(res.data.requestedDocuments);
            setPendingDocumentsData(res.data.pendingDocuments);
            setRejectedDocumentsData(res.data.rejectedDocuments);
            const newdata = res.data.requestedDocuments.map((e, index) => [index, e.heading, e.description, e.extension]);
            console.log(JSON.stringify(newdata));
            // window.location.reload(false); 
            // s-a intors un raspuns bun
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
          }

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
  

  const handleAuthAction = () => {
    UserService.getCurrentUser1().then(
      (response) => {
        console.log(response);
        axios.get("http://localhost:5000/profiles").then(res => {
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
    //<h1> Sunt logat cu urmatoarele date: {`${currentUser && currentUser.lastName}`}</h1>
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <DescriptionIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Request A Document</p>
              <a href={"http://localhost:8081/admin/request"}>
              <h3 className={classes.cardTitle}>
                Request here
              </h3>
              </a>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <DescriptionIcon />
                </Danger>
                <a href={"http://localhost:8081/admin/request"}>
                  Click here
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
              <FormatListNumberedIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Public codes</p>
              <a href={"http://localhost:8081/admin/publiccodes"}>
              <h3 className={classes.cardTitle}>Get codes here</h3>
              </a>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                <a href={"http://localhost:8081/admin/publiccodes"}>
                  Click here
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Check your docs</p>
              <a href={"http://localhost:8081/admin/album"}>
              <h3 className={classes.cardTitle}>All documents</h3>
              </a>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                <a href={"http://localhost:8081/admin/album"}>
                  Click here
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>View Profile</p>
              <a href={"http://localhost:8081/admin/user"}>
              <h3 className={classes.cardTitle}>Check profile</h3>
              </a>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                <a href={"http://localhost:8081/admin/user"}>
                  Click here
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <div onClick={handleClickOnPending}>
          <CustomTabs
            title="Category"
            headerColor="primary"
            onClick={handleClickOnPending}
            tabs={[
              {
                tabName: "Pending",
                tabIcon: DescriptionIcon,
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={pendingDocumentsData.map(e => pendingDocumentsData.indexOf(e))}
                    tasks={pendingDocumentsData.map(e => e.heading)}
                    data={pendingDocumentsData}
                    collectionName="pendingDocuments"
                    onClick={handleClickOnPending}
                  />
                )
              }
            ]}
          />
          </div>

          <div onClick={handleClickOnRejected}>
          <CustomTabs
            title="Category"
            headerColor="primary"
            onClick={handleClickOnRejected}
            tabs={[
              {
                tabName: "Rejected",
                tabIcon: ErrorIcon,
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={rejectedDocumentsData.map(e => rejectedDocumentsData.indexOf(e))}
                    tasks={rejectedDocumentsData.map(e => e.heading)}
                    data={rejectedDocumentsData}
                    collectionName="rejectedDocuments"
                  />
                )
              }
            ]}
          />
          </div>
        
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card onClick={handleClickOnRequested}>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Your Latest Requested Documents</h4>
              <p className={classes.cardCategoryWhite}>
                You have requested the following documents
              </p>
            </CardHeader>
            <CardBody>
              {
                requestedDocumentsData.length ?
                  <Table
                    tableHeaderColor="warning"
                    tableHead={["ID", "Heading", "Description", "Extension"]}
                    tableData={
                      // [[0,"Thomas","Danutu","csv"]]
                      requestedDocumentsData.map((e, index) => [index, e.heading, e.description, e.extension]) || []
                    }
                  /> 
              :
                <div style={{ 
                  padding: "8px",
                  verticalAlign: "middle",
                  border: "none",
                  lineHeight: "1.42857143",
                  fontSize: "15px"
              }}> Seems like you haven't requested any document yet. Click here to arrange this.</div> 
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
