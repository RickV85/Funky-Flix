import React from 'react'
import './Navbar.css'
import Popcorn from "../Popcorn.png";

const Navbar = () => {


    return (
      <header className="header">
        <div className="header-container">
          <h1 className="site-name">Funky Flix</h1>
          <img className="popcorn-icon" src={Popcorn} alt="popcorn icon"></img>
        </div>
      </header>
    )

}

export default Navbar