import React from "react";
import './Movie.css'

const Movie = ({poster_path, title, average_rating}) => {
  return (
    <div className="movie-tile">
      <img className="movie-poster" src={poster_path} alt={`A poster for the movie ${title}`}></img>
      <h2>{title}</h2>
      <h2>{`Funk Score: ${average_rating}`}</h2>
    </div>
  )
}

export default Movie;
