import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useLocation } from "react-router-dom";
import ProductSearch from "./ProductSearch";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = ({ onSearch }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { cartItems, wishlist } = useContext(CartContext);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  return (
    <nav className="bg-[#2874f0] sticky top-0 z-50 shadow">
      <div className="flex items-center px-4 h-16">

        {/* Left: Brand */}
        <Link to="/" className="flex flex-col justify-center text-white">
          <span className="font-extrabold text-2xl leading-none">MyStore</span>
          <span className="text-xs italic">
            Explore <span className="text-yellow-300 font-bold">Plus</span>
          </span>
        </Link>

        {/* Center: Search */}
        <div className="flex-1 flex justify-center mx-4">
          {location.pathname === "/" && (
            <ProductSearch onSearch={handleSearch} value={searchTerm} />
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-white font-medium">

          {/* Wishlist */}
          <Link to="/wishlist" className="relative">
            ❤️
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-yellow-400 text-[#2874f0] text-xs px-2 rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Orders */}
          <Link to="/orders">📦</Link>

          {/* Theme Toggle */}
          <button onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#2874f0] text-white px-4 pb-4 space-y-4">
            <ul>
            <li className="m-2"> <Link onClick={() => setMenuOpen(false)} to="/wishlist">
            Wishlist ({wishlist.length})
          </Link></li>

          <li className="m-2" ><Link onClick={() => setMenuOpen(false)} to="/cart">
            Cart ({cartCount})
          </Link></li>

          <li className="m-2"><Link onClick={() => setMenuOpen(false)} to="/orders">
            Orders
          </Link></li>
            </ul>
        

          <button
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
          >
            {theme === "light" ? "Dark Mode 🌙" : "Light Mode ☀️"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
