import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const inCart = cartItems.some((item) => item.id === product.id);
  const inWishlist = wishlist.some((item) => item.id === product.id);
  const discountedPrice = (product.price * (1 - (product.discountPercentage || 0) / 100)).toFixed(2);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-lg transition-colors duration-300 flex flex-col overflow-hidden relative">
      {/* Product Image */}
      <img
        src={product.thumbnail || product.images?.[0]}
        alt={product.title}
        className="h-48 w-full object-cover cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      />

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-black dark:text-white">{product.title}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-red-600 dark:text-red-400 font-bold">${discountedPrice}</span>
          {product.discountPercentage > 0 && (
            <span className="line-through text-gray-500 dark:text-gray-400 text-sm">${product.price}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product, 1)}
            disabled={inCart}
            className={`flex-1 py-2 px-4 rounded font-semibold transition-colors duration-300 ${
              inCart
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white"
                : "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white"
            }`}
          >
            {inCart ? "Added" : "Add to Cart"}
          </button>

          {/* Wishlist Toggle */}
          <button
            onClick={() => toggleWishlist(product)}
            className={`flex-1 py-2 px-4 rounded font-semibold transition-colors duration-300 ${
              inWishlist
                ? "bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {inWishlist ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
