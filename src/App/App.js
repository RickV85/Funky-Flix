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

  componentDidMount = () => {
    const movieRequest = getRequest("");
    Promise.resolve(movieRequest)

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
        {!this.state.selectedMovie && !this.state.loading && (
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
          <h1>
            We're Sorry - We are having server issues. Please try again later.{" "}
          </h1>
        )}
      </main>
    );
  }
}

export default App;
