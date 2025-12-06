import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  // Global search state for Navbar
  const [search, setSearch] = useState("");

  return (
    <ThemeProvider>
        <CartProvider>
      <Router>
        {/* Global Navbar */}
        <Navbar onSearch={setSearch} />

        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* 404 Page */}
          <Route
            path="*"
            element={<p className="p-6 text-center text-red-600">Page Not Found</p>}
          />
                    <Route path="/footer" element={<Footer />} />

        </Routes>
      </Router>
    </CartProvider>
        </ThemeProvider>
  );
}

export default App;
