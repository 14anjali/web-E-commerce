import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BannerSlider({ banners }) {
  const settings = {
    dots: true,                 // Show navigation dots
    infinite: true,             // Infinite loop
    speed: 500,                 // Slide transition speed
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,             // Auto slide
    autoplaySpeed: 2000,        // Every 2 seconds
    arrows: true,               // Show prev/next arrows
    pauseOnHover: true,         // Pause auto-slide on hover
  };

  return (
    <div className="w-full max-w-full mx-auto">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index}>
            <img
              src={banner.image}
              alt={banner.title || `banner-${index + 1}`}
              className="w-full h-64 md:h-96 object-cover rounded-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}