import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { useHistory } from "react-router-dom";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

import AuthService from "../../services/auth.service";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks(props) {
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  let history = useHistory();
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const handleRedirectProfile = () => {
    setOpenProfile(null);
    history.push("/admin/" + "user");
  };
  const handleRedirectMyDocuments = () => {
    setOpenProfile(null);
    history.push("/admin/" + "album");
  };
  const handleRedirectPublicCode = () => {
    setOpenProfile(null);
    history.push("/admin/" + "publiccodes");
  };
  const handleRedirectFeedback = () => {
    setOpenProfile(null);
    history.push("/admin/" + "feedback");
  };
  const handleRedirectLogin = () => {
    setOpenProfile(null);
    history.push("/admin/" + "login");
  };
  const handleLogout = () => {
    setOpenProfile(null);
    AuthService.logout();
    
    // props.history.push("/");
    window.location.reload(false);
  };

  const handleSearch = () => {
    console.log("here");
  }

  return (
    <div>
      <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        />
        <Button color="white" aria-label="edit" justIcon round onClick={handleSearch}>
          <Search />
        </Button>
      </div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleRedirectProfile}
                      className={classes.dropdownItem}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={handleRedirectMyDocuments}
                      className={classes.dropdownItem}
                    >
                      My Documents
                    </MenuItem>
                    <MenuItem
                      onClick={handleRedirectPublicCode}
                      className={classes.dropdownItem}
                    >
                      My Public Code
                    </MenuItem>
                    <MenuItem
                      onClick={handleRedirectLogin}
                      className={classes.dropdownItem}
                    >
                      Login
                    </MenuItem>
                    <MenuItem
                      onClick={handleRedirectFeedback}
                      className={classes.dropdownItem}
                    >
                      Give Feedback
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={handleLogout}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
