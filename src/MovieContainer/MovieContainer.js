import React from "react";
import "./MovieContainer.css";
import Movie from '../Movie/Movie';
import { Route, Switch, Redirect, NavLink, Link } from "react-router-dom";

const MovieContainer = ({movies, selectMovie}) => {
  const allMovies = movies.map((movie)=> {
    return (
      //  <Link to={`/${movie.id}`} onClick={() => selectMovie(movie.id)} key={movie.id}>
      <Link to={`/${movie.id}`} key={movie.id}>
        <Movie
          key={movie.id}
          id={movie.id}
          poster_path={movie.poster_path}
          backdrop_path={movie.backdrop_path}
          title={movie.title}
          average_rating={movie.average_rating}
          release_date={movie.release_date}
          selectMovie={selectMovie}
        />
      </Link>
    );
  })


 return (
  <section className="all-movies-view">
    {allMovies}
  </section>
 )
}

export default MovieContainer;