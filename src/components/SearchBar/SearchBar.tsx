import React, { useState, useRef, useEffect } from "react";
import "./SearchBar.scss";
import { SearchBarProps } from "./SearchBarTypes";
import { Track } from "../TrackList/TrackListTypes";

export const SearchBar: React.FC<SearchBarProps> = ({
  onClick,
  suggestions = [],
  items = [],
  render,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<Track[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filteredSuggestions =
      searchTerm !== ""
        ? items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : suggestions;
    setFilteredItems(filteredSuggestions);
  }, [searchTerm, suggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(true);
  };

  return (
    <div className="search-bar-container" ref={wrapperRef}>
      <input
        type="text"
        className="search-input"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        placeholder={"Search for a song"}
      />
      {showDropdown && filteredItems.length > 0 && (
        <div className="dropdown">
          {filteredItems.map((item: Track) => (
            <div
              key={item.id}
              onClick={() => {
                onClick?.(item);
                setShowDropdown(false);
              }}
              style={{ cursor: "pointer" }}
            >
              {render(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
