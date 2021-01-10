import React from 'react';
import SearchBar from 'material-ui-search-bar'
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { Link } from 'react-router-dom';
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

  
class LatestJokes extends React.Component {

    state = {
        jokeId: 0,
        isLoaded: false,
        jokeArray: [],
        searchedJoke: ''
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
        fetch("http://localhost:8090/jokesByDate")
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
        this.setState({ 
            ...this.state, 
            [prop]: event.target.value 
        });
      };

    handleLove = () => {    
        
    }

    handleShare = () => {    
       
    }

    searchJokes = () => {
        
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

    return (
        <div className style={{
            marginTop: 80
        }}>
            <br></br>
            <br></br>
            {
                isLoaded && this.state.jokeArray.map(joke => (
                    <div >
                       <Card> 
                       <Link to={ `/profile/${joke.posterId}` }
                             className="removeUnderline"
                       >
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe" style={{backgroundColor: '#E1173F' }}                
                            >
                                {
                                (joke) ?
                                `${joke.title[0]}`
                                :
                                `${' '}`
                                }
                            </Avatar>
                            }
                            title={
                                (joke) ?
                                `${joke.title}`
                                :
                                `${' '}`
                                }
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

 export default (LatestJokes);