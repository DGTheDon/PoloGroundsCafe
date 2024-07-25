import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, total } = location.state || { order: {}, total: 0 };

  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
        <p className="mb-4">Thank you for your order at Polo Grounds Cafe!</p>
        <h2 className="text-xl font-semibold mb-2">Order Details:</h2>
        <ul className="mb-4">
          {Object.entries(order).map(([itemId, quantity]) => (
            <li key={itemId} className="mb-2">
              {/* You would typically fetch item details from your database here */}
              Item #{itemId}: Quantity: {quantity}
            </li>
          ))}
        </ul>
        <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
        <button 
          onClick={handleReturnToDashboard}
          className="mt-6 bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;