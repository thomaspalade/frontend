import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import FilterListIcon from '@material-ui/icons/FilterList';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from 'axios';
import UserService from "../../services/user.service";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.js";
import { useHistory } from "react-router-dom";

const styles1 = {
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

const useStylesHeader = makeStyles(styles1);

function createData(name, calories, fat, carbs, protein) {
  return { name: name, posterEmail: calories, heading: fat, description: carbs, extension: protein };
}

/*
let rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];*/

let rows = [];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'posterEmail', numeric: true, disablePadding: false, label: 'Poster Email' },
  { id: 'heading', numeric: true, disablePadding: false, label: 'Heading' },
  { id: 'description', numeric: true, disablePadding: false, label: 'Description' },
  { id: 'extension', numeric: true, disablePadding: false, label: 'File Extension' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, selected, pendingDocumentsData, userId } = props;
  const [succesAlert, setSuccesAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false); 
  let history = useHistory();

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

  const handleDelete = () => {
    console.log(numSelected, selected, pendingDocumentsData);

    // lets keep only the documents that remain
    const updatedDocumentsIds = [];
    for (let j = 0; j < pendingDocumentsData.length; j++) {
      let found = 0;
      for (let i = 0; i < numSelected && found === 0; i++) {
        if (selected[i] == pendingDocumentsData[j].heading) {
          found = 1;
        }
      }
      if (found === 0) {
        updatedDocumentsIds.push(pendingDocumentsData[j]._id);
      }
    }

    // axios post call
    axios.post("http://localhost:5000/profiles/updateRejectedDocumentsForUserProfile/" + userId, {
      pendingDocumentsIds: updatedDocumentsIds
    }).then(res => {
      console.log(JSON.stringify(res.data));
      showNotification("succesAlert");
      setTimeout(function() { history.push("/admin/" + "dashboard");}, 2000);
      // window.location.reload(false); 
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

  const handleAccept = () => {
    console.log(numSelected, selected, pendingDocumentsData);

    // lets keep only the documents that remain
    const updatedDocumentsIds = [];
    const approvedPendingDocumentsIds = [];
    for (let j = 0; j < pendingDocumentsData.length; j++) {
      let found = 0;
      for (let i = 0; i < numSelected && found === 0; i++) {
        if (selected[i] == pendingDocumentsData[j].heading) {
          found = 1;
        }
      }
      if (found === 0) {
        updatedDocumentsIds.push(pendingDocumentsData[j]._id);
      } else {
        approvedPendingDocumentsIds.push(pendingDocumentsData[j]._id);
      }
    }

    // axios post call
    axios.post("http://localhost:5000/profiles/updateRejectedDocumentsForUserProfile/" + userId, {
      pendingDocumentsIds: updatedDocumentsIds,
      accept: true,
      approvedPendingDocumentsIds: approvedPendingDocumentsIds
    }).then(res => {
      console.log(JSON.stringify(res.data));
      showNotification("succesAlert");
      setTimeout(function() { history.push("/admin/" + "dashboard");}, 2000);
      // window.location.reload(false); 
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

  return (
    <div>
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <br></br>
      <br></br>
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Use the table below to accept the ones from this list that you want to see in your documents
        </Typography>
      )}

      {numSelected > 0 ? (
        <div>
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={(event) => handleDelete()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Approve">
        <IconButton aria-label="approve" onClick={(event) => handleAccept()}>
          <DoneIcon />
        </IconButton>
      </Tooltip>
      </div>
      ) : null
      }
    </Toolbar>
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

};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.arrayOf(PropTypes.object).isRequired,
  pendingDocumentsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.string.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [pendingsDocuments, setPendingDocuments] = React.useState([]);
  const [pendingDocumentsData, setPendingDocumentsData] = React.useState([]);
  const [pendingDocumentsIds, setPendingDocumentsIds] = React.useState([]);
  const [userId, setUserId] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const classes2 = useStylesHeader();
  const [succesAlert, setSuccesAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

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

  const getAllUserExistingFeedbacks = () => {
    UserService.getCurrentUser1().then(
      (response) => {
        axios.get("http://localhost:5000/profile/" + response.data.id).then(res => {
          console.log(JSON.stringify(res.data));
          setPendingDocuments(res.data.pendingDocumentsIds);

          setUserId(response.data.id);
          // s-a intors un raspuns bun
          console.log(JSON.stringify(res.data.pendingDocumentsIds));
          if (res.data.pendingDocumentsIds !== []) {
            axios.post("http://localhost:5000/documents/getDocumentsByIds", {
            pendingDocumentsIds: res.data.pendingDocumentsIds
          }).then(res => {
            console.log(JSON.stringify(res.data));
            console.log("here tomi 2");
            console.log(JSON.stringify(res.data.pendingDocuments))
            setPendingDocumentsData(res.data.pendingDocuments);
            console.log(res.data.pendingDocuments.length);
            if (res.data.pendingDocuments.length < 5) {
              setRowsPerPage(res.data.pendingDocuments.length);
            }
            rows = res.data.pendingDocuments.map((e, index) => [createData(index, e.heading, e.uploaderEmail, e.description, e.extension)]);
            const newdata = res.data.pendingDocuments.map((e, index) => [index, e.heading, e.description, e.extension]);
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = pendingDocumentsData.map((n) => n.heading);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    console.log(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
    
    
    <div>
    
    <div style={{textAlign: 'center'}}>
      <Typography variant="h2" style={{textAlign: 'center', marginBottom: '15px', marginTop: '-40px'}}>
          Pending Documents
      </Typography>
      <CommentIcon style={{marginTop: -10, fontSize: 50}}/>
    </div>
      
    <Card>
    <CardHeader color="primary">
      <h3 className={classes2.cardTitleWhite}>Here are your pending documents</h3>
      <p className={classes2.cardCategoryWhite}>
        Check this to be sure you accept the desired documents
      </p>
    </CardHeader>
    <CardBody>

    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} 
          selected={selected} pendingDocumentsData={pendingDocumentsData} userId={userId}/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            {pendingDocumentsData && <TableBody>
              {stableSort(pendingDocumentsData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.heading);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.heading)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.heading}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {pendingDocumentsData.indexOf(row)}
                      </TableCell>
                      <TableCell align="right">{row.uploaderEmail}</TableCell>
                      <TableCell align="right">{row.heading}</TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">{row.extension}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
    


    </CardBody>
    </Card>

    </div>
    
    </div>

  );
}
