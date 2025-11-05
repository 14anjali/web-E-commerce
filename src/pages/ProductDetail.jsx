import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);

  const { cartItems, addToCart } = useContext(CartContext);

  // ✅ Fetch product details
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load product.");
        setLoading(false);
      });
  }, [id]);

  // ✅ Check if product is already in cart
  useEffect(() => {
    if (product) {
      const exists = cartItems.some((item) => item.id === product.id);
      setInCart(exists);
    }
  }, [cartItems, product]);

  if (loading)
    return <p className="p-6 text-center text-gray-600">Loading product...</p>;
  if (error)
    return <p className="p-6 text-center text-red-600 font-semibold">{error}</p>;
  if (!product) return null;

  const discountedPrice = (
    product.price *
    (1 - (product.discountPercentage || 0) / 100)
  ).toFixed(2);

  // ✅ Add to Cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setInCart(true);
  };

  // ✅ Buy Now → add and go to cart
  const handleBuyNow = () => {
    addToCart(product, quantity);
    setInCart(true);
    navigate("/cart");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Product Images */}
          <div className="md:w-1/2 flex flex-col gap-2">
            <img
              src={product.thumbnail || product.images[0]}
              alt={product.title}
              id="main-img"
              className="w-full h-96 object-cover rounded"
            />
            <div className="flex gap-2 overflow-x-auto mt-2">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.title}-${idx}`}
                  className="h-20 w-20 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
                  onClick={(e) =>
                    (document.querySelector("#main-img").src = e.target.src)
                  }
                />
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-yellow-500 font-semibold">
              ⭐ {product.rating || "N/A"}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-2xl text-red-500 font-bold">
                ${discountedPrice}
              </span>
              {product.discountPercentage && (
                <span className="line-through text-gray-400 text-lg">
                  ${product.price}
                </span>
              )}
            </div>

            <p className="text-gray-600">
              Category: <span className="capitalize">{product.category}</span>
            </p>
            <p className="text-gray-600">
              Availability:{" "}
              <span
                className={
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <p className="text-gray-700">{product.description}</p>

            {/* ✅ Buttons Section */}
            <div className="flex gap-4 mt-4">
              {inCart ? (
                <button
                  onClick={() => navigate("/cart")}
                  className="flex-1 bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
                >
                  Go to Cart
                </button>
              ) : (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition"
                  >
                    Buy Now
                  </button>
                </>
              )}
            </div>

            {/* Quantity Control (optional, visible only after adding) */}
            {inCart && (
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  className="bg-gray-200 px-3 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="bg-gray-200 px-3 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            )}

            {/* Show More Details */}
            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition w-fit"
            >
              {showMore ? "Hide Details" : "Show More Details"}
            </button>

            {showMore && (
              <div className="mt-4 border-t pt-4 text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <p><span className="font-medium">Brand:</span> {product.brand}</p>
                <p><span className="font-medium">Weight:</span> {product.weight}g</p>
                <p>
                  <span className="font-medium">Dimensions:</span>{" "}
                  {product.dimensions?.width} x {product.dimensions?.height} x{" "}
                  {product.dimensions?.depth} cm
                </p>
                <p><span className="font-medium">Warranty:</span> {product.warrantyInformation}</p>
                <p><span className="font-medium">Shipping:</span> {product.shippingInformation}</p>
                <p><span className="font-medium">Return Policy:</span> {product.returnPolicy}</p>
                <p><span className="font-medium">Minimum Order:</span> {product.minimumOrderQuantity}</p>
                <p><span className="font-medium">SKU:</span> {product.sku}</p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4 shadow hover:shadow-md transition bg-white"
                >
                  <p className="font-semibold text-lg text-yellow-500">
                    ⭐ {review.rating}/5
                  </p>
                  <p className="text-gray-700 mt-2 italic">"{review.comment}"</p>
                  <div className="mt-3 text-sm text-gray-500">
                    <p className="font-medium text-gray-800">
                      {review.reviewerName}
                    </p>
                    <p>{new Date(review.date).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-400">
                      {review.reviewerEmail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
