import './App.css';
import React from 'react';
import movieData from "../movieData";
import SingleMovieData from "../SingleMovieData";
import Movie from '../Movie/Movie.js';
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieContainer from '../MovieContainer/MovieContainer.js';
import Navbar from '../Navbar/Navbar.js';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      movies: movieData.movies,
      selectedMovie: ''
    }
  }

  selectMovie = (id) => {
    // Fetch single movie using ID then update state after
    // finding ID in .then chain
    this.setState({ selectedMovie: SingleMovieData })
  }

  render() {
    return (
      <main>
        <Navbar />
        { !this.state.selectedMovie && <MovieContainer movies={this.state.movies} selectMovie={this.selectMovie}/>}
        { this.state.selectedMovie && <MovieDetails movie={this.state.selectedMovie} />}
      </main>
    );
  }
}

export default App;
