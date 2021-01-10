import React from 'react';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import ContentEditable from "react-contenteditable";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        marginLeft: 15,
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: 0,
        marginTop: 0,
        margin: 0,
      },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    avatar: {
      backgroundColor: '#E1173F'
    },
    chip: {
        margin: 12,
      }
  });
    
const loggedIn = 1;

class PostJoke extends React.Component {

    state = {
        jokeId: 0,
        jokeText: 'Insert your text here...',
        jokePoster: 'Tomi',
        jokeTags: [],
        jokePosterId: 1,
        jokePostedAt: 0,
        jokeUserId: 1,
        searchedJoke: '',
        editable: false,
        html: 'Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes. Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil. Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels that don’t open. Set aside off of the heat to let rest for 10 minutes, and then serve.',
        chipData: [],
        setchipData: [],
        newTag: '',
        visibleSuccesMessage: false,
        visibleErrorMessage: false
    };

    componentDidMount = () => { 
        let id = this.props.match.params.joke_id;

        console.log(id);

        let chipData = [
            { key: 0, label: 'tomi' },
            { key: 1, label: 'o' },
            { key: 2, label: 'pupa' },
            { key: 3, label: 'pe' },
            { key: 4, label: 'cori' }
          ];
        
        chipData = [];

          this.setState ({
            ...this.state,
            jokePoster: 'Altcineva',
            jokeTags: [],
            jokePosterId: 1,
            jokePostedAt: 0,
            jokeId: id,
            editable: loggedIn,
            chipData: chipData,
        })
        

        // fetch la date din backend

        /// setez si userId
    }

    componentDidUpdate = () => {    
        
    }

    handleChangeText = () => {
        console.log("here");

        if (this.state.jokePosterId == this.state.jokeUserId) {
            this.setState({
                ...this.state,
                jokeText: ''
            });
        }
        else {
            // do nothing
        }
    }

    handleChange = (prop) => (event) => {
        this.setState({ 
            ...this.state, 
            [prop]: event.target.value 
        });
      };
    
    searchJokes = () => {
        console.log('im searchin for a new joke tati');
        /// fac un filter prin toate glumele si le re-render-uiesc in main page doar pe alea care contin cuvantul cautat
    }

    handleChangeJokeText = evt => {
        this.setState({ jokeText: evt.target.value });
      };
    
      toggleEditable = () => {
        this.setState({ editable: !this.state.editable });
      };

      handleSubmit = () => {
        console.log(this.state);

        axios.post("http://localhost:8090/postJoke",{
            title : this.props.userToken.userName,
            content : this.state.jokeText,
            posterId : this.state.jokePoster,
            tags: this.state.chipData.map((tag) => {
                return tag.label;
            }),
            createdAt: new Date()
        },
        {headers :{
            Authorization : this.props.userToken.userToken
        }})
        .then(res => {
            console.log(res);
            console.log(res.data);
            setTimeout(() => {
                this.setState({ visibleSuccesMessage: !this.state.visibleSuccesMessage });
            }, 0);
            setTimeout(() => {
                this.setState({ visibleSuccesMessage: !this.state.visibleSuccesMessage });
            }, 1900);
            setTimeout(() => {
                this.props.history.push('/');
            }, 2100);
        }
    );
      }

      handleDelete = (chipToDelete) => () => {
        
        console.log('here');
        
        let {
            chipData
        } = this.state;

        chipData = chipData.filter((chip) => chip.key !== chipToDelete.key);

        this.setState({
            ...this.state,
            chipData
        });
      };

      handleNewTag = () => {
        let {
            chipData,
            newTag
        } = this.state;

        let newKey = 0;
        let alreadyThere = 0;
        chipData.map((chip) => {
            if (chip.key > newKey) {
                newKey = chip.key;
            }
            if (chip.label === newTag) {
                alreadyThere = 1;
            }
        });

        const newChip = {
            key: newKey + 1,
            label: newTag
        };

        if (alreadyThere === 0) {  
            this.setState({
                ...this.state,
                newTag: '',
                chipData: [...chipData, newChip]
            });
        }
        else {
            this.setState({
                ...this.state,
                newTag: ''
            });
        }
      }


    render () {
       const {
              loggedIn
            } = this.props.userToken;

            console.log(this.props.userToken);
        const {
            jokeId,
            jokePoster,
            searchedJoke,
            chipData,
            newTag,
            visibleSuccesMessage,
            visibleErrorMessage
        } = this.state;

        const {
            classes
         } = this.props;

        return (
            <div className>
                <br></br>
                <br></br>

                {
                    /// alert message
                    (!visibleSuccesMessage) ?
                    <div>
                    </div>
                    :
                        <div style={{marginTop: 50,
                                    marginBottom: -30
                            }}>   
                            <Alert variant="filled" severity="success">
                                The joke has been posted successfully! You're being redirected to the main page.
                            </Alert>
                        </div>
                }

                {
                    /// alert message
                    (!visibleErrorMessage) ?
                    <div>
                    </div>
                    :
                        <div style={{marginTop: 50,
                                    marginBottom: -30
                            }}>   
                            <Alert variant="filled" severity="warning">
                                An error has occurred. We're very sorry, please try again to post the joke. 
                            </Alert>
                        </div>
                }


        <br></br>
    
      <Card style={{
          marginTop: 80
      }}>

        <div>
        <Typography variant="h2" style={{textAlign: 'center'}}>
            POST JOKE
        </Typography>
        </div>


      <Link to={ `/profile/${jokePoster}` }
                             className="removeUnderline"
        >
        <CardHeader
            style={{
                marginTop: -40,
                marginBottom: 40
            }}
            avatar={    
            <Avatar aria-label="recipe" style={{backgroundColor: '#E1173F'}}>
                {`${
                    (this.props.userToken.userName) ?
                    this.props.userToken.userName.charAt(0)
                    :
                    ''
                   }
                `}
            </Avatar>
            }
            title={`${this.props.userToken.userName}`}
        />
        </Link>

        <CardContent>
            <p className="Blend"
                onClick={this.handleChangeText}> 
            </p>
        </CardContent>

        <div>  
        <ContentEditable
          className="editable"
          tagName="pre"
          placeholder="This is there place where you can insert text"
          html={this.state.jokeText}
          disabled={!this.state.editable} // use true to disable edition
          onChange={this.handleChangeJokeText} // handle innerHTML change
          onBlur={this.sanitize}
        />

        </div>

            <CardContent>
            </CardContent>

            <TextField
                id="newTag"
                label="Add tag here"
                value={newTag}
                style={{
                    marginLeft: 30,
                    marginTop: -30,
                }}
                onChange={this.handleChange("newTag")}
                onBlur={this.handleNewTag}
                onSubmit={this.handleNewTag}
            />

            {<div component="ul" className={classes.root}>
            {
            
                chipData.map((data) => {
                let icon;

                if (data.label === 'React') {
                icon = <TagFacesIcon />;
                }

                return (
                <li key={data.key}>
                    <Chip
                    icon={icon}
                    label={'#' + data.label}
                    onDelete={data.label === 'React' ? undefined : this.handleDelete(data)}
                    className={classes.chip}
                    />
                </li>
                );
            })
            }
            </div>
            }


        {
        (!loggedIn) ?
        <div>
        </div>
        :
        <div>
        <div style={{ display: "flex" }}>

        <Button variant="contained"  
                style={{ marginLeft: 'auto',
                         marginRight: 100,
                         marginTop: 50,
                         backgroundColor: '#E1173F'}} 
                className={classes.marginTop}
                endIcon={<Icon style={{color: 'white'}}>send</Icon>}
                onClick={this.handleSubmit}>
            <div></div>
            <Typography variant="h6" style={{textAlign: 'right', color: 'white'}}>
                POST JOKE
            </Typography>
        </Button>
        </div>
        </div>
        }

            <CardContent>
            </CardContent>
      </Card>


            <div style={{textAlign: 'center'}}>
                <h1> </h1>
            </div>
            
            {
            /*
            (!visible) ?
            <div>
            </div>
            :
                <div>   
                    <Alert variant="filled" severity="error">
                    This is a success alert — check it out!
                    </Alert>
                </div>
            */
            }
            </div>
          );
        }
 }

 PostJoke.propTypes = {
    classes: PropTypes.object.isRequired,
 };


    const mapStateToProps = (state) => {
     return state;
   }

   const mapDispatchToProps = (dispatch) => {
     return {
       login_logout: () => { dispatch({ type: 'REMOVE_TOKEN' }) },
       set_token: (newToken, previousState) => { dispatch({ type: 'SET_TOKEN', token: newToken, previousState: previousState}) },
     }
   }


 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostJoke)))
