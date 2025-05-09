import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import{useProducCart} from '../hooks/useProducCart'
import './cartPage.css'; // Importa el archivo CSS
import Footer from '../uni/components/ui/footer/Footer';
import { TopMenuUser } from '../uni/components/ui/top-menu-user/TopMenuUser';
import { SidebarUser } from '../uni/components/ui/sidebar-user/SidebarUser';

const CartPage = () => {
    const { producCard, deleteProducCart, getProducCart}= useProducCart()
     const navigate = useNavigate();

   const[total, setTotal]= useState(0)
   const[product, setProduct]= useState([])
   const pago = () =>{

    
    navigate('/pago')
  }
  const handleDelete = (id) =>{
    console.log(id)
    deleteProducCart(id) 
    getProducCart()
  }
  useEffect(()=>{
   setProduct(producCard)
   },[producCard])

   useEffect(()=>{
    producCard.map((item, index) => { setTotal((el)=> el + item.precio)})
   },[])


  return (
    <>
    <TopMenuUser />
    <SidebarUser />
    <div className="cart-page">
      <h1>Tu Carrito</h1>

      {/* Si no hay productos en el carrito */}
      {product.length === 0 ? (
        <div className="empty-cart">
          <p>Tu carrito está vacío.</p>
          
        </div>
      ) : (
        <div>
          {/* Lista de productos en el carrito */}
          <div className="cart-items">
            {product.map((item, index) => (
                
              <div key={index} className="cart-item">
               
                <div className="cart-item-image">
                  <img src={item.img} alt={item.nombre} />
                </div>
                <div className="cart-item-info">
                  <h3>{item.nombre}</h3>
                  <p>Precio: ${item.precio}</p>
                </div>
                <button onClick={() => handleDelete(item._id)}>Eliminar</button>
              </div>
            ))}
          </div>

          {/* Total del carrito */}
          <div className="cart-total">
            <h3>Total: ${total}</h3>
            <button onClick={()=> pago() } className="checkout-button">Proceder al pago</button>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default CartPage;
