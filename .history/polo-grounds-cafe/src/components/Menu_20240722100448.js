import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_live_51N9CVtKiBcaYrVpURwVziN46jRwL3mkeK7N4vGLdAHAhUHBGheGGOhyAsem7MlCZggTOSF6fUm9LNROSYCkCIQS900P2RXvZtg');

const menuItems = [
  { id: 1, name: 'Iced Energy', price: 4.50, category: 'Drinks', image: '/path/to/iced-energy-image.jpg' },
  { id: 2, name: 'Hot Coffees', price: 3.50, category: 'Drinks', image: '/path/to/hot-coffee-image.jpg' },
  { id: 3, name: 'Cold Coffees', price: 4.00, category: 'Drinks', image: '/path/to/cold-coffee-image.jpg' },
  { id: 4, name: 'Starbucks Refreshers Beverages', price: 4.50, category: 'Drinks', image: '/path/to/refreshers-image.jpg' },
  // Add more menu items as needed
];

const categories = ['Drinks', 'Food', 'At Home Coffee', 'Merchandise'];

const Menu = ({ openModal }) => {
  const [selectedCategory, setSelectedCategory] = useState('Drinks');

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer py-2 ${selectedCategory === category ? 'text-green-700 font-semibold' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Menu</h1>
        <h2 className="text-2xl font-semibold mb-4">{selectedCategory}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuItems
            .filter((item) => item.category === selectedCategory)
            .map((item) => (
              <div key={item.id} className="flex items-center">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-full mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <button
                    onClick={() => openModal(item.name, `Add ${item.name} to your order`, item.price)}
                    className="mt-2 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;