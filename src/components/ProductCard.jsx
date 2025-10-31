import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(0);

  // Check if product is in cart
  useEffect(() => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [cartItems, product.id]);

  // Discounted price
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

  // Add product to cart
  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) updateQuantity(product.id, quantity - 1);
  };

  return (
    <div className="bg-white border rounded-lg shadow hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.thumbnail || product.images[0]}
          alt={product.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.discountPercentage && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            -{product.discountPercentage}%
          </span>
        )}
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

        {/* Buttons & Counter */}
        <div className="mt-4 flex items-center gap-2">
          {/* Add / Added button */}
          <button
            onClick={quantity === 0 ? handleAddToCart : () => {}}
            className={`flex-1 py-2 px-4 rounded font-semibold text-white transition-colors duration-300 ${
              quantity === 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500 cursor-default"
            }`}
          >
            {quantity === 0 ? "Add to Cart" : "Added"}
          </button>

          {/* Counter (only visible after adding) */}
          {quantity > 0 && (
            <div className="flex items-center gap-2 border rounded px-2">
              <button
                onClick={handleDecrease}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={handleIncrease}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          )}

          {/* View Product */}
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
