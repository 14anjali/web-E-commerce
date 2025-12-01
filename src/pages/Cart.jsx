import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, total } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <p className="text-2xl font-semibold mb-6">Your cart is empty 😔</p>
        <Link to="/">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
 
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>

      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center md:items-start justify-between border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4 w-full md:w-1/2">
              <img
                src={item.thumbnail || item.images?.[0]}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex flex-col">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <button
                onClick={() =>
                  updateQuantity(item.id, item.quantity > 1 ? item.quantity - 1 : 1)
                }
                className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="px-2 font-semibold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>

            {/* Total & Remove */}
            <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
              <p className="font-bold text-lg">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:underline font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total & Checkout */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center md:items-end gap-4 md:gap-0 p-4 border-t border-gray-300">
        <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
        <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300">
          Checkout
        </button>
      </div>
    </div></>
  );
};

export default Cart;
