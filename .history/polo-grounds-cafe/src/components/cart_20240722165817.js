import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_live_51N9CVtKiBcaYrVpURwVziN46jRwL3mkeK7N4vGLdAHAhUHBGheGGOhyAsem7MlCZggTOSF6fUm9LNROSYCkCIQS900P2RXvZtg');

const menuItems = [
  { id: 1, name: 'Iced Energy', price: 4.50, category: 'Drinks', subCategory: 'Iced Energy', image: '/path/to/iced-energy-image.jpg' },
  { id: 2, name: 'Hot Coffees', price: 3.50, category: 'Drinks', subCategory: 'Hot Coffees', image: '/path/to/hot-coffee-image.jpg' },
  { id: 3, name: 'Cold Coffees', price: 4.00, category: 'Drinks', subCategory: 'Cold Coffees', image: '/path/to/cold-coffee-image.jpg' },
  { id: 4, name: 'Starbucks Refreshers Beverages', price: 4.50, category: 'Drinks', subCategory: 'Polo Grounds Refreshers™', image: '/path/to/refreshers-image.jpg' },
];

const Cart = ({ cart, removeFromCart }) => {
  const navigate = useNavigate();
  const [isCheckout, setIsCheckout] = useState(false);

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(item => item.id === parseInt(itemId));
      return total + (item.price * quantity);
    }, 0);
  };

  const handleCheckoutSuccess = () => {
    // Clear cart and navigate to order confirmation
    navigate('/order-confirmation');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {Object.keys(cart).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {Object.entries(cart).map(([itemId, quantity]) => {
            const item = menuItems.find(item => item.id === parseInt(itemId));
            return (
              <div key={itemId} className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {quantity}</p>
                </div>
                <div>
                  <p className="font-semibold">${(item.price * quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(itemId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className="mt-6">
            <p className="text-xl font-bold">Total: ${getTotalPrice().toFixed(2)}</p>
            {!isCheckout && (
              <button
                onClick={() => setIsCheckout(true)}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
          {isCheckout && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Checkout</h2>
              <Elements stripe={stripePromise}>
                <CheckoutForm amount={getTotalPrice()} onSuccess={handleCheckoutSuccess} />
              </Elements>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;