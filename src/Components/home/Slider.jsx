import React, { useState } from "react";
import "./Slider.css";
import { Link } from "react-router-dom";

const images = [
  { url: "images/cover1.jpg", alt: "project 1" },
  { url: "images/cover2.jpg", alt: "project 2" },
  { url: "images/cover3.jpg", alt: "project 3" },
];

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div id="cover" className="slider-container container">
      <div className="text-section d-flex flex-column flex-center ps-2">
        <h1 className="mt-5">
          ابدأ بتحضير منشآتك باستخدام منصة بناءك <br />
          <span className="highlight"> BS </span>
        </h1>
        <Link to="add-project" className="btn main-btn mt-3">
          ابدأ مشروعك
        </Link>
      </div>
      <div className="slider-wrapper">
        <div className="img-wrapper">
          <img
            key={images[activeIndex].url}
            src={images[activeIndex].url}
            alt={images[activeIndex].alt}
            className="slider-image fade-in"
          />

          <div className="dots-wrapper">
            {images.map((img, i) => (
              <div
                key={i}
                className={`dot ${activeIndex === i ? "active" : ""}`}
                onClick={() => setActiveIndex(i)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
