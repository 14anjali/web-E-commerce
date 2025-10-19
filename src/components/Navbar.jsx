import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MyStore</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
      </div>
    </nav>
  );
};

export default Navbar;
