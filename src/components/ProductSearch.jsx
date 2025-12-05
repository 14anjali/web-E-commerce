import React, { useState } from "react";

// ProductSearch component: handles search input and passes value to parent
const ProductSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Called whenever user types in the search input
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // send search value to parent (Navbar/Home)
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search products..."
      className="w-full sm:w-80 px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default ProductSearch;
