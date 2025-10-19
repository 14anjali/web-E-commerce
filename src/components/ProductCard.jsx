import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 w-full object-cover mb-2"
      />
      <h2 className="font-bold">{product.title}</h2>
      <p className="text-gray-700">${product.price}</p>
      <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
