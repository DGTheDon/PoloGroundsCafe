import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';

const CartPage = ({ cartItems, removeItemFromCart, updateCartItemQuantity, clearEntireCart }) => {
  // State to store the total price of items in the cart
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Effect to recalculate total price whenever cart items change
  useEffect(() => {
    const calculateTotalPrice = () => {
      return Object.values(cartItems).reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0);
    };
    setCartTotalPrice(calculateTotalPrice());
  }, [cartItems]);

  // Function to handle the checkout process
  const handleCheckoutProcess = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const orderTotalAmount = cartTotalPrice;
      const rewardsPointsEarned = Math.floor(orderTotalAmount); // 1 point per dollar spent

      try {
        // Update user document with new order information
        await updateDoc(userDocRef, {
          rewardsPoints: increment(rewardsPointsEarned),
          totalOrders: increment(1),
          orderHistory: arrayUnion({
            orderDate: new Date(),
            orderTotal: orderTotalAmount,
            orderedItems: Object.values(cartItems).map(item => ({
              itemName: item.name,
              itemQuantity: item.quantity,
              itemPrice: item.price
            }))
          })
        });

        // Clear the cart and redirect to order confirmation page
        clearEntireCart();
        navigate('/order-confirmation', { 
          state: { 
            orderTotalAmount, 
            rewardsPointsEarned 
          } 
        });
      } catch (error) {
        console.error("Error processing order:", error);
        // TODO: Implement proper error handling (e.g., show error message to user)
      }
    } else {
      // Redirect to login if user is not authenticated
      navigate('/login', { state: { redirectAfterLogin: '/cart' } });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      
      {Object.keys(cartItems).length === 0 ? (
        // Display message for empty cart
        <p>
          Your cart is empty. 
          <Link to="/menu" className="text-green-600 hover:underline ml-2">
            Continue shopping
          </Link>
        </p>
      ) : (
        // Display cart items and checkout option
        <>
          {/* Cart Items List */}
          {Object.values(cartItems).map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-4">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center">
                {/* Quantity adjustment buttons */}
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
                {/* Remove item button */}
                <button
                  onClick={() => removeItemFromCart(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Cart Total and Checkout Button */}
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