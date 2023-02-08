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

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ ...this.state });
    }
  }

  // selectMovie = (id) => {
  //   if (!this.state.selectedMovie && typeof id === "number") {
  //     getRequest(id).then((data) =>
  //       this.setState({ selectedMovie: data})
  //     );
  //     return
  //   }
  //   this.setState({ selectedMovie: ""});
  // };

  render() {
    return (
      <main>
        <Navbar />
        <Switch>
          <Route
            path="/:id"
            render={({ match }) => {
              getRequest(Number(match.params.id)).then((data) =>
                this.setState({ selectedMovie: data})
                )
              if (this.state.selectedMovie) {
                return ( <MovieDetails
                   movie={this.state.selectedMovie}
                   selectMovie={this.selectMovie}
                   // selectedID={match.params.id}
                 />
                )
              }
              
            }}
          />
          <Route
            exact
            path="/"
            render={() => {
              if (this.state.loading) {
                return <h1>Loading...</h1>;
              }
              if (this.state.movies && !this.state.selectedMovie) {
                return (
                  <MovieContainer
                    movies={this.state.movies}
                    selectMovie={this.selectMovie}
                  />
                );
              }
            }}
          />
        </Switch>
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
