/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import PdfViewer from "views/PdfViewer/PdfViewer.js";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { Document } from 'react-pdf'

import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";

const useStyles = makeStyles(styles);

const message = `Truncation should be conditionally applicable on this long line of text
as this is a much longer line than what the container can support. `;

const useStylesPaperPdf = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
    marginTop: "-30px"
  },
  paper: {
    maxWidth: 1100,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

export default function Icons() {
  const classes = useStylesPaperPdf();
  return (
    <div className={classes.root}>
      {
        <object width="100%" height="1000" data="https://documente-licenta.s3.eu-central-1.amazonaws.com/documents/sample_tomi.pdf" type="application/pdf">   </object>
        // <object width="100%" height="1000" data="http://www.africau.edu/images/default/sample.pdf" type="application/pdf">   </object>
      }
    </div>
  );
}
