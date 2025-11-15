import React from "react";

interface SearchResultsProps {
  results: any[];
  isLoading: boolean;
  onSelect: (item: any) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
  onSelect
}) => {
  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border-gray-200 shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
        <div className="p-4 text-center text-gray-500">
          در حال جستجو...
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

//   return (
//     <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
//       {results.map((item, index) => (
//         <div
//           key={item.id || index}
//           className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
//           onClick={() => onSelect(item)}
//         >
//           <div className="font-medium text-gray-600">{item.name}</div>
//           {item.description && (
//             <div className="text-sm text-gray-600 mt-1">{item.description}</div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
};

export default SearchResults;