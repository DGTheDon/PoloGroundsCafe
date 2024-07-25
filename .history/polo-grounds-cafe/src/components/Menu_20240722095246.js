import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Initialize Stripe
const stripePromise = loadStripe('pk_live_51N9CVtKiBcaYrVpURwVziN46jRwL3mkeK7N4vGLdAHAhUHBGheGGOhyAsem7MlCZggTOSF6fUm9LNROSYCkCIQS900P2RXvZtg');

// Menu items (in a real application, these would typically come from a database)
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

// Checkout form component for Stripe payments
const CheckoutForm = ({ total, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create a payment intent on the server
      const { data } = await axios.post('http://localhost:3001/create-payment-intent', {
        amount: total
      });

      // Confirm the payment on the client
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        onSuccess();
      }
    } catch (error) {
      setError(error.message);
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <button 
        type="submit" 
        disabled={!stripe || processing}
        className="mt-4 bg-amber-600 text-white px-4 py-2 rounded w-full hover:bg-amber-700 disabled:opacity-50"
      >
        Pay ${total.toFixed(2)}
      </button>
    </form>
  );
};

// Main Menu component
const Menu = ({ openModal }) => {
  const [order, setOrder] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  // Add item to order
  const addToOrder = (item) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      [item.id]: (prevOrder[item.id] || 0) + 1
    }));
  };

  // Remove item from order
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

  // Calculate total price of order
  const getTotalPrice = () => {
    return Object.entries(order).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(item => item.id === parseInt(itemId));
      return total + (item.price * quantity);
    }, 0);
  };

  // Handle checkout button click
  const handleCheckout = () => {
    setShowCheckout(true);
  };

  // Handle successful payment
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
                className="mt-4 bg-amber-600 text-white px-4 py-2 rounded w-full hover:bg-amber-700"
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