import React from "react";
import './MovieDetails.css'
import moment from "moment";


const MovieDetails = ({ movie, selectMovie }) => {
  movie = movie.movie;
  const formattedRelease = moment(movie.release_date).format('l');
  // Add comma and space to multiple genres, except last. Conditional then for loop?
  const formattedGenres = movie.genres;

  return (
    <section className="single-movie-display">
      <section className="single-movie-header">
        <button onClick = {event => selectMovie(event.target.id)} className="go-back-all-movies">GO BACK</button>
      </section>
      <section className="poster-details-section">
        <img src={movie.poster_path} className="single-movie-poster" alt={`A movie poster for ${movie.title}`} />
        <article className="single-movie-details-section">
          <div className="single-movie-title-tag">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-tagline">{`"${movie.tagline}"`}</p>
          </div>
          <p className="movie-overview">{movie.overview}</p>
          <div className="movie-details-divider">
            <h3>Movie Details</h3>
          </div>
          <section className="movie-details-section">
            <p>{`Funk rating: ${movie.average_rating}`}</p>
            <p>{`${movie.runtime} minutes`}</p>
            <p>{formattedGenres}</p>
          </section>
          <div className="production-details-divider">
            <h3>Production Details</h3>
          </div>
          <section className="production-details-section">
            <p>{`Budget: $${movie.budget.toLocaleString("en-US")}`}</p>
            <p>{`Revenue: $${movie.revenue.toLocaleString("en-US")}`}</p>
            <p>{`Release date: ${formattedRelease}`}</p>
          </section>
        </article>
      </section>
    </section>
  )

}


export default MovieDetails;