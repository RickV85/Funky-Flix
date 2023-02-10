import React from "react";
import './Movie.css'
import { NavLink } from 'react-router-dom';

const Movie = ({ poster_path, title, average_rating, id}) => {
  return (
    <NavLink to={`/${id}`} className="movie-link">
      <div
        id={id}
        className="movie-tile"
      >
        <img
          className="movie-poster"
          src={poster_path}
          alt={`A poster for the ${title} movie`}
        ></img>
          <h2 className="movie-title">{title}</h2>
          <h2 className="movie-rating">{`Funk Score: ${average_rating}`}</h2>
      </div>
    </NavLink>
  );
}

export default Movie;
