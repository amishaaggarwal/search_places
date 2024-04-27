import React from "react";
import Spinner from "../Spinner";
import "./searchField.css";
import RecordPerPage from "../RecordPerPage";

const SearchField = ({
  searchText,
  placeholder,
  isLoading,
  handleChange,
  handleSetRecordPerPage,
  limit,
  searchInputRef,
  handleEnter,
}) => {
  return (
    <div className="header-bar">
      <div className="loader-search-container">
        <div className="search-field">
          <input
            id="searchInput"
            type="text"
            value={searchText}
            onChange={handleChange}
            placeholder={searchText ? "" : placeholder}
            disabled={isLoading}
            ref={searchInputRef}
            onKeyDown={handleEnter}
          />
          <span className="keyboard-shortcut">Ctrl + /</span>
        </div>
        {isLoading && (
          <span className="loading-icon">
            <Spinner />
          </span>
        )}
      </div>
      <div>
        <RecordPerPage
          handleSetRecordPerPage={handleSetRecordPerPage}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default SearchField;
