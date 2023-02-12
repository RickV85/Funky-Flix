import React, { useEffect, useState } from "react";

function Sorted({sortMovies }) {

  const handleClick = () => {
    let sortValue = document.getElementById("mySelect")
    sortMovies(sortValue.value)
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
          value="Sort Movies"
        ></input>
      </form>
    </section>
  );
}

export default Sorted;
