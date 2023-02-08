import "./App.css";
import React from "react";
import MovieDetails from "../MovieDetails/MovieDetails";
import MovieContainer from "../MovieContainer/MovieContainer.js";
import Navbar from "../Navbar/Navbar.js";
import getRequest from "../APICalls.js";
import { Route, Switch, Redirect, NavLink, Link } from "react-router-dom";

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
    console.log("selectMovie", id);
    if (!this.state.selectedMovie) {
      getRequest(id).then((data) =>
        this.setState({ selectedMovie: data})
      );
      return
    }
    // this.setState({ selectedMovie: ""});
  };

  render() {
    return (
      <main>
        <Navbar />
        
          <Route
            // path={`/${this.state.selectedMovie.id}`}
            path="/"
            render={() => {
              console.log("match");
              if (this.state.selectedMovie) {

                return (
                  <MovieDetails
                    movie={this.state.selectedMovie}
                    selectMovie={this.selectMovie}
                    // selectedID={match.params.id}
                  />
                );
              }
            }}
          />

          <Route
            exact
            path="/"
            render={() => {
              if (
                !this.state.selectMovie &&
                this.state.movies &&
                !this.state.loading
              ) {
                return (
                  <MovieContainer
                    movies={this.state.movies}
                    selectMovie={this.selectMovie}
                  />
                );
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
