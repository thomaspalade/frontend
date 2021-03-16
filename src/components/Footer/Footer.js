/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="http://localhost:8081/admin/dashboard" className={classes.block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="http://localhost:8081/admin/contact" className={classes.block}>
                Contact Us
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="http://localhost:8081/admin/aboutus" className={classes.block}>
                About us
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="http://localhost:8081/admin/faq" className={classes.block}>
                FAQ
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="http://localhost:8081/admin/feedback" className={classes.block}>
                FEEDBACK
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="http://localhost:8081/admin/login" className={classes.block}>
                LOGIN
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="http://localhost:8081/admin/register" className={classes.block}>
                REGISTER
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="http://localhost:8081/admin/dashboard"
              target="_blank"
              className={classes.a}
            >
              Thomas-Emanuel Palade
            </a>
            , made with hope of a decentralized internet
          </span>
        </p>
      </div>
    </footer>
  );
}
