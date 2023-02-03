import './App.css';
import React from 'react'
import movieData from "../movieData"
import Movie from '../Movie/Movie.js'
import MovieContainer from '../MovieContainer/MovieContainer.js'
import Navbar from '../Navbar/Navbar.js'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      movies: movieData.movies,
      selectedMovie: ''
    }
  }

  render() {
    return (
      <main>
        <Navbar />
        { !this.state.selectedMovie && <MovieContainer movies={this.state.movies}/>}
        {/* <MovieDetails /> */}
      </main>
    );
  }
}

export default App;
