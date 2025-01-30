import "../../styles/ui/SearchBar.css";

type Props = {
  query: string;
  setQuery: (query: string) => void;
  placeholder: string;
};

const SearchBar = ({ query, setQuery, placeholder }: Props) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        className="search-input"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="search-button" aria-label="Search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="search-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
