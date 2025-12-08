import React from "react";

const Filter = ({ categories, selectedCategory, onCategoryChange, sortOrder, onSortChange }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors duration-300">
      {/* Category Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
        <label className="font-medium text-black dark:text-white mr-2">Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 focus:outline-none w-full sm:w-auto bg-white dark:bg-gray-700 text-black dark:text-white transition-colors duration-300"
        >
          <option value="All">All</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
        <label className="font-medium text-black dark:text-white mr-2">Sort by:</label>
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 focus:outline-none w-full sm:w-auto bg-white dark:bg-gray-700 text-black dark:text-white transition-colors duration-300"
        >
          <option value="default">Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
