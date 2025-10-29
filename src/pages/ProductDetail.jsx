import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products.json";

const Home = () => {
  const productsPerPage = 15;
  const totalPages = Math.ceil(productsData.length / productsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);

  // Shuffle and slice products for current page
  useEffect(() => {
    const shuffled = [...productsData].sort(() => Math.random() - 0.5);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setCurrentProducts(shuffled.slice(startIndex, endIndex));
  }, [currentPage]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">🛍 Featured Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-8 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-4 py-2 rounded ${
              currentPage === number
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
