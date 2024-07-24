import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  selectedCategories: string[];
  onSearch: (searchText: string) => void;
  onCategoryChange: (category: string) => void;
  searchValue: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ selectedCategories, onSearch, onCategoryChange, searchValue }) => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/category');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      //console.log("categories to update--",data.categories);
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Optionally handle error state or retry logic
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //console.log('set search value--',event.target.value);
    onSearch(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
  };

  const clearSearch = () => {
    onSearch(''); // Clear the search value
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
      <div className="flex flex-wrap items-center mr-4">
        {categories.map((category, index) => {
          let buttonStyle = '';
          switch (index) {
            case 0:
              buttonStyle = 'from-purple-600 to-blue-500';
              break;
            case 1:
              buttonStyle = 'from-cyan-500 to-blue-500';
              break;
            case 2:
              buttonStyle = 'from-green-400 to-blue-600';
              break;
            case 3:
              buttonStyle = 'from-purple-500 to-pink-500';
              break;
            case 4:
              buttonStyle = 'from-pink-500 to-orange-400';
              break;
            case 5:
              buttonStyle = 'from-teal-300 to-lime-300';
              break;
            case 6:
              buttonStyle = 'from-red-200 via-red-300 to-yellow-200';
              break;
            default:
              buttonStyle = 'bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white';
              break;
          }

          const isSelected = selectedCategories.includes(category.name);

          return (
            <button
              key={category._id}
              className={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full bg-gradient-to-br ${buttonStyle} ${isSelected ? 'ring-4 ring-blue-500' : ''} focus:outline-none`}
              onClick={() => handleCategoryChange(category.name)}
            >
              <span className={`relative px-5 py-2.5 transition-all ease-in duration-75 ${isSelected ? 'bg-transparent text-white' : 'bg-white text-black'} rounded-full`}>
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </span>
            </button>
          );
        })}
      </div>
      <form className="flex flex-grow items-center">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchValue}
          onChange={handleChange}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={clearSearch}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-full flex items-center justify-center hover:bg-gray-400 transition duration-300 ease-in-out"
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
