import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate discounted price
  const discountedPrice = (
    product.price *
    (1 - (product.discountPercentage || 0) / 100)
  ).toFixed(2);

  // Average rating
  const avgRating = product.reviews?.length
    ? (
        product.reviews.reduce((sum, r) => sum + r.rating, 0) /
        product.reviews.length
      ).toFixed(1)
    : product.rating || "N/A";

  return (
    <div className="bg-white border rounded-lg shadow hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.thumbnail || product.images[0]}
          alt={product.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Discount Badge */}
        {product.discountPercentage && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            -{product.discountPercentage}%
          </span>
        )}
        {/* Category Badge */}
        {product.category && (
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded capitalize">
            {product.category}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-semibold text-lg line-clamp-2">{product.title}</h2>

        <div className="mt-1 flex items-center space-x-2">
          <span className="text-red-500 font-bold text-lg">${discountedPrice}</span>
          {product.discountPercentage && (
            <span className="line-through text-gray-400">${product.price}</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 font-semibold mr-2">⭐ {avgRating}</span>
          <span className="text-gray-500 text-sm">({product.reviews?.length || 0})</span>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Add to Cart
          </button>
          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition-colors duration-300"
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
