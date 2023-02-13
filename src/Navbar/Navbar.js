import React from 'react'
import './Navbar.css'
import Popcorn from "../Popcorn.png";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="header">
      <NavLink to={`/`} className="site-title-link">
        <div className="header-container">
          <h1 className="site-name">Funky Flix</h1>
          <img className="popcorn-icon" src={Popcorn} alt="popcorn icon"></img>
        </div>
      </NavLink>
    </header>
  )
}

export default Navbar