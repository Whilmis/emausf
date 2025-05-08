import React from 'react';
import { Link } from "react-router-dom";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { useUiStore } from '../../../../hooks/useUiStore';
import logo from '../../../pages/imagenesvarias/logoemaus.jpg';
import './topMenu.css';

export const TopMenu = () => {
  const { isDateModalOpen, openDateModal } = useUiStore();
  const totalItemsInCart = 3; // Cambiar según tu lógica

  return (
    <nav className="navbar">
      {/* Logo */}
     
      <div className="logo">
      <img src={logo} alt="Emaús" className="logo" />
        <Link to={'/'} className="logo-link">Emaus Hombres</Link>
      </div>

      <div className="center-menu">
        <Link to={'/'} className="menu-link">Home</Link>
        <Link to="/retiros" className="menu-link">Retiro</Link>
        <Link to="/parroquias" className="menu-link">Parroquias</Link>
        <Link to="/gallery" className="menu-link">Galeria</Link>
        <Link to="/calendario" className="menu-link">Calendario</Link>
      </div>

      <div className="actions">
      

       

        <button onClick={openDateModal} className="menu-button">
          Menú
        </button>
      </div>
    </nav>
  );
};
