import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from Fake Store API
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        // Shuffle products for randomness
        const randomProducts = data.sort(() => 0.5 - Math.random());
        setProducts(randomProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading products...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
