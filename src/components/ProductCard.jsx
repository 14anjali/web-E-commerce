import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  // Convert USD to INR (1 USD ≈ ₹83)
  const priceInINR = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price * 83);

  return (
    <div className="border rounded-lg shadow hover:shadow-xl transition duration-300 bg-white flex flex-col">
      {/* Image Container */}
      <div className="flex justify-center items-center bg-gray-100 h-64 overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-full w-full p-4"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <h2
          className="font-semibold text-lg mb-2 line-clamp-2"
          title={product.title}
        >
          {product.title}
        </h2>

        <p className="text-gray-700 font-medium mb-4">{priceInINR}</p>

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={() => addToCart(product, 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex-1 transition"
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>

          <Link
            to={`/product/${product.id}`}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 flex-1 text-center transition"
            aria-label={`View details of ${product.title}`}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
