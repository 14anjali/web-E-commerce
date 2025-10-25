import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 w-full object-cover mb-2"
      />
      <h2 className="font-bold text-lg">{product.title}</h2>
      <p className="text-gray-700">${product.price}</p>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => addToCart(product, 1)}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>

        <Link
          to={`/product/${product.id}`}
          className="bg-gray-800 text-white px-4 py-1 rounded hover:bg-gray-900"
        >
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
