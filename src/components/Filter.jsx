import React from "react";

const Filter = ({ categories, selectedCategory, onCategoryChange, sortOrder, onSortChange }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
      {/* Category Filter */}
      <div>
        <label className="font-medium mr-2">Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none"
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
      <div>
        <label className="font-medium mr-2">Sort by:</label>
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none"
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
