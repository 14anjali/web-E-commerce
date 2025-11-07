import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";

const Home = () => {
  const [products, setProducts] = useState([]); // All products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState(""); // Search term
  const [selectedCategory, setSelectedCategory] = useState("All"); // Filter category
  const [sortOrder, setSortOrder] = useState("default"); // Sort order
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const [categories, setCategories] = useState([]); // Unique categories for filter

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products);
        setLoading(false);

        // Extract unique categories
        const uniqueCategories = [...new Set(data.products.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Unable to load products. Please try again later.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search and category
  const filteredProducts = products
    .filter(
      (p) =>
        (p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())) &&
        (selectedCategory === "All" || p.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortOrder === "low-high") return a.price - b.price;
      if (sortOrder === "high-low") return b.price - a.price;
      return 0;
    });

  // Pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading)
    return <p className="p-6 text-center text-gray-600">Loading products...</p>;

  if (error)
    return <p className="p-6 text-center text-red-600 font-semibold">{error}</p>;

  return (
    <>
      {/* Navbar */}
      <Navbar
        onSearch={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filter Component */}
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
          sortOrder={sortOrder}
          onSortChange={(order) => setSortOrder(order)}
        />

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : search || selectedCategory !== "All" ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No products found.
          </p>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            No products available.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {currentPage > 1 && (
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Back
              </button>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(
                Math.max(0, currentPage - 2),
                Math.min(totalPages, currentPage + 1)
              )
              .map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

            {currentPage < totalPages && (
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
