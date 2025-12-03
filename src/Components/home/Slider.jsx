import React, { useState } from "react";
import "./Slider.css"; 
import { Link } from "react-router-dom";

const images = [
  {
    url: "images/cover1.jpg",
    alt: "project 1",
  },
  {
    url: "images/cover2.jpg",
    alt: "project 2",
  },
  {
    url: "images/cover3.jpg",
    alt: "project 3",
  },
];

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div id="cover" className="slider-container container main-container">
      <div className="text-section d-flex flex-column flex-center">
        <h1 className="title">
          أبدأ بتجهيز منشاتك مع منصة بناءك <br />
          <span className="highlight "> BS </span>
        </h1>
        <Link to="add-project" className="btn main-btn mt-3">ابدأ مشروعك</Link>
      </div>
      <div className="slider-wrapper">
        <div className="slider-section text-end">
          <img
            key={images[activeIndex].url} // مهم لل-transition
            src={images[activeIndex].url}
            alt={images[activeIndex].alt}
            className="slider-image fade-in"
          />
          <div className="dots-wrapper">
            {images.map((img, index) => (
              <div
                key={index}
                className={`dot ${activeIndex === index ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
