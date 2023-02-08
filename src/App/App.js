import "./App.css";
import React from "react";
import MovieDetails from "../MovieDetails/MovieDetails";
import MovieContainer from "../MovieContainer/MovieContainer.js";
import Navbar from "../Navbar/Navbar.js";
import getRequest from "../APICalls.js";
import { Route } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: "",
      selectedMovie: "",
      loading: true,
      error: "",
    };
  }

  // This get request works without the Promise.resolve
  componentDidMount = () => {
    getRequest("")
      .then((data) => {
        this.setState({ movies: data.movies, loading: false });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };

  selectMovie = (id) => {
    if (!this.state.selectedMovie) {
      getRequest(id).then((data) =>
        this.setState({ selectedMovie: data })
      );
      return;
    }
    this.setState({ selectedMovie: "" });
  };

  render() {
    return (
      <main>
        <Navbar />
        {/* {!this.state.selectedMovie && !this.state.loading && (
          <MovieContainer
            movies={this.state.movies}
            selectMovie={this.selectMovie}
          />
        )} */}
        
        <Route 
          exact path="/"
          render={(match) => {
            console.log(match)
            if (this.state.selectedMovie) {
              this.selectMovie('')
            }
            if (!this.state.selectedMovie && !this.state.loading) { 
              return (
              <MovieContainer
              movies={this.state.movies}
              selectMovie={this.selectMovie}
              />
              )
            }
          }}
        />
        {/* {this.state.selectedMovie && (
          <MovieDetails
            movie={this.state.selectedMovie}
            selectMovie={this.selectMovie}
          />
        )} */}
        <Route
          exact path="/:id"      
          render={({match}) => {
          const movieToRender = this.state.movies.find(movie => movie.id === +(match.params.id));   
            if (this.state.selectedMovie && (movieToRender.id === this.state.selectedMovie.movie.id)) {
              return (
                <MovieDetails
                  movie={this.state.selectedMovie}
                  selectMovie={this.selectMovie}
                />
              )
            }
          
          }}
        />
        {this.state.error && (
          <h1>
            We're Sorry - We are having server issues. Please try again later.{" "}
          </h1>
        )}
      </main>
    );
  }
}

export default App;
