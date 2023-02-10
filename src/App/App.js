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
    if (!this.state.selectedMovie || !(this.state.selectedMovie.movie.id === +(id))) {
      getRequest(id).then((data) =>
        this.setState({ selectedMovie: data })
      );
      return;
    }
  };

  removeSelectedMovie = () => {
    if (this.state.selectedMovie) {
      this.setState({selectedMovie: ""})
    }
  }

  render() {
    return (
      <main>
        <Navbar />
        <Route
          exact
          path="/"
          render={() => {
            if (this.state.movies && !this.state.loading) {
              return <MovieContainer movies={this.state.movies} />;
            }
          }}
        />
        <Route
          exact
          path="/:id"
          render={({ match }) => {
            return (
              <MovieDetails
                movie={this.state.selectedMovie}
                selectMovie={this.selectMovie}
                matchID={match.params.id}
                removeSelectedMovie={this.removeSelectedMovie}
              />
            );
          }}
        />
        {this.state.error && (
          <h2 className="error-message">
            Sorry - We are having server issues. Please try again later.
          </h2>
        )}
        {this.state.loading && (
          <section>
            <h2 className="loading">
              Loading ...
            </h2>
          </section>
        )}
      </main>
    );
  }
}

export default App;
