import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=1000");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products);
        setLoading(false);

        const uniqueCategories = [...new Set(data.products.map((p) => p.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err);
        setError("Unable to load products. Please try again later.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((p) => {
      const matchesCategory =
        selectedCategory === "All" ? true : p.category === selectedCategory;
      const matchesSearch =
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
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  if (loading)
    return <p className="p-6 text-center text-gray-600">Loading products...</p>;
  if (error)
    return <p className="p-6 text-center text-red-600 font-semibold">{error}</p>;

  return (
    <>
      <Navbar onSearch={(value) => { setSearch(value); setCurrentPage(1); }} />

      <div className="w-full">
        {/* Slider / Banner */}
        <div className="w-full mb-6 mt-2">
          <Slider {...sliderSettings}>
            <div>
              <img
                src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/grocery-sale-retail-or-e-commerce-banner-ad-design-template-67720435bb809be27f46dfb1dd44c6fa_screen.jpg?ts=1606113265"
                alt="Banner 1"
                className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
              />
            </div>
            <div>
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/002/006/774/small/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg"
                alt="Banner 2"
                className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
              />
            </div>
            <div>
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/006/642/998/small/online-shopping-on-website-e-commerce-applications-and-digital-marketing-hand-holding-smartphonwith-the-delivery-man-template-for-banner-web-landing-page-social-media-flat-design-concept-vector.jpg"
                alt="Banner 3"
                className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
              />
            </div>
          </Slider>
        </div>

        {/* Filter Component */}
        <div className="px-4 sm:px-6 lg:px-8 flex-row">
          <Filter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => { setSelectedCategory(cat); setCurrentPage(1); }}
            sortOrder={sortOrder}
            onSortChange={(order) => setSortOrder(order)}
          />
        </div>

        {/* Products Grid */}
        <div className="px-4 sm:px-6 lg:px-8 mt-6">
          {currentProducts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="transition-transform transform hover:scale-105 hover:shadow-2xl"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg mt-10">
              No products found.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2 px-4 sm:px-6 lg:px-8">
            {currentPage > 1 && (
              <button
                onClick={() => goToPage(currentPage - 1)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 font-semibold"
              >
                &lt;
              </button>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
              .map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 rounded ${
                    currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                  } font-semibold`}
                >
                  {page}
                </button>
              ))}

            {currentPage < totalPages && (
              <button
                onClick={() => goToPage(currentPage + 1)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 font-semibold"
              >
                &gt;
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
