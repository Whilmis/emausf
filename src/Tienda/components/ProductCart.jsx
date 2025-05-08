import React from 'react';
import { useNavigate } from 'react-router-dom';
import{useProducCart} from '../../hooks/useProducCart'
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
   const navigate = useNavigate();
   const {getProducActive}= useProducCart()

    const detalle = (producto) =>{

      getProducActive(producto)
      navigate('/detalle')
    }
  return (
    <div className="product-card">
      <img src={product.img} alt={product.nombre} className="product-img" />
      <h3 className="product-title">{product.nombre}</h3>
      <p className="product-price">${product.precio}</p>
      <button onClick={()=> detalle(product) } className="product-button">
        Detalle
      </button>
    </div>
  );
};

export default ProductCard;
