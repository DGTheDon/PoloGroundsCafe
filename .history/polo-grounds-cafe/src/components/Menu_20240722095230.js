import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_live_51N9CVtKiBcaYrVpURwVziN46jRwL3mkeK7N4vGLdAHAhUHBGheGGOhyAsem7MlCZggTOSF6fUm9LNROSYCkCIQS900P2RXvZtg');

const menuItems = [
  { id: 1, name: 'Espresso', price: 2.50, category: 'Coffee' },
  { id: 2, name: 'Latte', price: 3.50, category: 'Coffee' },
  { id: 3, name: 'Cappuccino', price: 3.50, category: 'Coffee' },
  { id: 4, name: 'Americano', price: 3.00, category: 'Coffee' },
  { id: 5, name: 'Croissant', price: 2.00, category: 'Pastry' },
  { id: 6, name: 'Blueberry Muffin', price: 2.50, category: 'Pastry' },
  { id: 7, name: 'Chocolate Chip Cookie', price: 1.50, category: 'Pastry' },
  { id: 8, name: 'Ham and Cheese Sandwich', price: 5.00, category: 'Sandwich' },
];

const CheckoutForm = ({ total, onSuccess }) => {
  // ... (keep the existing CheckoutForm code)
};

const Menu = ({ openModal }) => {
  const [order, setOrder] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  const addToOrder = (item) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      [item.id]: (prevOrder[item.id] || 0) + 1
    }));
  };

  const removeFromOrder = (item) => {
    setOrder(prevOrder => {
      const newOrder = { ...prevOrder };
      if (newOrder[item.id] > 1) {
        newOrder[item.id]--;
      } else {
        delete newOrder[item.id];
      }
      return newOrder;
    });
  };

  const getTotalPrice = () => {
    return Object.entries(order).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(item => item.id === parseInt(itemId));
      return total + (item.price * quantity);
    }, 0);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePaymentSuccess = () => {
    navigate('/order-confirmation', { state: { order, total: getTotalPrice() } });
  };

  const menuStyle = {
    minHeight: '100vh',
    backgroundColor: '#fffbeb',
    padding: '2rem',
  };

  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  };

  const categoryStyle = {
    marginBottom: '1.5rem',
  };

  const categoryTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  };

  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  };

  const buttonStyle = {
    backgroundColor: '#22c55e',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  };

  const orderSummaryStyle = {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={menuStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Polo Grounds Cafe Menu</h1>
        <div style={gridStyle}>
          <div>
            {['Coffee', 'Pastry', 'Sandwich'].map(category => (
              <div key={category} style={categoryStyle}>
                <h2 style={categoryTitleStyle}>{category}</h2>
                {menuItems.filter(item => item.category === category).map(item => (
                  <div key={item.id} style={itemStyle}>
                    <span>{item.name} - ${item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => {
                        addToOrder(item);
                        openModal(item.name, `Add ${item.name} to your order`, item.price);
                      }}
                      style={buttonStyle}
                    >
                      Add to Order
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={orderSummaryStyle}>
            <h2 style={categoryTitleStyle}>Your Order</h2>
            {Object.entries(order).map(([itemId, quantity]) => {
              const item = menuItems.find(item => item.id === parseInt(itemId));
              return (
                <div key={itemId} style={itemStyle}>
                  <span>{item.name} x {quantity}</span>
                  <div>
                    <button onClick={() => removeFromOrder(item)} style={{...buttonStyle, backgroundColor: '#ef4444', marginRight: '0.5rem'}}>-</button>
                    <button onClick={() => addToOrder(item)} style={buttonStyle}>+</button>
                  </div>
                </div>
              );
            })}
            <div style={{marginTop: '1rem', fontSize: '1.25rem', fontWeight: 'bold'}}>
              Total: ${getTotalPrice().toFixed(2)}
            </div>
            {!showCheckout ? (
              <button 
                onClick={handleCheckout}
                style={{...buttonStyle, width: '100%', marginTop: '1rem', backgroundColor: '#d97706'}}
                disabled={Object.keys(order).length === 0}
              >
                Proceed to Checkout
              </button>
            ) : (
              <Elements stripe={stripePromise}>
                <CheckoutForm total={getTotalPrice()} onSuccess={handlePaymentSuccess} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;