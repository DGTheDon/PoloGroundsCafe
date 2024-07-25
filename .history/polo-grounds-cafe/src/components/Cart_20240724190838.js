import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';

const CartPage = ({ cartItems, removeItemFromCart, updateCartItemQuantity, clearEntireCart }) => {
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const navigate = useNavigate();

  console.log("CartPage rendered. cartItems:", cartItems); // Debugging log

  useEffect(() => {
    console.log("useEffect triggered. cartItems:", cartItems); // Debugging log
    const calculateTotalPrice = () => {
      return Object.values(cartItems).reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0);
    };
    const newTotal = calculateTotalPrice();
    console.log("Calculated new total:", newTotal); // Debugging log
    setCartTotalPrice(newTotal);
  }, [cartItems]);

  const handleCheckoutProcess = async () => {
    // ... (keep the existing handleCheckoutProcess logic)
  };

  // Render a basic structure even if cart is empty
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      
      {!cartItems || Object.keys(cartItems).length === 0 ? (
        <p>
          Your cart is empty. 
          <Link to="/menu" className="text-green-600 hover:underline ml-2">
            Continue shopping
          </Link>
        </p>
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
            <p className="text-xl font-semibold">
              Total: ${cartTotalPrice.toFixed(2)}
            </p>
            <button
              onClick={handleCheckoutProcess}
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