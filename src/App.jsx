import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <CartProvider>
      <Router>
  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* 404 Page */}
          <Route path="*" element={<p className="p-6 text-center text-red-600">Page Not Found</p>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
