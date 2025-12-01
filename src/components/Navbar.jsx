import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const { cartItems, wishlist } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const wishlistCount = wishlist.length;

  return (
    <nav className="sticky top-0 z-50 bg-[#2874f0] flex items-center px-4 h-16 shadow">
      {/* Brand */}
      <div className="flex-shrink-0">
        <Link to="/" className="text-white font-extrabold text-2xl">
          MyStore
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex-1 flex justify-center mx-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full max-w-md px-3 py-2 rounded border-none focus:outline-none"
        />
      </div>

      {/* Wishlist & Cart */}
      <div className="flex items-center gap-6 flex-shrink-0 text-white font-medium">
        {/* Wishlist */}
        <Link to="/wishlist" className="relative hover:text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={wishlistCount > 0 ? "red" : "white"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={wishlistCount > 0 ? "red" : "white"}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* Cart */}
        <Link to="/cart" className="relative hover:text-gray-200 flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-12.938-.684l-.707-.707C3.374 16.252 3 15.664 3 15V5c0-1.104.896-2 2-2h14a2 2 0 0 1 2 2v10c0 .664-.374 1.252-.937 1.609l-.707.707A2.978 2.978 0 0 1 17 17H7c-.829 0-1.578-.335-2.121-.941zM5 7v8c0 .265.105.52.293.707l.707.707c.387.387.903.586 1.414.586h10c.511 0 1.027-.199 1.414-.586l.707-.707A.997.997 0 0 0 19 15V7H5zm2 2h10v6H7V9z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-yellow-400 text-[#2874f0] text-xs rounded-full px-2 font-bold">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
