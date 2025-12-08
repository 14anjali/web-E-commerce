import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, total, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Form state (only shipping details)
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  // Handle input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle Buy Now button
  const handleBuyNow = (e) => {
    e.preventDefault();
    alert(
      `Order placed successfully!\nA confirmation email has been sent to ${form.email}`
    );
    // Clear cart after order
    cartItems.forEach((item) => removeFromCart(item.id));
    navigate("/"); // redirect to home
  };

  if (cartItems.length === 0)
    return <p className="text-center p-6">Your cart is empty.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-6">
      {/* -----------------------------
          Left: Cart Summary
      ----------------------------- */}
      <div className="md:w-1/2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Order Summary
        </h2>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between text-gray-700 dark:text-gray-300"
          >
            <span>
              {item.title} x {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-4 text-gray-900 dark:text-gray-100">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* -----------------------------
          Right: Shipping Form
      ----------------------------- */}
      <form
        onSubmit={handleBuyNow}
        className="md:w-1/2 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg space-y-4"
      >
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Shipping Details
        </h2>

        {["name", "email", "address", "city", "zip"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            onChange={handleChange}
            required
          />
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 dark:bg-green-500 text-white py-3 rounded hover:bg-green-700 dark:hover:bg-green-600 transition"
        >
          Buy Now
        </button>
      </form>
    </div>
  );
};

export default Checkout;
