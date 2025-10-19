import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, total } = useContext(CartContext);

  if (cartItems.length === 0) return <p className="p-4">Cart is empty.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border p-2 rounded">
            <img src={item.image} alt={item.title} className="w-24 h-24 object-cover"/>
            <div className="flex-1">
              <h2 className="font-bold">{item.title}</h2>
              <p>${item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-2 bg-gray-200 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 bg-gray-200 rounded">+</button>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Remove</button>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mt-4">Total: ${total.toFixed(2)}</h2>
    </div>
  );
};

export default Cart;
