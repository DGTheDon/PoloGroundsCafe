import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    const saveOrder = async () => {
      if (location.state?.order && location.state?.total) {
        const { order, total } = location.state;
        const user = auth.currentUser;

        if (!user) {
          console.error("No authenticated user found");
          return;
        }

        const orderNumber = Math.floor(100000 + Math.random() * 900000);
        setOrderNumber(orderNumber);

        const orderData = {
          userId: user.uid,
          orderNumber: orderNumber,
          items: order,
          total: total,
          status: 'placed',
          createdAt: serverTimestamp()
        };

        try {
          await setDoc(doc(db, 'orders', orderNumber.toString()), orderData);
        } catch (error) {
          console.error("Error saving order: ", error);
        }
      } else {
        navigate('/menu');
      }
    };

    saveOrder();
  }, [location.state, navigate]);

  if (!location.state?.order || !location.state?.total) {
    return <div>No order details found. Redirecting to menu...</div>;
  }

  const { order, total } = location.state;

  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-amber-700">Order Confirmation</h1>
        {orderNumber && (
          <p className="text-xl mb-4 text-center">Order Number: <span className="font-bold">{orderNumber}</span></p>
        )}
        <p className="text-lg mb-6 text-center">Thank you for your order at Polo Grounds Cafe!</p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Details:</h2>
          {Object.entries(order).map(([itemId, quantity]) => {
            const item = JSON.parse(itemId);
            return (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>{quantity}x {item.name}</span>
                <span>${(quantity * item.price).toFixed(2)}</span>
              </div>
            );
          })}
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between items-center font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <p className="text-center mb-6">Your order will be ready for pickup soon.</p>
        <div className="text-center">
          <button 
            onClick={() => navigate('/menu')}
            className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700 transition duration-300"
          >
            Return to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;