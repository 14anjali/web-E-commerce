import React, { useState } from "react";

const ProductSearch = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (onSearch) onSearch(value); // Send search string back to Home
  };

  return (
    <div className="relative mb-4 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Search products by name or category..."
        value={search}
        onChange={handleChange}
        className="w-full py-2 pl-10 pr-4 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-300"
      />
      {/* Plain SVG search icon */}
      <svg
        className="absolute left-3 top-2.5 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width={18}
        height={18}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M16.65 16.65a7 7 0 10-9.9-9.9 7 7 0 009.9 9.9z"
        />
      </svg>
    </div>
  );
};

export default ProductSearch;
