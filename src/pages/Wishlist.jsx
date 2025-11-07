import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, addToCart, removeFromWishlist, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Track which wishlist products are in cart
  const [inCartMap, setInCartMap] = useState({});

  useEffect(() => {
    const map = {};
    wishlist.forEach((product) => {
      map[product.id] = cartItems.some((item) => item.id === product.id);
    });
    setInCartMap(map);
  }, [wishlist, cartItems]);

  if (wishlist.length === 0)
    return <p className="text-center text-gray-600 p-6">Your wishlist is empty.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {wishlist.map((product) => (
        <div
          key={product.id}
          className="bg-white border rounded-lg shadow hover:shadow-lg transition duration-300 flex flex-col overflow-hidden relative"
        >
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
            <span className="text-red-600 font-bold mb-3">${product.price}</span>

            {/* Buttons */}
            <div className="flex gap-2 mt-auto">
              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product, 1)}
                disabled={inCartMap[product.id]}
                className={`flex-1 py-2 px-4 rounded font-semibold text-white transition ${
                  inCartMap[product.id] ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {inCartMap[product.id] ? "Added" : "Add to Cart"}
              </button>

              {/* Remove from Wishlist */}
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="flex-1 p2 rounded font-semibold text-white bg-red-600 hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
