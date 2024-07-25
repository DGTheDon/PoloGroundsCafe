import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Menu = ({ openModal, updateCartCount, addToCart }) => {
  console.log('Menu component rendering');
  const [selectedCategory, setSelectedCategory] = useState('Drinks');
  const [selectedSubCategory, setSelectedSubCategory] = useState('Iced Energy');
  const [order, setOrder] = useState({});

  useEffect(() => {
    const count = Object.values(order).reduce((a, b) => a + b, 0);
    updateCartCount(count);
  }, [order, updateCartCount]);

  const addToOrder = (item) => {
    setOrder(prevOrder => {
      const newOrder = {
        ...prevOrder,
        [item.id]: (prevOrder[item.id] || 0) + 1
      };
      addToCart(item);
      openModal(item.name, `Added ${item.name} to your order`, item.price);
      return newOrder;
    });
  };
const menuItems = [
  { id: 1, name: 'Iced Energy', price: 4.50, category: 'Drinks', subCategory: 'Iced Energy', image: '/path/to/iced-energy-image.jpg' },
  { id: 2, name: 'Hot Coffees', price: 3.50, category: 'Drinks', subCategory: 'Hot Coffees', image: '/path/to/hot-coffee-image.jpg' },
  { id: 3, name: 'Cold Coffees', price: 4.00, category: 'Drinks', subCategory: 'Cold Coffees', image: '/path/to/cold-coffee-image.jpg' },
  { id: 4, name: 'Starbucks Refreshers Beverages', price: 4.50, category: 'Drinks', subCategory: 'Polo Grounds Refreshers™', image: '/path/to/refreshers-image.jpg' },
  // Add more menu items as needed
];

const categories = ['Drinks', 'Food', 'At Home Coffee', 'Merchandise'];

const drinkSubCategories = [
  'Iced Energy', 'Hot Coffees', 'Cold Coffees', 'Polo Grounds Refreshers™', 
  'Iced Teas', 'Hot Teas', 'Frappuccino® Blended Beverages'
];

const Menu = ({ openModal, updateCartCount, addToCart }) => {
  console.log('Menu component rendering');
  const [selectedCategory, setSelectedCategory] = useState('Drinks');
  const [selectedSubCategory, setSelectedSubCategory] = useState('Iced Energy');
  const [order, setOrder] = useState({});

  useEffect(() => {
    const count = Object.values(order).reduce((a, b) => a + b, 0);
    updateCartCount(count);
  }, [order, updateCartCount]);

  const addToOrder = (item) => {
    setOrder(prevOrder => {
      const newOrder = {
        ...prevOrder,
        [item.id]: (prevOrder[item.id] || 0) + 1
      };
      addToCart(item);
      openModal(item.name, `Added ${item.name} to your order`, item.price);
      return newOrder;
    });
  };

  return (
    <div className="menu-container flex min-h-screen bg-white" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000}}>
      <h1>Menu Page</h1>
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Drinks</h2>
        <ul>
          {drinkSubCategories.map((subCategory) => (
            <li
              key={subCategory}
              className={`cursor-pointer py-2 ${selectedSubCategory === subCategory ? 'text-green-700 font-semibold' : ''}`}
              onClick={() => setSelectedSubCategory(subCategory)}
            >
              {subCategory}
            </li>
          ))}
        </ul>
      </div>
      {/* Main content */}
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-bold mb-6">Menu</h1>
        
        {/* Categories */}
        <div className="flex mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`mr-4 px-4 py-2 rounded ${selectedCategory === category ? 'bg-green-700 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Menu Items */}
        <h2 className="text-2xl font-semibold mb-4">{selectedCategory}</h2>
        <div className="grid grid-cols-2 gap-8">
          {menuItems
            .filter((item) => item.category === selectedCategory && item.subCategory === selectedSubCategory)
            .map((item) => (
              <div key={item.id} className="flex items-center">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-full mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToOrder(item)}
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