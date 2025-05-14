import React, { useEffect, useState, useRef }  from 'react';
import emailjs from '@emailjs/browser';
import{useUserStore } from '../hooks/useUserStore'
import{useProducCart} from '../hooks/useProducCart'
import{useOrden} from '../hooks/useOrden'
import Swal from 'sweetalert2';

import { PayPalButtons } from "@paypal/react-paypal-js";
import './checkoutPage.css'; // Importa el archivo CSS
import { TopMenuUser } from '../uni/components/ui/top-menu-user/TopMenuUser';
import { SidebarUser } from '../uni/components/ui/sidebar-user/SidebarUser';
import Footer from '../uni/components/ui/footer/Footer';

const CheckoutPage = () => {
      const { producCard, getProducCart }= useProducCart()
      const { userActive  }= useUserStore()
      const { addOrden  }= useOrden()
       const form = useRef();
         const[total, setTotal]= useState(0)
 
         const onApprove = (data, actions) => {
            return actions.order.capture().then(function(details) {
              alert("Pago realizado por: " + details.payer.name.given_name);
            });
          };
        
          // Maneja los errores en la transacción de PayPal
          const onError = (err) => {
            console.error("Error en el pago: ", err);
          };


  const handleSubmit = (e) => {
    e.preventDefault();
    const nombre = userActive.nombre +" "+ producCard[0].nombre ;
   
    addOrden({nombre: nombre ,productos:producCard, costo: total })
    emailjs.sendForm('service_ed2rlr9', 'template_oer85vh', form.current, {
      publicKey: 'EbEldik7lyNTXM7a4',
    })
    .then(
      () => {
        console.log('SUCCESS!');
      },
      (error) => {
        console.log('FAILED...', error.text);
      }
    );
        Swal.fire({
          title: "Reserva realizada, recuerda que puedes completar la compra además de la opción de PayPal  y tarjeta, pagando en efectivo o realizando una transferencia y enviando el comprobante numero de contacto 809-555-6889",
          icon: "success",
          confirmButtonText: 'Aceptar',
          background: '#ffffff',         // Fondo blanco limpio
          color: '#333333',               // Color del texto
          confirmButtonColor: '#007aff',  // Botón azul tipo Tesla
          width: '400px',                 // Opcional: un ancho más reducido
          customClass: {
            popup: 'rounded-xl shadow-lg',     // Bordes redondeados y sombra
            title: 'text-2xl font-semibold',   // Título grande y claro
            confirmButton: 'text-white font-bold py-2 px-4 rounded-lg'
          }
    
        });
  //  alert('Pedido realizado con éxito');
  };

   useEffect(()=>{
    producCard.map((item, index) => { setTotal((el)=> el + item.precio)})
    console.log(producCard)
   },[])

  return (
    <>
    <TopMenuUser />
    <SidebarUser/>
    <div className="checkout-page">
      <h1>Información de Pago</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="name">Nombre Completo</label>
           <h3>{userActive.nombre }</h3>
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <h3>{userActive.correo }</h3>
         
        </div>

   

     

        {/* Resumen del pedido */}
        <div className="order-summary">
          <h3>Resumen del Pedido</h3>
          {producCard.map((item, index) => (
            <div key={index} className="order-item">
              <p>{item.nombre} </p>
              <p>${(item.precio).toFixed(2)}</p>
            </div>
          ))}
          <div className="order-total">
            <h4>Total: ${total}</h4>
          </div>
        </div>

        <button type="submit" className="checkout-button">Reservar </button>

        <div className="paypal-button">
          <PayPalButtons
            createOrder={({ ...producCard}, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: total,
                    },
                  },
                ],
              });
            }}
            onApprove={onApprove}
            onError={onError}
          />
        </div>
      </form>
    </div>
    <form ref={form} >
  
  </form>
    <Footer />
    </>
  );
};

export default CheckoutPage;
