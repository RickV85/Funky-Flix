import React, { useEffect, useState } from "react";

function Sorted({sortMovies }) {

  const handleClick = () => {
    let sortValue = document.getElementById("mySelect").value;
    sortMovies(sortValue)
  };

  return (
    <section className="search-section">
      <form>
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
          value="Filter Results"
        ></input>
      </form>
    </section>
  );
}

export default Sorted;
