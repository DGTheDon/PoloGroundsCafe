import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

const CartPage = ({ cartItems, removeItemFromCart, updateCartItemQuantity, clearEntireCart, onProceedToCheckout }) => {
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      return Object.values(cartItems).reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };
    setCartTotalPrice(calculateTotal());
  }, [cartItems]);

  const handleCheckout = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const orderTotal = cartTotalPrice;
      const pointsEarned = Math.floor(orderTotal);
      
      try {
        await updateDoc(userRef, {
          points: increment(pointsEarned),
          orders: increment(1),
          orderHistory: increment({
            date: new Date(),
            total: orderTotal,
            items: Object.values(cartItems).map(item => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price
            }))
          })
        });
        
        clearEntireCart();
        onProceedToCheckout();
      } catch (error) {
        console.error("Error processing order:", error);
        // Handle error (show message to user, etc.)
      }
    } else {
      // Redirect to login if user is not authenticated
      // You might want to use React Router's navigate function here
      window.location.href = '/login';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {Object.keys(cartItems).length === 0 ? (
        <p>Your cart is empty. <Link to="/menu" className="text-green-600 hover:underline">Continue shopping</Link></p>
      ) : (
        <>
          {Object.values(cartItems).map((item) => (
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
                  onClick={() => removeItemFromCart(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <p className="text-xl font-semibold">Total: ${cartTotalPrice.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300"
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