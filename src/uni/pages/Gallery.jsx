import React, { useState } from "react";
import './Gallery.css'; // 👈 Importación del CSS
import { TopMenu } from "../components/ui/top-menu/TopMenu";
import { Sidebar } from "../components/ui/sidebar/Sidebar";

const images = [
  { id: 1, src: "https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790852/imagenesretirosemaus/yq89nxuntmouwfkuveqj.jpg", alt: "Imagen 1" },
  { id: 2, src: "https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790853/imagenesretirosemaus/kuk2j1mzuxcfmv818lj4.jpg", alt: "Imagen 2" },
  { id: 3, src: "https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790853/imagenesretirosemaus/zcxwc3bh3psyikhmgx6d.jpg", alt: "Imagen 3" },
  { id: 4, src: "https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790851/imagenesretirosemaus/vamitewpovwpdlw4emzw.jpg", alt: "Imagen 4" },
  { id: 5, src: "https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790851/imagenesretirosemaus/dcr0spbgwtmzalclttnk.jpg", alt: "Imagen 5" },
  { id: 6, src: "https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790851/imagenesretirosemaus/ycomviqdvnuqbulcqclx.jpg", alt: "Imagen 6" },
  { id: 7, src: "https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790851/imagenesretirosemaus/ycomviqdvnuqbulcqclx.jpg", alt: "Imagen 7" },
  { id: 8, src: "https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790851/imagenesretirosemaus/cg2idrsbyocjwanstpoj.jpg", alt: "Imagen 8" },
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
