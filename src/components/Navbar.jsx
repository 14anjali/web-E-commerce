import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import ProductSearch from "./ProductSearch";

const Navbar = ({ onSearch }) => {
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-[#2874f0] flex items-center px-4 h-16 shadow">
      {/* Brand */}
      <Link to="/" className="flex flex-col justify-center mr-4 flex-shrink-0">
        <span className="text-white font-extrabold text-2xl leading-none">
          MyStore
        </span>
        <span className="text-xs text-gray-100 italic leading-none font-medium">
          Explore <span className="text-yellow-300 font-bold">Plus</span>
        </span>
      </Link>

      {/* Search Bar */}
      <div className="flex-1 flex items-center">
        {/* Pass onSearch callback from Home to ProductSearch */}
        <ProductSearch onSearch={onSearch} isNavbar={true} />
      </div>

      {/* Right Links */}
      <div className="flex items-center gap-6 ml-4 flex-shrink-0 text-white font-medium">
        <Link to="/login" className="hover:underline">
          Login
        </Link>

        <Link
          to="/cart"
          className="relative hover:underline flex items-center gap-1"
        >
          {/* Cart Icon */}
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
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
