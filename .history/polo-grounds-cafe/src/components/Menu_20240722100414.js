import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { id: 1, name: 'Iced Energy', category: 'Drinks', image: '/path/to/iced-energy.jpg' },
  { id: 2, name: 'Hot Coffees', category: 'Drinks', image: '/path/to/hot-coffees.jpg' },
  { id: 3, name: 'Cold Coffees', category: 'Drinks', image: '/path/to/cold-coffees.jpg' },
  { id: 4, name: 'Polo Grounds Refreshers Beverages', category: 'Drinks', image: '/path/to/refreshers.jpg' },
  // Add more items as needed
];

const categories = ['Drinks', 'Food', 'At Home Coffee', 'Merchandise'];

const Menu = ({ addToOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState('Drinks');
  const navigate = useNavigate();

  const handleAddToOrder = (item) => {
    addToOrder(item);
    // You can add additional logic here, like showing a confirmation message
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer py-2 ${
                selectedCategory === category ? 'text-green-700 font-semibold' : ''
              }`}
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
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <button
                    onClick={() => handleAddToOrder(item)}
                    className="mt-2 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-300"
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