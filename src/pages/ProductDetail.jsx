import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, wishlist, toggleWishlist } = useContext(CartContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [reviews, setReviews] = useState([]);

  const inWishlist = product ? wishlist.some((item) => item.id === product.id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.images?.[0] || data.thumbnail);

        // Dummy reviews (replace with API if available)
        setReviews([
          {
            reviewerName: "Eleanor Collins",
            reviewerEmail: "eleanor.collins@x.dummyjson.com",
            rating: 3,
            comment: "Would not recommend!",
            date: "2025-04-30T09:41:02.053Z",
          },
          {
            reviewerName: "Alice Smith",
            reviewerEmail: "alice.smith@x.dummyjson.com",
            rating: 5,
            comment: "Excellent product!",
            date: "2025-04-25T12:30:00.000Z",
          },
        ]);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading product...</p>;
  if (!product) return <p className="p-6 text-center text-red-500">Product not found.</p>;

  const discountedPrice = (
    product.price *
    (1 - (product.discountPercentage || 0) / 100)
  ).toFixed(2);

  return (
    <>
    
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Images and Wishlist */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-96 object-cover rounded"
            />

            {/* Thumbnails */}
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumbnail-${idx}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                    selectedImage === img ? "border-blue-600" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`px-4 py-2 rounded font-semibold transition mt-2 ${
                inWishlist
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {inWishlist ? "Remove from Wishlist ❤️" : "Add to Wishlist 🤍"}
            </button>
          </div>

          {/* Right: Product Info */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-600">({product.rating.toFixed(2)})</span>
            </div>

            {/* Price & Discount */}
            <div className="flex items-center gap-2 text-xl font-bold text-red-600">
              <span>${discountedPrice}</span>
              {product.discountPercentage > 0 && (
                <span className="line-through text-gray-500 text-lg">${product.price}</span>
              )}
              {product.discountPercentage > 0 && (
                <span className="text-green-600 font-semibold">{product.discountPercentage}% off</span>
              )}
            </div>

            {/* Stock & Delivery */}
            <p>{product.stock > 0 ? "In Stock ✅" : "Out of Stock ❌"}</p>
            <p className="text-gray-700">Delivery: Usually delivered in 3-5 business days</p>

            {/* Add to Cart / Buy Now */}
            <div className="flex gap-2">
              <button
                onClick={() => addToCart(product, 1)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product, 1);
                  navigate("/cart");
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Buy Now
              </button>
            </div>

            {/* More Details */}
            <div className="mt-4">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
              >
                {showDetails ? "Hide Details ▲" : "More Details ▼"}
              </button>
              {showDetails && (
                <div className="mt-2 p-4 border rounded bg-gray-50 space-y-1">
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Brand:</strong> {product.brand}</p>
                  <p><strong>SKU:</strong> {product.sku || "N/A"}</p>
                  <p><strong>Stock:</strong> {product.stock}</p>
                  <p><strong>Discount:</strong> {product.discountPercentage || 0}%</p>
                  <p><strong>Rating Count:</strong> {product.ratingCount || "N/A"}</p>
                </div>
              )}
            </div>

            {/* Customer Reviews */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
              {reviews.length === 0 ? (
                <p className="text-gray-600">No reviews yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((r, idx) => (
                    <div
                      key={idx}
                      className="border rounded-lg p-4 shadow hover:shadow-md transition flex flex-col gap-2 bg-white"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="font-semibold">{r.reviewerName || r.user}</span>
                          <span className="text-gray-500 text-sm">
                            {r.reviewerEmail || "N/A"}
                          </span>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={i < r.rating ? "text-yellow-400" : "text-gray-300"}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mt-1">{r.comment}</p>
                      <p className="text-gray-400 text-sm">
                        {r.date ? new Date(r.date).toLocaleDateString() : ""}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
