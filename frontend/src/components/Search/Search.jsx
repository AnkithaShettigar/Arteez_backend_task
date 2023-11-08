import React, { useState } from 'react';
import './Search.css';

const Search = ({ onSearch, setSearchModalOpen, isSearchModalOpen }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchClick = () => {
    setSearchModalOpen(true);
  };

  const handleCloseModal = () => {
    setSearchModalOpen(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="search">
      <button className="btn-search" onClick={handleSearchClick}>
        SEARCH
      </button>

      {isSearchModalOpen && (
        <div className="search-modal">
          <div className="search-modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchInputChange}
            />
            <p className="search-title">Search book here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
