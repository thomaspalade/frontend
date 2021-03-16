import React, { useState, useEffect } from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import { useHistory } from "react-router-dom";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function CustomInput(props) {
  const classes = useStyles();
  const [inputText, setInputText] = useState("");
  let history = useHistory();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  });
  const onInputChange = (e) => {
    const inputText = e.target.value;
    setInputText(inputText);
  };
  const getRedirectLink = () => {
    const loweredString = inputText.toLowerCase();
    if (loweredString === "profile" || loweredString === "user" || loweredString === "profil" 
      || loweredString === "change profile" || loweredString === "info" || loweredString === "address") {
      return "user"; // profile
    } else if (loweredString === "dashboard" || loweredString === "home" || loweredString === "acasa" || 
        loweredString === "change to home" || loweredString === "all" || loweredString === "admin") {
      return "dashboard"; // dashboard - home 
    } else if (loweredString === "album" || loweredString === "my" || loweredString === "docs" 
      || loweredString === "documente" || loweredString === "docz" || loweredString === "files") {
      return "album"; // album - my docs - documente
    } else if (loweredString === "upload" || loweredString === "document" || loweredString === "file" || 
        loweredString === "add file" || loweredString === "upload file" || loweredString === "how to upload") {
      return "upload"; // upload document
    } else if (loweredString === "request" || loweredString === "require" || loweredString === "request " || 
        loweredString === "request document" || loweredString === "ask" || loweredString === "vreau doc") {
      return "request"; // request document from public insitution
    } else if (loweredString === "pending" || loweredString === "asteptare" || loweredString === "not yet" || 
        loweredString === "handle pending" || loweredString === "accept docs" || loweredString === "pending docs") {
      return "pending"; // get pending documents
    } else if (loweredString === "rejected" || loweredString === "rejected " || loweredString === "reejcted" || 
        loweredString === "rejected docs" || loweredString === "removed docs" || loweredString === "respinse") {
      return "rejected"; // see check rejected documents
    } else if (loweredString === "public" || loweredString === "codes" || loweredString === "public " || 
        loweredString === "get public codes" || loweredString === "coduri" || loweredString === "publice") {
      return "codes"; // public codes
    } else if (loweredString === "contact" || loweredString === "contact " || loweredString === "despre " || 
        loweredString === "email" || loweredString === "cine sunt" || loweredString === "get in touch") {
      return "contact"; // contact
    } else if (loweredString === "abouts" || loweredString === "about us" || loweredString === "about us " || 
        loweredString === "about" || loweredString === "us" || loweredString === "despre noi") {
      return "aboutus"; // about us
    } else if (loweredString === "faq" || loweredString === "frequently" || loweredString === "asked" || 
        loweredString === "questions" || loweredString === "intrebari" || loweredString === "dese") {
      return "faq"; // faq
    } else if (loweredString === "login" || loweredString === "log in" || loweredString === "logare" || 
        loweredString === "intra in cont" || loweredString === "logging" || loweredString === "enter account") {
      return "login"; // login
    } else if (loweredString === "register" || loweredString === "create" || loweredString === "account" || 
        loweredString === "registr" || loweredString === "register " || loweredString === "join") {
      return "register"; // register
    } 
    return "dashboard";
  }
  const handleKeyDown = (event) => {
    console.log("here 1");
    if (event.key === 'Enter') {
      console.log('do validate')
      const newLink = getRedirectLink();
      console.log(newLink);
      history.push("/admin/" + newLink);
      setInputText("");
    }
    console.log("here 2");
  };

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses
        }}
        value={inputText || ''}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        id={id}
        {...inputProps}
      />
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};
