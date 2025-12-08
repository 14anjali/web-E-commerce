import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, total } = useContext(CartContext);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-2xl font-semibold mb-6">Your cart is empty 😔</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Products */}
        <div className="flex-1 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row justify-between border rounded-lg p-4 shadow hover:shadow-lg transition bg-white dark:bg-gray-800"
            >
              <div className="flex items-center gap-4 w-full md:w-1/2">
                <img
                  src={item.thumbnail || item.images?.[0]}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex flex-col">
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">${item.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity > 1 ? item.quantity - 1 : 1)
                  }
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  -
                </button>
                <span className="px-2 font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  +
                </button>
              </div>

              {/* Total & Remove */}
              <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
                <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 dark:text-red-400 hover:underline font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className="w-full md:w-1/3 border rounded-lg p-6 shadow bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.title} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-4 text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
