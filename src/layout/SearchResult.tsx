import React from "react";
import StringHelpers from "../config/StringHelpers";

interface SearchResultsProps {
  results: any[];
  isLoading: boolean;
  onSelect: (item: any) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
  onSelect,
}) => {
  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border-gray-200 shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
        <div className="p-4 text-center text-gray-500">در حال جستجو...</div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50 mt-1 max-h-96 overflow-y-auto">
      {results.map((item: any, index) => {
        const imgUri = StringHelpers.getProfile(
          item?.attachments?.[0],
          item?.code
        );
        return (
          <div
            key={item.id || index}
            className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
            onClick={() => onSelect(item)}
          >
            <div className="flex justify-between">
              <div className="font-light flex items-center font12 text-gray-600">
                {item.name}
              </div>
              <img
                src={imgUri}
                alt={item?.name}
                loading="lazy"
                crossOrigin="anonymous"
                className="w-20 rounded-full h-20"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
