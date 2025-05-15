import React, { useEffect, useState } from "react";
import CardLayout from "./ui/CardLayout.jsx";
import Search from "../assets/images/search.svg";

export default function SearchResult({ onClickHandler }) {
  const [searchCityText, setSearchCityText] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const fetchSuggestions = async function (label) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${label}&format=json&addressdetails=1`
    );
    const datas = await response.json();

    const tempSuggestions = [];
    datas.forEach((data) => {
      tempSuggestions.push({
        label: `${data?.display_name}`,
        lat: data.lat,
        lon: data.lon,
      });
    });
    setSuggestions(tempSuggestions);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchSuggestions(searchCityText);
    }, 500);

    const emptySearchCity = setTimeout(() => {
      setSearchCityText("");
    }, 10000);
    return () => {
      clearTimeout(timeout);
      clearTimeout(emptySearchCity);
    };
  }, [searchCityText]);

  return (
    <div>
      {/* Search Card Layout */}
      <CardLayout>
        <div className="search-card">
          <h1 style={{ padding: "0", margin: "0", fontSize:"45px", letterSpacing:"5px"}}>WEATHER FORECAST</h1>
          {/* Search icon and input tag */}
          <div className="search-city-container city-results">
            <img src={Search} />
            <input
              type="text"
              className="city-input"
              placeholder="Search City"
              value={searchCityText}
              onChange={(e) => setSearchCityText(e.target.value)}
            />
          </div>

          {/* Suggestions */}
          <div className="search-city-suggestions">
            {suggestions?.length > 0 &&
              suggestions.map((suggestionItem, suggestionIndex) =>
                suggestionIndex < 2 ? (
                  <p
                    className="suggested-label"
                    key={suggestionIndex}
                    onClick={() =>
                      onClickHandler(suggestionItem, setSuggestions)
                    }
                  >
                    {suggestionItem.label}
                  </p>
                ) : null
              )}
          </div>
        </div>
      </CardLayout>
    </div>
  );
}
