import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Typography from '@material-ui/core/Typography';

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

export default function TypographyPage() {
  const classes = useStyles();
  return (
    <div>
      <div style={{textAlign: 'center'}}>
      <Typography variant="h2" style={{textAlign: 'center', marginBottom: '15px', marginTop: '-15px'}}>
          You can find us on
      </Typography>
      </div>

    <Card>
      <CardHeader color="primary">
      <h3 className={classes.cardTitleWhite}>Choose on of the following to contact us</h3>
        <p className={classes.cardCategoryWhite}>
          If you want to tell us more about a problem, use the feedback option.
        </p>
      </CardHeader>
      <CardBody>
        <div className={classes.typo}>
          <div className={classes.note}>Phone</div>
          <h5 style={{marginLeft: 10}}>0760987383</h5>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Email</div>
          <h5 style={{marginLeft: 10}}>thomas.e.palade@gmail.com</h5>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Address</div>
          <h5 style={{marginLeft: 10}}>Bucuresti, Sectorul 5, Strada Plutonier Rascanu nr. 2, ap. 42, scara 2. etaj 5</h5>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Facebook</div>
          <h5 style={{marginLeft: 10}}>https://www.facebook.com/palade.thomas</h5>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Twitter</div>
          <h5 style={{marginLeft: 10}}>https://twitter.com/paladethomas</h5>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Instagram</div>
          <h5 style={{marginLeft: 10}}>https://www.instagram.com/paladethomas/</h5>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Last field</div>
          <h5 style={{marginLeft: 10}}>Daca doresti sa ne lasi un mesaj, intra pe pagina de FEEDBACK</h5>
        </div>
      </CardBody>
    </Card>
    </div>
  );
}
