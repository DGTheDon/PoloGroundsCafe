import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

const CartPage = ({ cart, removeFromCart, updateCartItemQuantity }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      return Object.values(cart).reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };
    setTotal(calculateTotal());
  }, [cart]);

  const handleCheckout = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const orderTotal = total;
      const pointsEarned = Math.floor(orderTotal);

      try {
        await updateDoc(userRef, {
          points: increment(pointsEarned),
          orders: increment(1),
          'orderHistory': {
            date: new Date(),
            total: orderTotal,
            items: Object.values(cart).map(item => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price
            }))
          }
        });

        // Clear cart and redirect to order confirmation
        // You'll need to implement these functions
        clearCart();
        navigate('/order-confirmation', { state: { orderTotal, pointsEarned } });
      } catch (error) {
        console.error("Error processing order:", error);
        // Handle error (show message to user, etc.)
      }
    } else {
      // Redirect to login if user is not authenticated
      navigate('/login', { state: { redirectTo: '/cart' } });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {Object.keys(cart).length === 0 ? (
        <p>Your cart is empty. <Link to="/menu" className="text-green-600 hover:underline">Continue shopping</Link></p>
      ) : (
        <>
          {Object.values(cart).map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-4">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;