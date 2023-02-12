import "./App.css";
import React, { useEffect, useState } from "react";
import MovieDetails from "../MovieDetails/MovieDetails";
import MovieContainer from "../MovieContainer/MovieContainer.js";
import Navbar from "../Navbar/Navbar.js";
import getMoviesAndMovieDetails from "../APICalls.js";
import { Route } from 'react-router-dom';
import Search from "../Search/Search";

function App() {

  const [movies, setMovies] = useState('');
  const [filteredMovies, setFilteredMovies] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedMovieTrailer, setSelectedMovieTrailer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  let filterMovies = (value) => {
    if (movies) {
      if (!value) {
        setFilteredMovies('');
      }
      let searchResults = movies.filter((movie) => {
        let movieTitle = movie.title.toLowerCase();
        if (movieTitle.includes(value.toLowerCase())) {
          return movie;
        }
        return null;
      })
      setFilteredMovies(searchResults);
    }
  }

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
  };

  return (
    <main>
      <Navbar />
        <Route
          exact
          path="/"
          render={() => {
            if (movies && !loading) {
              return (
                <div>
                  <Search filterMovies={filterMovies}/>
                  <MovieContainer movies={movies} filteredMovies={filteredMovies} /> 
                </div>
              ) 
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
        {(!error && loading) && (
            <section>
              <h2 className="loading">Loading ...</h2>
            </section>
          )
        }
        {error && (
          <h2 className="error-message">
            Sorry - We are having server issues. Please try again later.
          </h2>
          )
        }
        {!loading && (!movies && !selectedMovie) && (<h2>No Page Found</h2>)}   
    </main>
  );
}

export default App;
