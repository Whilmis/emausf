import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, onRemoveFromCart }) => {
  return (
    <div className="cart">
      <h2>Carrito</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Tu carrito está vacío.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              {item.title} - ${item.price}
              <button onClick={() => onRemoveFromCart(item)} className="cart-remove">
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
