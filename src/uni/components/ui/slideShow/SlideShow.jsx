import { useState, useEffect } from "react";
import './slideshow.css'
import m0 from '../../../pages/galeria_fotos_emaus/img-4.jpeg'
import m4 from '../../../pages/galeria_fotos_emaus/img-4.jpeg'
import m11 from '../../../pages/galeria_fotos_emaus/img-11.jpeg'
import m14 from '../../../pages/galeria_fotos_emaus/img-14.jpeg'
import m15 from '../../../pages/galeria_fotos_emaus/img-15.jpeg'
import m16 from '../../../pages/galeria_fotos_emaus/img-16.jpeg'
import m17 from '../../../pages/galeria_fotos_emaus/img-17.jpeg'
import m18 from '../../../pages/galeria_fotos_emaus/img-18.jpeg'
import m19 from '../../../pages/galeria_fotos_emaus/img-19.jpeg'
import m20 from '../../../pages/galeria_fotos_emaus/img-20.jpeg'


const images = [
  m0,
  m4,
  m11,
  m14,
  m15,
  m16,
  m17,
  m18,
  m19,
  m20

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
