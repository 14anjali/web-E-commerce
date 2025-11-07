import React from "react";
// import Navbar from "../components/Navbar";

const ProductDetail = () => {
  const product = {
    title: "Essence Mascara Lash Princess",
    description:
      "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    price: 9.99,
    rating: 2.56,
    stock: 99,
    category: "beauty",
    brand: "Essence",
    sku: "BEA-ESS-ESS-001",
    images: [
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
    ],
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-96 object-cover rounded"
            />
          </div>
          <div className="md:w-1/2 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p>Rating: ⭐ {product.rating}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
            <p>Category: {product.category}</p>
            <p>Brand: {product.brand}</p>
            <p>SKU: {product.sku}</p>
            <p>Description: {product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
