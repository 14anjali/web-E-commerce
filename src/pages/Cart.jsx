import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, total } = useContext(CartContext);

  if (cartItems.length === 0)
    return <p className="p-4 text-lg text-gray-600 text-center">🛒 Your cart is empty.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-6 border border-gray-200 shadow-sm p-4 rounded-lg hover:shadow-md transition"
          >
            <img
              src={item.thumbnail || item.images?.[0]}
              alt={item.title}
              className="w-28 h-28 object-cover rounded-lg border"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-lg text-gray-800">{item.title}</h2>
              <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
              <p className="text-gray-900 font-bold mt-1">${item.price}</p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                >
                  -
                </button>
                <span className="px-2 font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <h2 className="text-2xl font-bold text-gray-800">
          Total: <span className="text-blue-600">${total.toFixed(2)}</span>
        </h2>
      </div>
    </div>
  );
};

export default Cart;
