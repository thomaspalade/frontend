import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Typography from '@material-ui/core/Typography';

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

export default function FaqPage() {
  const classes = useStyles();
  return (
    <div>
      <div style={{textAlign: 'center'}}>
      <Typography variant="h2" style={{textAlign: 'center', marginBottom: '15px', marginTop: '-15px'}}>
          Frequently asked questions
      </Typography>
      </div>

    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h3 className={classes.cardTitleWhite}>Intrebari din categoria 'Administrarea contului personal'</h3>
            <p className={classes.cardCategoryWhite}>
              E foarte posibil ca raspunsul la nelamurirea ta sa se afle aici.
            </p>
          </CardHeader>
          <CardBody>
            {true && <Table
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
          </CardBody>
        </Card>
      </GridItem>
      
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h3 className={classes.cardTitleWhite}>Intrebari din categoria 'Siguranta datelor personale'</h3>
            <p className={classes.cardCategoryWhite}>
            E foarte posibil ca raspunsul la nelamurirea ta sa se afle aici.
            </p>
          </CardHeader>
          <CardBody>
          {true && <Table
              tableHeaderColor="primary"
              tableHead={["Question", "Answer"]}
              tableData={[
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
                ["Te-ai gandit vreodata sa dansezi singur in ploaie?", "N-as putea dansa intr-o camera cu oameni."],
                ["De cati ani activezi ca programator?", "Nu activez. Eu fac visuri sa se intample."],
              ]}
            />
          }
          </CardBody>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h3 className={classes.cardTitleWhite}>Intrebari din categoria 'De ce dansezi singur'</h3>
            <p className={classes.cardCategoryWhite}>
            E foarte posibil ca raspunsul la nelamurirea ta sa se afle aici.
            </p>
          </CardHeader>
          <CardBody>
          {true && <Table
              tableHeaderColor="primary"
              tableHead={["Question", "Answer"]}
              tableData={[
                ["Cum imi creez cont?", "In sidebar, exista optiunea 'Register'. Mergi acolo si introdu-ti datele cu incredere."],
                ["Cum ma loghez intr-un cont existent?", "In sidebar, exista optiunea 'Login'. Mergi acolo si introdu-ti datele cu incredere."],
                ["Cum imi recuperez datele contului daca am uitat parola", "In sidebar, exista optiunea 'Login'. Mergi acolo si apasa butonul 'Forgot password'. Vei primi un mail."],
              ]}
            />
            }
          </CardBody>
        </Card>
      </GridItem>

    </GridContainer>
    </div>
  );
}
