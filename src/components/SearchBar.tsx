import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Call onSearch with the updated query value
  };

  return (
    <div className="flex justify-end pr-1 md:pr-9 mt-6 md:mb-[40px] mb-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="px-4 py-2 w-[300px] md:w-[32%] text-white bg-white bg-opacity-20 backdrop-blur-lg rounded-full border border-white border-opacity-30 shadow-lg focus:outline-none"
        placeholder="Search for movies..."
      />
    </div>
  );
};

export default SearchBar;
