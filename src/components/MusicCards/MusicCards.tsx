import React, { useState } from "react";
import { searchTypesense } from "../../api/fetchMusic";
import "./MusicCards.css";
import { Result, mapResults } from "../../types/resultTypes";

const MusicCards = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [collection, setCollection] = useState("tracks"); // Default to 'tracks'
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages

  const perPage = 8; // Results per page

  const handleSearch = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiResponse = await searchTypesense(
        searchQuery,
        collection,
        page,
        perPage
      );
      console.log('API Response:', apiResponse); // Log the full API response for debugging
      const results = mapResults(apiResponse.hits); // Map the API response to Result instances
      setSearchResults(results);
      setTotalPages(
        apiResponse.found ? Math.ceil(apiResponse.found / perPage) : 0
      ); // Set total pages
    } catch (error) {
      alert("Failed to fetch results. Please try again.");
    }

    setLoading(false);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      handleSearch(); // Re-fetch results for the next page
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      handleSearch(); // Re-fetch results for the previous page
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className="search-form">
        <select
          className="select-input"
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
        >
          <option value="tracks" className="select-option">
            Tracks
          </option>
          <option value="sfx" className="select-option">
            SFX
          </option>
        </select>
        <input
          type="text"
          placeholder="Search for tracks or SFX..."
          value={searchQuery}
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {searchResults.length > 0 && (
        <ul className="result-card-wrapper">
          {searchResults.map((result, index) => (
            <li key={index} className="result-card">
              
                <div className="result-name-or-sfx">{result.document.name}</div>
             

              <img
                className="result-image"
                src={result.document.image}
                alt={result.document.image}
              />
              <div className="result-artist">{result.document.artist}</div>
              {collection === "tracks" && ( <div>
                <div className="tags-title">Featured Tags:</div>
              
              <ul className="result-tags-wrapper">
                {result.document.tags.map((tag: string) => (
                  <li className="result-tag">{tag}</li>
                ))}
                
              </ul>
              </div>
              )}
            </li>
          ))}
        </ul>
      )}
      {totalPages !== 0 && (
        <div className="pagination-wrapper">
          <button
            className="page-button"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="page-button"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default MusicCards;
