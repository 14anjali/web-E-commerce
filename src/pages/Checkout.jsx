import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, total, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add validation here
    alert("Order placed successfully!");
    // Clear cart after order
    cartItems.forEach(item => removeFromCart(item.id));
    navigate("/"); // redirect to home
  };

  if (cartItems.length === 0) {
    return <p className="text-center p-6">Your cart is empty.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Cart Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.title} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-4">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Shipping & Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping Details</h2>
        <input type="text" name="name" placeholder="Full Name" className="w-full border rounded px-3 py-2" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="w-full border rounded px-3 py-2" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" className="w-full border rounded px-3 py-2" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" className="w-full border rounded px-3 py-2" onChange={handleChange} required />
        <input type="text" name="zip" placeholder="ZIP Code" className="w-full border rounded px-3 py-2" onChange={handleChange} required />

        <h2 className="text-xl font-semibold mt-4">Payment Details</h2>
        <input type="text" name="cardNumber" placeholder="Card Number" className="w-full border rounded px-3 py-2" onChange={handleChange} required />
        <div className="flex gap-2">
          <input type="text" name="expiry" placeholder="MM/YY" className="w-1/2 border rounded px-3 py-2" onChange={handleChange} required />
          <input type="text" name="cvv" placeholder="CVV" className="w-1/2 border rounded px-3 py-2" onChange={handleChange} required />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
