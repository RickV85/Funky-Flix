import React, { useEffect, useState } from "react";
import './Search.css'

function Search({ filterMovies }) {
  const [searchValue, setSearchValue] = useState('');
  
  useEffect(() => {
    filterMovies(searchValue);
    // eslint-disable-next-line
  }, [searchValue]);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <section className="search-section">
      <input className="search-input" type="text" name="searchValue" placeholder="Search Available Movies" value={searchValue} onChange={handleChange}></input>
    </section>
  )
}

export default Search;