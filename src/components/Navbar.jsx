import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import ProductSearch from "./ProductSearch";

const Navbar = ({ onSearch }) => {
  const { cartItems, wishlist } = useContext(CartContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <nav className="bg-[#2874f0] sticky top-0 z-50 shadow">
      <div className="flex items-center px-4 h-16">

        {/* Brand */}
        <Link to="/" className="flex flex-col text-white">
          <span className="font-extrabold text-2xl leading-none">MyStore</span>
          <span className="text-xs italic">
            Explore <span className="text-yellow-300 font-bold">Plus</span>
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 flex justify-center mx-4">
          {location.pathname === "/" && (
            <ProductSearch onSearch={(val) => { setSearchTerm(val); onSearch?.(val); }} value={searchTerm} />
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-white">

          {/* Wishlist */}
          <Link to="/wishlist" className="relative">
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M12 21s-7.5-4.35-10-8.5C-0.5 7.5 3.5 3 8 5.5 10 6.8 12 9 12 9s2-2.2 4-3.5c4.5-2.5 8.5 2 6 7-2.5 4.15-10 8.5-10 8.5z"/>
            </svg>
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">{wishlist.length}</span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.2 14h9.9c.8 0 1.5-.5 1.8-1.2l3-7H6.2L5.4 2H2v2h2l3.6 7.6-1.3 2.4c-.7 1.3.3 3 1.9 3z"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-800 text-xs px-2 rounded-full font-bold">{cartCount}</span>
            )}
          </Link>

          {/* Orders */}
          <Link to="/orders">
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M21 7l-9-5-9 5v10l9 5 9-5V7zm-9 12.9L5 16V9.3l7 3.9v6.7zm1-6.7l7-3.9V16l-7 3.9v-6.7z"/>
            </svg>
          </Link>

          {/* Theme Toggle */}
          <button onClick={toggleTheme}>
            {darkMode ? (
              // Sun for dark mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx={12} cy={12} r={5} strokeLinecap="round" strokeLinejoin="round" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                />
              </svg>
            ) : (
              // Moon for light mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#2874f0] text-white px-4 pb-4 space-y-4">
          <Link onClick={() => setMenuOpen(false)} to="/wishlist">
            Wishlist ({wishlist.length})
          </Link>
          <Link onClick={() => setMenuOpen(false)} to="/cart">
            Cart ({cartCount})
          </Link>
          <Link onClick={() => setMenuOpen(false)} to="/orders">
            Orders
          </Link>
          <button onClick={toggleTheme}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
