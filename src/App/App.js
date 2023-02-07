import "./App.css";
import React from "react";
import MovieDetails from "../MovieDetails/MovieDetails";
import MovieContainer from "../MovieContainer/MovieContainer.js";
import Navbar from "../Navbar/Navbar.js";
import getRequest from "../APICalls.js";

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

  selectMovie = (event) => {
    if (!this.state.selectedMovie) {
      getRequest(event.target.parentElement.id).then((data) =>
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
        {!this.state.selectedMovie && !this.state.loading && !this.state.error && (
          <MovieContainer
            movies={this.state.movies}
            selectMovie={this.selectMovie}
          />
        )}
        {this.state.selectedMovie && (
          <MovieDetails
            movie={this.state.selectedMovie}
            selectMovie={this.selectMovie}
          />
        )}
        {this.state.error && (
          <h2 className="error-message">
            Sorry - We are having server issues. Please try again later.
          </h2>
        )}
      </main>
    );
  }
}

export default App;
