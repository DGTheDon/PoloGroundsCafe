import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Assuming you have a list of menu items. Replace this with your actual menu items.
const menuItems = [
  { id: 1, name: 'Espresso', price: 2.50, category: 'Coffee' },
  { id: 2, name: 'Latte', price: 3.50, category: 'Coffee' },
  { id: 3, name: 'Cappuccino', price: 3.50, category: 'Coffee' },
  { id: 4, name: 'Croissant', price: 2.00, category: 'Pastry' },
  // ... add all your menu items here
];

const Menu = () => {
  const [order, setOrder] = useState({});
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
    navigate('/order-confirmation', { state: { order, total: getTotalPrice() } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Polo Grounds Cafe Menu</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <button 
              onClick={() => addToOrder(item)}
              className="mt-2 bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Your Order</h2>
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
        <button 
          onClick={handleCheckout}
          className="mt-4 bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700"
          disabled={Object.keys(order).length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Menu;