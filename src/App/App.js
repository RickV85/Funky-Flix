import "./App.css";
import React, { useEffect, useState } from "react";
import MovieDetails from "../MovieDetails/MovieDetails";
import MovieContainer from "../MovieContainer/MovieContainer.js";
import Navbar from "../Navbar/Navbar.js";
import getMoviesAndMovieDetails from "../APICalls.js";
import { Route, Switch } from 'react-router-dom';

function App() {

const [movies, setMovies] = useState('');
const [selectedMovie, setSelectedMovie] = useState('');
const [selectedMovieTrailer, setSelectedMovieTrailer] = useState('');
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

// movies: "",
// selectedMovie: "",
// selectedMovieTrailer: "",
// loading: true,
// error: "",

useEffect(() => {
  getMoviesAndMovieDetails("")
    .then((data) => {
      setMovies(data.movies);
      setLoading(false);
    })
    .catch((error) => {
      setError(true);
    });
}, [])

  // componentDidMount = () => {
  //   getMoviesAndMovieDetails("")
  //     .then((data) => {
  //       setMovies(data.movies);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(true);
  //     });
  // };

  let selectMovie = (id) => {
      getMoviesAndMovieDetails(id).then((data) =>
        setSelectedMovie(data)
      );
      return;
  };

  let getMovieTrailer = (id, videos) => {
    let foundTrailer;
    getMoviesAndMovieDetails(id, videos).then((data) => {
      if (data.videos.length) {
        foundTrailer = data.videos.find((video) => video.type === "Trailer")
      } else {
        foundTrailer = false;
      }
      setSelectedMovieTrailer(foundTrailer);
    })
  };

  let removeSelectedMovie = () => {
    if (selectedMovie) {
      setSelectedMovie("");
    }
  }

  return (
    <main>
      <Navbar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            if (movies && !loading) {
              return <MovieContainer movies={movies} />;
            }
          }}
        />
        <Route
          exact
          path="/:id"
          render={({ match }) => {
            return (
              <MovieDetails
                movie={selectedMovie.movie}
                selectMovie={selectMovie}
                matchID={+(match.params.id)}
                removeSelectedMovie={removeSelectedMovie}
                getMovieTrailer={getMovieTrailer}
                selectedMovieTrailer = {selectedMovieTrailer}
              />
            );
          }}
        />
        <Route 
          render={() => {
            if (error) {
              return (
                <h2 className="error-message">
                  Sorry - We are having server issues. Please try again later.
                </h2>
              );
            }
            if (loading) {
              return (
                <section>
                  <h2 className="loading">Loading ...</h2>
                </section>
              )
            }
            return <h2>No Page Found</h2>;
          }}
        />
      </Switch>
    </main>
  );
}

export default App;
