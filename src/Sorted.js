import React, { useEffect, useState } from "react";

function Sorted({sortMovies }) {

  const handleClick = () => {
    let sortValue = document.getElementById("mySelect").value;
    sortMovies(sortValue)
  };

  return (
    <section className="search-section">
      <form>
        <a className="filter-text">Sort Movies By:</a>
        <select id="mySelect">
          <option>Sort</option>
          <option>Rating (high to low)</option>
          <option>Release Date (newest to oldest)</option>
          <option>Runtime (longest to shortest)</option>
        </select>
        <input
          type="button"
          onClick={handleClick}
          value="Filter Results"
        ></input>
      </form>
    </section>
  );
}

export default Sorted;
