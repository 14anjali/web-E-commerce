import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Check if product is already in cart
  const inCart = cartItems.some((item) => item.id === product.id);

  // Check if product is in wishlist
  const inWishlist = wishlist.some((item) => item.id === product.id);

  const discountedPrice = (
    product.price * (1 - (product.discountPercentage || 0) / 100)
  ).toFixed(2);

  return (
    <div className="bg-white border rounded-lg shadow hover:shadow-lg transition duration-300 flex flex-col overflow-hidden relative">
      {/* Product Image */}
      <img
        src={product.thumbnail || product.images?.[0]}
        alt={product.title}
        className="h-48 w-full object-cover cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      />

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-red-600 font-bold">${discountedPrice}</span>
          {product.discountPercentage > 0 && (
            <span className="line-through text-gray-500 text-sm">${product.price}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product, 1)}
            disabled={inCart}
            className={`flex-1 py-2 px-4 rounded font-semibold text-white transition ${
              inCart ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {inCart ? "Added" : "Add to Cart"}
          </button>

          {/* Wishlist Toggle */}
          <button
            onClick={() => toggleWishlist(product)}
            className={`flex-1 py-2 px-4 rounded font-semibold transition text-white ${
              inWishlist ? "bg-red-600 hover:bg-red-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
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
