import React from 'react';
import { useState, useEffect } from "react";
import './slideshow.css'



const images = [
  'https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746805917/cmb8lr7umreo2tjbjn8m.jpg',
  'https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790825/galeria_fotos_emaus/blo7ab87qwhoz7wkdmuk.jpg',
 "https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790825/galeria_fotos_emaus/fsp9sdrbwoozdb8fpbed.jpg",
 'https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790824/galeria_fotos_emaus/apltx2tninjvwjxrichy.jpg',


];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="slideshow-container">
      <button onClick={prevSlide} className="slideshow-button left-button">
        ◀
      </button>

      <div className="slideshow-image-container">
        <img
          src={images[currentIndex]}
          alt="Galería Emaús"
          className="slideshow-image"
        />
      </div>

      <button onClick={nextSlide} className="slideshow-button right-button">
        ▶
      </button>

      <div className="slideshow-progress-bar"></div>
    </div>
  );
};

export default Slideshow;
