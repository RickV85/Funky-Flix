import React, { useEffect } from "react";
import "./MovieDetails.css";
import moment from "moment";
import { Link } from "react-router-dom";

const MovieDetails = ({
  movie,
  selectMovie,
  matchID,
  removeSelectedMovie,
  getMovieTrailer,
  selectedMovieTrailer,
}) => {
  useEffect(() => {
    let noMovieFoundSection = document.getElementById('noMovie');
    let loadingMessage = document.getElementById('loadingMessage');
    setTimeout(() => {
      if (noMovieFoundSection) {
        noMovieFoundSection.classList.remove('hidden');
        loadingMessage.classList.add('hidden');
      }
    }, 2000)
  }, [])

  if (!movie || !(movie.id === matchID)) {
    selectMovie(matchID);
    getMovieTrailer(matchID, "video");
    if (!movie) {
      return (
        <section className="no-movie-found">
          <h2 id="loadingMessage" className="loading-movie-details">Loading ...</h2>
          <div id="noMovie" className="hidden">
            <h2> No Movie Found</h2>
            <Link to="/" onClick={() => removeSelectedMovie()}>
              <button className="no-movie-back-button">GO BACK</button>
            </Link>
          </div>
        </section>
      );
      
    }
  }

  const formattedRelease = moment(movie.release_date).format("l");
  const formattedGenres = () => {
    let genreDisplay = [];
    for (let i = 0; i < movie.genres.length; i++) {
      if (i < movie.genres.length - 1) {
        genreDisplay.push(`${movie.genres[i]}, `);
      } else {
        genreDisplay.push(movie.genres[i]);
      }
    }
    return genreDisplay;
  };
  const budgetRevenueDisplay = (type) => {
    let displayNum = movie[type];
    if (displayNum === 0) {
      return `Not available`;
    } else {
      return `$${displayNum.toLocaleString("en-US")}`;
    }
  };
  return (
    <section className="single-movie-display">
      <section className="single-movie-header">
        <Link to="/" onClick={() => removeSelectedMovie()}>
          <button className="go-back-all-movies">GO BACK</button>
        </Link>
      </section>
      <section className="poster-details-section">
        <img
          src={movie.poster_path}
          className="single-movie-poster"
          alt={`A movie poster for the ${movie.title} movie`}
        />
        <article className="single-movie-details-section">
          <div className="single-movie-title-tag">
            <h2 className="movie-title-details">{movie.title}</h2>
            <p className="movie-tagline">
              {movie.tagline && `"${movie.tagline}"`}
            </p>
          </div>
          <p className="movie-overview">{movie.overview}</p>
          <div className="movie-details-divider">
            <h3>Movie Details</h3>
          </div>
          <section className="movie-details-section">
            <p className="movie-details-copy">{`Funk rating: ${movie.average_rating}`}</p>
            <p className="movie-details-copy">{`${movie.runtime} minutes`}</p>
            <p className="movie-details-copy">{formattedGenres()}</p>
          </section>
          <div className="production-details-divider">
            <h3>Production Details</h3>
          </div>
          <section className="production-details-section">
            <p className="movie-details-copy">{`Budget: ${budgetRevenueDisplay(
              "budget"
            )}`}</p>
            <p className="movie-details-copy">{`Revenue: ${budgetRevenueDisplay(
              "revenue"
            )}`}</p>
            <p className="movie-details-copy">{`Release date: ${formattedRelease}`}</p>
          </section>
          {selectedMovieTrailer && (
            <iframe
              className="movie-trailer"
              alt={`A movie trailer for the ${movie.title} movie`}
              src={`https://www.youtube.com/embed/${selectedMovieTrailer.key}`}
              title="YouTube video player"
            ></iframe>
          )}
        </article>
      </section>
    </section>
  );
};

export default MovieDetails;
