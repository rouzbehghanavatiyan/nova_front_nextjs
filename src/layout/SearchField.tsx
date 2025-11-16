import React, { useState, useCallback, useRef } from "react";
import { Input } from "@heroui/react";
import { SearchIcon } from "../components/icons";
import SearchResults from "./SearchResult";
import { productService } from "../api/services/productService";

const SearchField: React.FC = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleSearching = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTitle(value);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (value.trim() === "") {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsLoading(true);
      setShowResults(true);

      timeoutRef.current = setTimeout(async () => {
        try {
          const isNumber = /^\d+$/.test(value.trim());

          let response;
          if (isNumber) {
            response = await productService.productBySearching(
              null,
              parseInt(value)
            );
          } else {
            response = await productService.productBySearching(value, null);
          }

          setSearchResults(response.data || []);
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      }, 500);
    },
    []
  );

  console.log(searchResults);

  const handleConfirmSearch = () => {
    console.log("Confirm search:", searchTitle);
    setShowResults(false);
  };

  const handleResultSelect = (item: any) => {
    console.log("Selected item:", item);
    setSearchTitle(item.name);
    setShowResults(false);
  };

  const handleInputFocus = () => {
    if (searchResults.length > 0 || isLoading) {
      setShowResults(true);
    }
  };

  const handleInputBlur = () => {
    console.log("HHHHHHHHHHHHHHHHHHHHHH");
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <div className="w-1/2 flex justify-center relative">
      <div className="w-full relative">
        <Input
          value={searchTitle}
          onChange={handleSearching}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyPress={(e: any) => {
            if (e.key === "Enter") {
              handleConfirmSearch();
            }
          }}
          endContent={
            <SearchIcon
              onClick={handleConfirmSearch}
              className="cursor-pointer"
            />
          }
          placeholder="جستجو . . ."
        />

        {showResults && (
          <SearchResults
            results={searchResults}
            isLoading={isLoading}
            onSelect={handleResultSelect}
          />
        )}
      </div>
    </div>
  );
};

export default SearchField;
