import React from 'react';
import SearchBar from 'material-ui-search-bar'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { Link } from 'react-router-dom';
import axios from 'views/SignUp/node_modules/axios';
import moment from 'moment'

const styles = theme => ({
    root: {},
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    avatar: {
        backgroundColor: '#453535', 
    }
  });

  
class JokePostTable extends React.Component {

    state = {
        jokeId: 0,
        isLoaded: false,
        jokeArray: [],
        searchedJoke: '',
        months: ["January", "February", "March", "April", "May", 
                  "June", "July", "August", "September", "October", "November", "December"]
    };

    removeDivsFromJokeContent = (jokes) => {
        jokes.map((joke) => {
            let res = joke.content.split("<div>");
            let newRes = '';
            for (let i = 0; i < res.length; i++) {
                newRes = newRes + res[i] + "\n";
            }
            res = newRes.split("</div>");
            newRes = '';
            for (let i = 0; i < res.length; i++) {
                newRes = newRes + res[i] + "\n";
            }
            res = newRes.split("<br>");
            newRes = '';
            for (let i = 0; i < res.length; i++) {
                newRes = newRes + res[i] + "\n";
            }
            res = newRes.split("&nbsp;");
            newRes = '';
            for (let i = 0; i < res.length; i++) {
                newRes = newRes + res[i] + "\n";
            }
            joke.content = newRes;
        })
        return jokes;
    }

    componentDidMount() {
        fetch("http://localhost:8090/jokes")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              jokeArray: result
            });

            console.log(result);

            let newJokeArray = this.removeDivsFromJokeContent(result);
            this.setState({
              isLoaded: true,
              jokeArray: newJokeArray
            });
          },
          // Note: it's important to handle errors here
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    componentDidUpdate = () => {    
        
    }

    handleChangeText = () => {
        console.log("here");

        if (this.state.jokePosterId == this.state.jokeUserId) {
            this.setState({
                ...this.state
            });
        }
        else {
            // do nothing
        }
    }

    handleChange = (prop) => (event) => {
        console.log('URMATORUL PAS');
        this.setState({ 
            ...this.state, 
            [prop]: event.target.value 
        });
      };


    searchJokes = () => {
        console.log('im searchin for a new joke tati');

        /// trimit la backend textul cautat
        console.log(this.state.searchedJoke)
        axios.get("http://localhost:8090/search?tags=" + this.state.searchedJoke
            )
            .then(res => {
                console.log(res);
                console.log(JSON.stringify(res.data));
                
                // s-a intors un raspuns bun

                this.setState({
                    ...this.state,
                    jokeArray: res.data
                    }
                )

             }
            ).catch((error) => {
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
                   
                    setTimeout(() => {
                        this.setState({ serverResponseNoResponse: !this.state.serverResponseNoResponse });   
                    }, 0);  // semnaleaza eroare print-un mesaj
    
                    setTimeout(() => {
                        this.setState({ serverResponseNoResponse: !this.state.serverResponseNoResponse });
                    }, 1500);  /// fa sa dispara mesajul de eroare
    
                     console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                }
                 console.log(error.config);
                 console.log(error);
            });        

        /// iau output-ul si updatez state-ul curent cu jokearray-ul pe care l-am primit
    }

  render () {

    const {
        jokes,
        searchedJoke,
        jokeArray,
        isLoaded
    } = this.state;

    const {
        classes
     } = this.props;


     console.log('The jokarray is as following');
     console.log(jokeArray);

     console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

     if (jokes) {
        console.log(moment(jokes[0].createdAt).format('MM/DD/YYYY'));
        console.log('SARPILIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
     }
        

    return (
        
        isLoaded && <div className>
            <br></br>
            <SearchBar
                style={{marginTop: 50
                }}
                value={searchedJoke}
                onChange={(newValue) => {
                    console.log("s-a modificat textul cautarii");
                    this.setState({ searchedJoke: newValue })}
                }
                onRequestSearch={() => {
                    console.log("trebuie cautate doar glumele care au tagul asta");
                    this.searchJokes(searchedJoke)}
                }
            />
            <br></br>

            {
                (this.state.jokeArray.length > 0) && this.state.jokeArray.map(joke => (
                    <div >
                       <Card> 
                       <Link to={ `/profile/${joke.posterId}` }
                             className="removeUnderline"
                       >
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe" style={{backgroundColor: '#E1173F' }}                
                            >
                                {`${joke.title[0]}`}
                            </Avatar>
                            }
                            title={`${joke.title}`}
                            /// subheader={`${joke.createdAt}`}
                            subheader={
                                (joke) ?
                                `${ moment(joke.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`   
                                :   
                                `${' '}`
                            }
                        />
                        </Link>
                       <Link to={ `/viewer/${joke._id}` }
                             className="removeUnderline"
                       >
                        <CardContent className="marginTop">
                            <p className="Blend"
                                onClick={this.handleChangeText}> 
                            { `${joke.content}`} 
                            </p>
                        </CardContent>
                        </Link>
                        </Card>
                    </div>
                ))
            }

            <br></br> 
        </div>
    );
    }
}

JokePostTable.propTypes = {
    classes: PropTypes.object.isRequired,
 };

 export default withStyles(styles)(JokePostTable);