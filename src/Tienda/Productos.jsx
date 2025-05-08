import React, { useState, useEffect  } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { useArticulos } from '../hooks/useArticulos';
import './productos.css';
import { TopMenuUser } from '../uni/components/ui/top-menu-user/TopMenuUser';
import { SidebarUser } from '../uni/components/ui/sidebar-user/SidebarUser';
import Footer from '../uni/components/ui/footer/Footer';

// Mock de productos simulando datos de una API


function Productos() {
  const [cartItems, setCartItems] = useState([]);
  const {paginacionArticulos, articulosState} = useArticulos();

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };
const [desde, setDesde] = useState(0);

  const anteriorP = () =>{
    if(desde >= 0){
      setDesde(desde - 5)
  
    }

  }

  const sigueinte = () =>{
    if(desde >= 0){
      setDesde(desde - 5)
  
    }

  }

    useEffect(()=>{
        paginacionArticulos(desde)

  
    },[desde])
    console.log(articulosState)
  return (
    <>
    <TopMenuUser/>
    <SidebarUser />
    <div className="app-container">
      <h1 className="app-title">Articulos</h1>
      <ProductList products={articulosState} onAddToCart={handleAddToCart} />
  

    </div>
    <div className="pagination">
      <button className="prev" onClick={anteriorP} disabled={desde === 0}>
        Anterior
      </button>
      <button className="next" onClick={sigueinte}>
        Siguiente
      </button>
     
    </div>
    <Footer />
    </>
  );
}

export default Productos;