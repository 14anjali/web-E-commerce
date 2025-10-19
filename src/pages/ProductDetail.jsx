import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products.json";
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-4">
      <div className="md:flex md:gap-6">
        <img src={product.image} alt={product.title} className="w-full md:w-1/2 h-80 object-cover"/>
        <div className="mt-4 md:mt-0">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-xl font-semibold mt-2">${product.price}</p>
          <div className="mt-4 flex items-center gap-2">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-2 bg-gray-200 rounded">-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="px-2 bg-gray-200 rounded">+</button>
          </div>
          <button
            onClick={() => addToCart(product, quantity)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
