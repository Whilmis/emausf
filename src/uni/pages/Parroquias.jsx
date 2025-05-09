import React from "react";
import './parroquias.css'
import { TopMenu } from "../components/ui/top-menu/TopMenu";
import { Sidebar } from "../components/ui/sidebar/Sidebar";
import Footer from "../components/ui/footer/Footer";

const parroquias = [
  {
    nombre: "Parroquia San Fco. de Asis Paz y Bien",
    imagen: "https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790889/imagenesparroquiasemaus/qo7z5etrkqnoiraglo5u.jpg",
    direccion:
      "Av Sabana Larga, Santo Domingo Este 11501, Dominican Republic. Teléfono: (809) 594-8664",
    ubicacion:
      "https://www.google.es/maps/place/Iglesia+cat%C3%B3lica+Parroquia+San+Francisco+de+As%C3%ADs+Paz+y+Bien/@18.4866097,-69.8680741,17z",
  },
  {
    nombre: "Parroquia San Jose Obrero",
    imagen: "https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790890/imagenesparroquiasemaus/qmfrnf5t3qugbypnbdp5.jpg",
    direccion:
      "Av Sabana Larga, Santo Domingo Este 11501, Dominican Republic. Teléfono: (809) 594-8664",
    ubicacion:
      "https://www.google.es/maps/place/Iglesia+cat%C3%B3lica+Parroquia+San+Francisco+de+As%C3%ADs+Paz+y+Bien/@18.4866097,-69.8680741,17z",
  },
  {
    nombre: "Parroquia Nuestra Señora de la Fe",
    imagen: "https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790887/imagenesparroquiasemaus/r1mszuzwrdc08q2ims2j.jpg",
    direccion:
      "Av Sabana Larga, Santo Domingo Este 11501, Dominican Republic. Teléfono: (809) 594-8664",
    ubicacion:
      "https://www.google.es/maps/place/Iglesia+cat%C3%B3lica+Parroquia+San+Francisco+de+As%C3%ADs+Paz+y+Bien/@18.4866097,-69.8680741,17z",
  },
  {
    nombre: "Parroquia San Isidro Labrador",
    imagen: "https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790889/imagenesparroquiasemaus/iaarjxzp86gb5rxn930f.jpg",
    direccion:
      "Av Sabana Larga, Santo Domingo Este 11501, Dominican Republic. Teléfono: (809) 594-8664",
    ubicacion:
      "https://www.google.es/maps/place/Iglesia+cat%C3%B3lica+Parroquia+San+Francisco+de+As%C3%ADs+Paz+y+Bien/@18.4866097,-69.8680741,17z",
  },
  {
    nombre: "Parroquia San Vicente de Paul",
    imagen: "https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790890/imagenesparroquiasemaus/cbdhwzfpzcxhbhcr8c5e.jpg",
    direccion:
      "Av Sabana Larga, Santo Domingo Este 11501, Dominican Republic. Teléfono: (809) 594-8664",
    ubicacion:
      "https://www.google.es/maps/place/Iglesia+cat%C3%B3lica+Parroquia+San+Francisco+de+As%C3%ADs+Paz+y+Bien/@18.4866097,-69.8680741,17z",
  },
];

export default function Parroquias() {
  return (
    <>    <TopMenu />
        <Sidebar />
    <div className="parroquias-container">
      <div className="parroquias-grid">
        {parroquias.map((parroquia, index) => (
          <div key={index} className="parroquia-card">
            <h2 className="parroquia-title">{parroquia.nombre}</h2>
            <div className="parroquia-image-container">
              <img
                src={parroquia.imagen}
                alt={parroquia.nombre}
                className="parroquia-image"
              />
            </div>
            <p className="parroquia-address">{parroquia.direccion}</p>
            <a
              href={parroquia.ubicacion}
              target="_blank"
              rel="noopener noreferrer"
              className="parroquia-link"
            >
              Ver ubicación
            </a>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}
