import React, { useState } from "react";
import './Gallery.css'; // 👈 Importación del CSS
import { TopMenu } from "../components/ui/top-menu/TopMenu";
import { Sidebar } from "../components/ui/sidebar/Sidebar";

const images = [
  { id: 1, src: "/imagenesretirosemaus/uno.jpg", alt: "Imagen 1" },
  { id: 2, src: "/imagenesretirosemaus/dos.jpg", alt: "Imagen 2" },
  { id: 3, src: "/imagenesretirosemaus/tres.jpeg", alt: "Imagen 3" },
  { id: 4, src: "/imagenesretirosemaus/cuatro.jpeg", alt: "Imagen 4" },
  { id: 5, src: "/imagenesretirosemaus/cinco.jpeg", alt: "Imagen 5" },
  { id: 6, src: "/imagenesretirosemaus/seis.jpg", alt: "Imagen 6" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleNext = () => {
    if (selectedImage) {
      const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
      const nextIndex = (currentIndex + 1) % images.length;
      setSelectedImage(images[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (selectedImage) {
      const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      setSelectedImage(images[prevIndex]);
    }
  };

  return (
    <>
    <TopMenu />
    <Sidebar />
    <div className="gallery-container">
      <h3 className="gallery-title">Galería de Fotos de la Hermandad de Emaús</h3>
      <div className="gallery-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="gallery-image"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="gallery-modal">
          <button onClick={() => setSelectedImage(null)} className="gallery-close">×</button>
          <button onClick={handlePrev} className="gallery-prev">❮</button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="gallery-modal-image"
          />
          <button onClick={handleNext} className="gallery-next">❯</button>
        </div>
      )}
    </div>
    </>
  );
};

export default Gallery;
