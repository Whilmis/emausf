import React from 'react';
import { Link } from "react-router-dom";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { useUiStore } from '../../../../hooks/useUiStore';
import{useProducCart} from '../../../../hooks/useProducCart'
import './topMenu.css';
import { useEffect } from "react";

export const TopMenuUser = () => {
  const {  openDateModal } = useUiStore();
    const { producCard, getProducCart }= useProducCart()
    useEffect(()=>{
      getProducCart();
    },[])
   
 


  return (
    <nav className="navbar">
      {/* Logo */}
      
      <div className="logo">
      <img src='https://res.cloudinary.com/dwjkuhxmr/image/upload/v1746790797/imagenesvarias/goi9volcm529ppaqsipx.png' alt="Emaús" className="logo" />
        <Link to={'/'} className="logo-link">Emaus Hombres</Link>
      </div>

      <div className="center-menu">
        <Link to={'/actividades'} className="menu-link">Actividades</Link>
        <Link to="/articulos" className="menu-link">Articulos</Link>
        <Link to="/prendas" className="menu-link">Prendas</Link>
    
      </div>

      <div className="actions">
      

        <Link to={'/card'} className="icon-button">
          <div className="cart-container">
            {producCard?.length > 0 && (
              <span className="cart-badge">{producCard?.length}</span>
            )}
            <IoCartOutline className="icon" />
          </div>
        </Link>

        <button onClick={openDateModal} className="menu-button">
          Menú
        </button>
      </div>
    </nav>
  );
};
