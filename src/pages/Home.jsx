import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products.json"; // Make sure path is correct

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Simulate fetching from API
      // Shuffle products for randomness
      const randomProducts = [...productsData].sort(() => Math.random() - 0.5);
      setProducts(randomProducts);
      setLoading(false);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Unable to load products. Please try again later.");
      setLoading(false);
    }
  }, []);

  if (loading)
    return <p className="p-6 text-center text-gray-600">Loading products...</p>;

  if (error)
    return <p className="p-6 text-center text-red-600 font-semibold">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">🛍 Featured Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
