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

  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Polo Grounds Cafe Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {['Coffee', 'Pastry', 'Sandwich'].map(category => (
              <div key={category} className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{category}</h2>
                {menuItems.filter(item => item.category === category).map(item => (
                  <div key={item.id} className="flex justify-between items-center mb-2">
                    <span>{item.name} - ${item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => {
                        addToOrder(item);
                        openModal(item.name, `Add ${item.name} to your order`, item.price);
                      }}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Add to Order
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your Order</h2>
            {Object.entries(order).map(([itemId, quantity]) => {
              const item = menuItems.find(item => item.id === parseInt(itemId));
              return (
                <div key={itemId} className="flex justify-between items-center mb-2">
                  <span>{item.name} x {quantity}</span>
                  <div>
                    <button 
                      onClick={() => removeFromOrder(item)}
                      className="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600"
                    >
                      -
                    </button>
                    <button 
                      onClick={() => addToOrder(item)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="mt-4 text-xl font-semibold">
              Total: ${getTotalPrice().toFixed(2)}
            </div>
            {!showCheckout ? (
              <button 
                onClick={handleCheckout}
                className="mt-4 bg-amber-600 text-white px-4 py-2 rounded w-full hover:bg-amber-700 disabled:opacity-50"
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