import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";
import Loader from "../components/Loader"; // ✅ ADD THIS

const Home = ({ search }) => {
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [categories, setCategories] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // ✅ start loader
        const res = await fetch("https://dummyjson.com/products?limit=1000");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        setProducts(data.products);
        const shuffled = [...data.products].sort(() => 0.5 - Math.random());
        setDisplayProducts(shuffled.slice(0, 20));

        const uniqueCategories = [
          ...new Set(data.products.map(p => p.category?.trim()).filter(Boolean))
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false); // ✅ stop loader
      }
    };

    fetchProducts();
  }, []);

  // Show Loader
  if (loading) return <Loader />;

  //  Show error
  if (error)
    return (
      <p className="p-6 text-center text-red-600 font-semibold">
        {error}
      </p>
    );

  // Filter & sort
  const filteredProducts = displayProducts
    .filter(p => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "low-high") return a.price - b.price;
      if (sortOrder === "high-low") return b.price - a.price;
      return 0;
    });

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const bannerUrls = [
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/grocery-sale-retail-or-e-commerce-banner-ad-design-template-67720435bb809be27f46dfb1dd44c6fa_screen.jpg?ts=1606113265",
    "https://static.vecteezy.com/system/resources/thumbnails/002/006/774/small/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/006/642/998/small/online-shopping-on-website-e-commerce-applications-and-digital-marketing-hand-holding-smartphonwith-the-delivery-man-template-for-banner-web-landing-page-social-media-flat-design-concept-vector.jpg"
  ];

  return (
    <div className="w-full">
      {/* Banner */}
      <Slider {...sliderSettings}>
        {bannerUrls.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`Banner ${idx + 1}`}
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
        ))}
      </Slider>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 mx-auto">
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
          sortOrder={sortOrder}
          onSortChange={(order) => setSortOrder(order)}
        />

        {currentProducts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            No products found.
          </p>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded font-semibold ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              &lt;
            </button>

            <button
              onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded font-semibold ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              &gt;
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
