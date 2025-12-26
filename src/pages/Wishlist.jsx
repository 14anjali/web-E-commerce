import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Wishlist = () => {
  const { wishlist, addToCart, removeFromWishlist, cartItems } =
    useContext(CartContext);
  const navigate = useNavigate();

  const [inCartMap, setInCartMap] = useState({});

  useEffect(() => {
    const map = {};
    wishlist.forEach((product) => {
      map[product.id] = cartItems.some(
        (item) => item.id === product.id
      );
    });
    setInCartMap(map);
  }, [wishlist, cartItems]);

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">
          Your Wishlist
        </h1>

        {wishlist.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg">
            <p className="text-2xl font-semibold mb-6">
              Your Wishlist is empty 😔
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          /* WISHLIST ITEMS */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-black dark:text-white">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow hover:shadow-lg transition flex flex-col overflow-hidden"
              >
                <img
                  src={product.thumbnail || product.images?.[0]}
                  alt={product.title}
                  className="h-48 w-full object-cover cursor-pointer"
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                />

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <span className="text-red-600 dark:text-red-400 font-bold mb-3">
                    ${product.price}
                  </span>

                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => addToCart(product, 1)}
                      disabled={inCartMap[product.id]}
                      className={`flex-1 py-2 px-4 rounded font-semibold ${
                        inCartMap[product.id]
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {inCartMap[product.id]
                        ? "Added"
                        : "Add to Cart"}
                    </button>

                    <button
                      onClick={() =>
                        removeFromWishlist(product.id)
                      }
                      className="flex-1 py-2 px-4 rounded font-semibold text-white bg-red-600 hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Wishlist;
