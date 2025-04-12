import React, { useState, useEffect } from "react";
import './Hero.css'

import slide1 from "../Components/Assets/slide-img1.png";
import slide2 from "../Components/Assets/slide-img2.png";
import slide3 from "../Components/Assets/slide-img3.jpg";
import slide4 from "../Components/Assets/slide-img4.jpg";

const images = [slide1, slide2, slide3, slide4];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider-container">
      {/* Slide Image */}
      <img src={images[currentIndex]} alt="slide" className="slide-image" />

      {/* Navigation Dots (Below the image) */}
      <div className="dots-wrapper">
        <div className="dots-container">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
