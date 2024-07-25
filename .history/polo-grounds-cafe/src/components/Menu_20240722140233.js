import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('your_stripe_publishable_key');

const menuItems = [
  { id: 1, name: 'Espresso', price: 3.50, category: 'Coffee' },
  { id: 2, name: 'Latte', price: 4.00, category: 'Coffee' },
  { id: 3, name: 'Cappuccino', price: 4.00, category: 'Coffee' },
  { id: 4, name: 'Americano', price: 3.00, category: 'Coffee' },
  { id: 5, name: 'Croissant', price: 2.50, category: 'Pastry' },
  { id: 6, name: 'Blueberry Muffin', price: 3.00, category: 'Pastry' },
  // Add more menu items as needed
];

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
      const { data: clientSecret } = await axios.post('/create-payment-intent', {
        amount: total * 100 // Stripe expects the amount in cents
      });

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        onSuccess();
      }
    } catch (err) {
      setError(err.message);
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
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Pay ${total.toFixed(2)}
      </button>
    </form>
  );
};

const Menu = ({ updateCartCount }) => {
  const [order, setOrder] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    updateCartCount(Object.values(order).reduce((a, b) => a + b, 0));
  }, [order, updateCartCount]);

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

  const handleCheckoutSuccess = () => {
    // Handle successful checkout (e.g., clear cart, show confirmation)
    setOrder({});
    setShowCheckout(false);
    alert('Payment successful!');
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map(item => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <button 
              onClick={() => addToOrder(item)}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>
      {Object.keys(order).length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Order</h2>
          {Object.entries(order).map(([itemId, quantity]) => {
            const item = menuItems.find(item => item.id === parseInt(itemId));
            return (
              <div key={itemId} className="flex justify-between items-center mb-2">
                <span>{item.name} x {quantity}</span>
                <div>
                  <button 
                    onClick={() => removeFromOrder(item)}
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  >
                    -
                  </button>
                  <button 
                    onClick={() => addToOrder(item)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
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
          <button 
            onClick={() => setShowCheckout(true)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
      {showCheckout && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm total={getTotalPrice()} onSuccess={handleCheckoutSuccess} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default Menu;