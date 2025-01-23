import React, { KeyboardEvent } from "react";
import "../../styles/ui/SearchBar.css";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  placeholder?: string;
  mode?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  placeholder = "",
  mode = "",
}) => {
  if (mode === "table" && !placeholder) {
    throw new Error(
      "The 'placeholder' parameter is mandatory when 'mode' is set to 'table'."
    );
  }

  const effectivePlaceholder =
    mode === "type" && !placeholder ? "Search" : placeholder;

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Search triggered with query:", query);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={query}
        placeholder={effectivePlaceholder}
        className="search-bar-input"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="search-bar-button"
        onClick={() => console.log("Search triggered with query:", query)}
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="search-bar-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
