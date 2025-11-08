import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { cartItems, wishlist } = useContext(CartContext);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <nav className="bg-[#2874f0] flex items-center px-4 h-16 shadow sticky top-0 z-50">
      {/* Brand */}
      <Link to="/" className="flex flex-col justify-center mr-4 flex-shrink-0">
        <span className="text-white font-extrabold text-2xl leading-none">MyStore</span>
        <span className="text-xs text-gray-100 italic leading-none font-medium">
          Explore <span className="text-yellow-300 font-bold">Plus</span>
        </span>
      </Link>

      {/* Right Links */}
      <div className="flex items-center gap-6 ml-auto flex-shrink-0 text-white font-medium">
        <Link to="/login" className="hover:underline">
          Login
        </Link>

        {/* Wishlist Link */}
        <Link to="/wishlist" className="relative hover:underline flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
            fill={wishlistCount > 0 ? "red" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 21.364 4.318 12.682a4.5 4.5 0 0 1 0-6.364z"
            />
          </svg>
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* Cart Link */}
        <Link to="/cart" className="relative hover:underline flex items-center gap-1">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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
