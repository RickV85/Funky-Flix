import React from "react";
import "./Movie.css";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";

const Movie = ({ poster_path, title, average_rating, id, selectMovie}) => {
  return (
    <div id={id} className="movie-tile">
      <img
        className="movie-poster"
        src={poster_path}
        alt={`A poster for the movie ${title}`}
      />
      <h2 className="movie-title">{title}</h2>
      <h2 className="movie-rating">{`Funk Score: ${average_rating}`}</h2>
    </div>
  );
};

export default Movie;
