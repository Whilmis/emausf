import React, { useState } from 'react';
import './productDetail.css'; // Importa el archivo CSS
import { TopMenuUser } from '../uni/components/ui/top-menu-user/TopMenuUser';
import { SidebarUser } from '../uni/components/ui/sidebar-user/SidebarUser';
import{useProducCart} from '../hooks/useProducCart'
import Footer from '../uni/components/ui/footer/Footer';

const ProductDetail = () => {

  const { producActive, addProducCart }= useProducCart()

  // Función para manejar el cambio en la cantidad del producto

 console.log(producActive)


  // Función para manejar el clic en el botón de "Agregar al carrito"


  return (
    <>
    <TopMenuUser />
    <SidebarUser />
    <div className="product-detail">
      <div className="product-image">
        <img src={producActive.img} alt={producActive.nombre} />
      </div>

      <div className="product-info">
        <h2>{producActive.nombre}</h2>
        <p><strong>Descripción:</strong> {producActive.descripcion}</p>
        <p><strong>Precio:</strong> {producActive.precio}</p>

        {/* Selector de cantidad */}
   

        {/* Botón de "Agregar al carrito" */}
        <button onClick={()=> addProducCart(producActive)} className="add-to-cart-button">
         Agregar al carrito
        </button>
      </div>
    </div>
    <Footer />
    </>
  );
};


export default ProductDetail;
