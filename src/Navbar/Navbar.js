import React from 'react'
import './Navbar.css'
import Popcorn from "../icons8-popcorn-96.png";

const Navbar = () => {


    return (
      <header className="header">
        <div className="header-container">
          <h1 className="site-name">Funky Flix</h1>
          <img className="popcorn-icon" src={Popcorn}></img>
        </div>
      </header>
    )

}

export default Navbar