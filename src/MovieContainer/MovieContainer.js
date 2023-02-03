import React from "react";
import "./MovieContainer.css";
import Movie from '../Movie/Movie';

const MovieContainer = ({movies}) => {
  const allMovies = movies.map((movie)=> {
    return (
      <Movie 
        id={movie.id}
        poster_path={movie.poster_path}
        backdrop_path={movie.backdrop_path}
        title={movie.title}
        average_rating={movie.average_rating}
        release_date={movie.release_date}
      />
    )
  })


 return (
  <section className="all-movies-view">
    {allMovies}
  </section>
 )
}

export default MovieContainer;