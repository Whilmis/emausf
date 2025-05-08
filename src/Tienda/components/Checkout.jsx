import React from 'react';
import './Checkout.css';

const Checkout = ({ cartItems }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="checkout">
      <h2>Resumen de tu compra</h2>
      <p>Total: <strong>${total}</strong></p>
      <button className="checkout-button">Finalizar Compra</button>
    </div>
  );
};

export default Checkout;
