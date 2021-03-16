import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Grid from '@material-ui/core/Grid';
import SecurityIcon from '@material-ui/icons/Security';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "15px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);
const useStyles1 = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: "fontWeightBold",
  },
}));

export default function FaqPage() {
  const classes = useStyles();
  const classes1 = useStyles1();
  const [category1, setCategory1] = useState(false);

  const onChangeCategory1 = (e) => {
    const category1 = e.target.value;
    setCategory1(category1);
  };

  return (
    <div>
      <div style={{textAlign: 'center'}}>
      <Typography variant="h2" style={{textAlign: 'center', marginBottom: '15px', marginTop: '-40px'}}>
          Frequently asked questions
      </Typography>
      <LiveHelpIcon style={{marginTop: -10, fontSize: 50}}/>
      </div>

    <Card>
    <CardHeader color="primary" onClick={() => setCategory1(!category1)}>
      <h3 className={classes.cardTitleWhite}>Intrebari din categoria 'Cat costa si care sunt benificiile contului basic'</h3>
      <p className={classes.cardCategoryWhite}>
        E foarte posibil ca raspunsul la nelamurirea ta sa se afle aici.
      </p>
    </CardHeader>

    <div className={classes1.root}> 
    { false && <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes1.heading}>
          Intrebari din categoria 'Siguranta datelor personale'
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{marginTop: "-50px"}}>
          {<Table
              tableHeaderColor="primary"
              tableHead={["Question", "Answer"]}
              tableData={[
                ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
              ]}
            />
            }
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes1.heading}>
          Intrebari din categoria 'Cat costa si care sunt benificiile contului basic'
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{marginTop: "-50px"}}>
          {<Table
              tableHeaderColor="primary"
              tableHead={["Question", "Answer"]}
              tableData={[
                ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
              ]}
            />
            }
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes1.heading}>
          Intrebari din categoria 'Administrarea contului personal'
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{marginTop: "-50px"}}>
          {<Table
              tableHeaderColor="primary"
              tableHead={["Question", "Answer"]}
              tableData={[
                ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
              ]}
            />
            }
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes1.heading}>
          Intrebari din categoria 'Cum iau legatura cu clientii mei'
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{marginTop: "-50px"}}>
          {<Table
              tableHeaderColor="primary"
              tableHead={["Question", "Answer"]}
              tableData={[
                ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
              ]}
            />
            }
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes1.heading}>
          Intrebari din categoria 'Cat costa si care sunt benificiile contului premium'
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{marginTop: "-50px"}}>
          {<Table
              tableHeaderColor="primary"
              tableHead={["Question", "Answer"]}
              tableData={[
                ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
              ]}
            />
            }
        </AccordionDetails>
      </Accordion>
      </div>
    }
    <br></br>
    <br></br>
    
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}> 
        
        <Card profile>
            <CardBody profile>
          <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={1}>
                <SecurityIcon style={{fontSize: 35}}/>
              </Grid>
              <Grid item xs={11}>
                <div >
                <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes1.heading}>
                      Intrebari din categoria 'Siguranta datelor personale'
                      </Typography>

                    </AccordionSummary>
                    <AccordionDetails style={{marginTop: "-50px"}}>
                      {<Table
                          tableHeaderColor="primary"
                          tableHead={["Question", "Answer"]}
                          tableData={[
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                          ]}
                        />
                        }
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Grid>
            </Grid>
            
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={1}>
                <HomeIcon style={{fontSize: 35}}/>
              </Grid>
              <Grid item xs={11}>
                <div >
                <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes1.heading}>
                      Intrebari din categoria 'Cat costa si care sunt benificiile contului basic'
                      </Typography>

                    </AccordionSummary>
                    <AccordionDetails style={{marginTop: "-50px"}}>
                      {<Table
                          tableHeaderColor="primary"
                          tableHead={["Question", "Answer"]}
                          tableData={[
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                          ]}
                        />
                        }
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={1}>
                <VerifiedUserIcon style={{fontSize: 35}}/>
              </Grid>
              <Grid item xs={11}>
                <div >
                <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes1.heading}>
                      Intrebari din categoria 'Administrarea contului personal'
                      </Typography>

                    </AccordionSummary>
                    <AccordionDetails style={{marginTop: "-50px"}}>
                      {<Table
                          tableHeaderColor="primary"
                          tableHead={["Question", "Answer"]}
                          tableData={[
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                          ]}
                        />
                        }
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={1}>
                <AccountCircleIcon style={{fontSize: 35}}/>
              </Grid>
              <Grid item xs={11}>
                <div >
                <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes1.heading}>
                      Intrebari din categoria 'Cum iau legatura cu clientii mei'
                      </Typography>

                    </AccordionSummary>
                    <AccordionDetails style={{marginTop: "-50px"}}>
                      {<Table
                          tableHeaderColor="primary"
                          tableHead={["Question", "Answer"]}
                          tableData={[
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                          ]}
                        />
                        }
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={1}>
                <AttachFileIcon style={{fontSize: 35}}/>
              </Grid>
              <Grid item xs={11}>
                <div >
                <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes1.heading}>
                      Intrebari din categoria 'Administrarea contului personal'
                      </Typography>

                    </AccordionSummary>
                    <AccordionDetails style={{marginTop: "-50px"}}>
                      {<Table
                          tableHeaderColor="primary"
                          tableHead={["Question", "Answer"]}
                          tableData={[
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                          ]}
                        />
                        }
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={1}>
                <SupervisorAccountIcon style={{fontSize: 35}}/>
              </Grid>
              <Grid item xs={11}>
                <div >
                <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes1.heading}>
                      Intrebari din categoria 'Cat costa si care sunt benificiile contului basic'
                      </Typography>

                    </AccordionSummary>
                    <AccordionDetails style={{marginTop: "-50px"}}>
                      {<Table
                          tableHeaderColor="primary"
                          tableHead={["Question", "Answer"]}
                          tableData={[
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                            ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                            ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                          ]}
                        />
                        }
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
        </CardBody>
          </Card>
        
        </GridItem>

        </GridContainer>
    
    </div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>

    </Card>
    </div>
  );
}
