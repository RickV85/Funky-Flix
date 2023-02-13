import React from "react";
import "./SortedMovies.css";

function SortedMovies({ sortMovies }) {

  const handleClick = () => {
    let sortValue = document.getElementById("mySelect")
    sortMovies(sortValue.value)
  };

  return (
    <form className="sort-form">
      <select id="mySelect">
        <option>Sort Movies By:</option>
        <option>Rating (high to low)</option>
        <option>Rating (low to high)</option>
        <option>Title (A to Z)</option>
        <option>Title (Z to A)</option>
      </select>
      <input
        type="button"
        onClick={handleClick}
        value="Sort Movies"
        className="sort-button"
      ></input>
    </form>
  );
}

export default SortedMovies;
