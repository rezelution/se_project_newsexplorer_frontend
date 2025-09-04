import React, { useRef, useEffect } from "react";
import "./searchForm.css";

function SearchForm({ inputValue, onInputChange, onSearch }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // when component mounts it will activate the search form so you can enter text right away
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className="searchForm__input"
        type="text"
        placeholder="Enter Topic"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
      />
      <button className="searchForm__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
