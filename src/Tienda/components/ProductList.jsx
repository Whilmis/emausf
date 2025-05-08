import React from 'react';

import './ProductList.css';
import ProductCard from './ProductCart';

const ProductList = ({ products, onAddToCart }) => {
  console.log(products)
  return (
    <div className="product-list">
      {products.map((prod) => (
        <ProductCard key={prod._id} product={prod} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ProductList;
