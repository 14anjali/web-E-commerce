import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load product.");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className="p-6 text-center text-gray-600">Loading product...</p>;

  if (error)
    return (
      <p className="p-6 text-center text-red-600 font-semibold">{error}</p>
    );

  if (!product) return null;

  const discountedPrice = (
    product.price *
    (1 - (product.discountPercentage || 0) / 100)
  ).toFixed(2);

  const avgRating = product.reviews?.length
    ? (
        product.reviews.reduce((sum, r) => sum + r.rating, 0) /
        product.reviews.length
      ).toFixed(1)
    : product.rating || "N/A";

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Gallery */}
        <div className="md:w-1/2 flex flex-col gap-2">
          <img
            src={product.thumbnail || product.images[0]}
            alt={product.title}
            className="w-full h-96 object-cover rounded"
          />
          <div className="flex gap-2 overflow-x-auto mt-2">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.title}-${idx}`}
                className="h-20 w-20 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
                onClick={(e) =>
                  (document.querySelector("#main-img").src = e.target.src)
                }
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          {/* Rating */}
          <p className="text-yellow-500 font-semibold">
            ⭐ {avgRating} ({product.reviews?.length || 0} reviews)
          </p>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-2xl text-red-500 font-bold">
              ${discountedPrice}
            </span>
            {product.discountPercentage && (
              <span className="line-through text-gray-400 text-lg">
                ${product.price}
              </span>
            )}
          </div>

          {/* Stock & Category */}
          <p className="text-gray-600">
            Category: <span className="capitalize">{product.category}</span>
          </p>
          <p className="text-gray-600">
            Availability:{" "}
            <span
              className={
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </p>

          {/* Description */}
          <p className="text-gray-700">{product.description}</p>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300 w-40 mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
