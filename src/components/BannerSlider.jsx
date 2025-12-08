import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BannerSlider({ banners }) {
  const [theme, setTheme] = useState("light"); // light or dark

  const settings = {
    dots: true,                 
    infinite: true,             
    speed: 500,                
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,            
    autoplaySpeed: 2000,       
    arrows: true,              
    pauseOnHover: true,        
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`w-full max-w-full mx-auto transition-colors duration-500 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
      
      {/* Theme Toggle Button */}
      <div className="flex justify-end p-2">
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded font-semibold transition ${
            theme === "dark" ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      {/* Banner Slider */}
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index}>
            <img
              src={banner.image}
              alt={banner.title || `banner-${index + 1}`}
              className="w-full h-64 md:h-96 object-cover"
              style={{
                filter: theme === "dark" ? "brightness(0.7)" : "brightness(1)",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
