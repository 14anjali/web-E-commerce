import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, wishlist, toggleWishlist } = useContext(CartContext);
  const navigate = useNavigate();

  const [inCart, setInCart] = useState(false);

  // Check if product already in cart
  useEffect(() => {
    const isAlreadyInCart = cartItems.some((item) => item.id === product.id);
    setInCart(isAlreadyInCart);
  }, [cartItems, product.id]);

  // Check if product is in wishlist
  const inWishlist = wishlist.some((item) => item.id === product.id);

  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, 1);
    setInCart(true);
  };

  return (
    <div className="bg-white border rounded-lg shadow hover:shadow-lg transition duration-300 flex flex-col overflow-hidden relative">
      {/* Clickable Product Image */}
      <img
        src={product.thumbnail || product.images?.[0]}
        alt={product.title}
        className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      />

      {/* Wishlist Heart */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-2 right-2 text-xl sm:text-2xl transition-colors"
      >
        {inWishlist ? "❤️" : "🤍"}
      </button>

      {/* Product Info */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-1 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm md:text-base mb-2 line-clamp-2">
          {product.description}
        </p>
        <span className="text-red-600 font-bold mb-3 text-sm sm:text-base md:text-lg">
          ${product.price}
        </span>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
          {/* Add / Added Button */}
          <button
            onClick={!inCart ? handleAddToCart : undefined}
            disabled={inCart}
            className={`flex-1 py-2 px-4 rounded font-semibold text-white transition ${
              inCart
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {inCart ? "Added" : "Add to Cart"}
          </button>

          {/* View Product / Go to Cart Button */}
          <button
            onClick={() =>
              inCart ? navigate("/cart") : navigate(`/product/${product.id}`)
            }
            className={`flex-1 py-2 px-4 rounded font-semibold transition ${
              inCart
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {inCart ? "Go to Cart" : "View Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
