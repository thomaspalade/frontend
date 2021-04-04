import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import React, { useState, useEffect } from "react";
// @material-ui/icons
import Edit from "@material-ui/icons/Check";

import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

export default function Tasks(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([...props.checkedIndexes]);
  const { tasksIndexes, tasks, data, collectionName } = props;
  const tableCellClasses = classnames(classes.tableCell);
  const tableCellClasses2 = classnames(classes.tableCell2);
  const handleToggle = value => {
  };

  const handleRemove = value => {
    console.log("handle remove");
    // tasks.splice(0, 2);
    const currentIndex = value;
    console.log("value = " + value);
    console.log("currentIndex=" + currentIndex);
    console.log(tasks, tasksIndexes, data);
    tasks.splice(currentIndex, 1);
    tasksIndexes.splice(currentIndex, 1);
    data.splice(currentIndex, 1);
    console.log(tasks, tasksIndexes, data);
  };

  return (
    <Table className={classes.table}>
      <TableBody>
      <TableRow key={"tomi"} className={classes.headerRow}>
      <TableCell className={tableCellClasses2}>{"Title"}</TableCell>
      <TableCell className={tableCellClasses2}>{"Type"}</TableCell>
      <TableCell className={tableCellClasses2}>{"Uploader Mail"}</TableCell>
      </TableRow>
        {tasksIndexes.length > 0 ? tasksIndexes.map(value => (
          <TableRow key={value} className={classes.tableRow}>
            <TableCell className={tableCellClasses}>{tasks[value]}</TableCell>
            <TableCell className={tableCellClasses}>{data[value].extension}</TableCell>
            <TableCell className={tableCellClasses}>{data[value].uploaderEmail}</TableCell>
            <TableCell className={classes.tableActions}> 
            </TableCell>
          </TableRow>
        )) : [{extension: "ext", uploaderEmail: "email"}].map(value => (
          <TableRow key={value} className={classes.tableRow}>
            <TableCell className={tableCellClasses}>{"Seems like you have none here. Click here to arrange this."}</TableCell>
            <TableCell className={classes.tableActions}> 
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

Tasks.propTypes = {
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node),
  checkedIndexes: PropTypes.array,
  data: PropTypes.object,
  collectionName: PropTypes.string
};
