import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ title, description, price, onClose, onAddToCart }) => {
  return (
    <div id="itemModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>×</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>${price.toFixed(2)}</p>
        <button className="add-to-cart" onClick={onAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Modal;