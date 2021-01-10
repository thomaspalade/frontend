import React from 'react';
import SearchBar from 'material-ui-search-bar'
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { Link } from 'react-router-dom';
import moment from 'moment'
  
class MostUpvotedJokes extends React.Component {

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
        fetch("http://localhost:8090/jokesByUpvotes")
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

        if (this.state.jokePosterId === this.state.jokeUserId) {
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

    handleLove = () => {    
        console.log('lentile dior');
    }

    handleShare = () => {    
        console.log('geaca de print');
    }

    searchJokes = () => {
        console.log('im searchin for a new joke tati');
    }

  render () {

    const {
        searchedJoke,
        jokeArray
    } = this.state;

     console.log('The jokarray is as following');
     console.log(jokeArray);

    return (
        <div className style={{
            marginTop: 80
        }}>
            <br></br>
            <br></br>


            {
                this.state.jokeArray.map(joke => (
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


 export default (MostUpvotedJokes);