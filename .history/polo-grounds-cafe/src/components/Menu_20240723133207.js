import React, { useState } from 'react';

const menuItems = [
  { id: 1, name: 'Tropical Citrus Iced Energy', description: '(VENTI ONLY)', price: 4.50, category: 'Drinks', subCategory: 'Iced Energy' },
  { id: 2, name: 'Melon Burst Iced Energy', description: '(VENTI ONLY)', price: 4.50, category: 'Drinks', subCategory: 'Iced Energy' },
  { id: 3, name: 'Frozen Tropical Citrus Iced Energy with Strawberry Puree', description: '(VENTI ONLY)', price: 5.00, category: 'Drinks', subCategory: 'Iced Energy' },
  // Add more items for other categories
];

const categories = ['Menu', 'Featured', 'Previous', 'Favorites'];
const drinkSubCategories = [
  'Iced Energy', 'Hot Coffees', 'Cold Coffees', 'Starbucks Refreshers® Beverages', 
  'Frappuccino® Blended Beverages', 'Iced Tea and Lemonade', 'Hot Teas', 'Milk, Juice & More',
  'Bottled Beverages'
];

const Menu = ({ openModal, updateCartCount, addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('Menu');
  const [selectedSubCategory, setSelectedSubCategory] = useState('Iced Energy');

  const addToOrder = (item) => {
    addToCart(item);
    updateCartCount(prevCount => prevCount + 1);
    openModal(item.name, `Added ${item.name} to your order`, item.price);
  };

  return (
    <div className="menu-container flex flex-col min-h-screen bg-white">
      {/* Top navigation */}
      <div className="w-full border-b">
        <nav className="container mx-auto flex">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 ${selectedCategory === category ? 'border-b-2 border-green-700' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-1/4 p-4 border-r">
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
          <p className="text-sm text-gray-600 mb-4">Menu / {selectedSubCategory}</p>
          <h1 className="text-3xl font-bold mb-6">{selectedSubCategory}</h1>
          
          <div className="grid grid-cols-3 gap-8">
            {menuItems
              .filter((item) => item.subCategory === selectedSubCategory)
              .map((item) => (
                <div key={item.id} className="flex flex-col">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <button
                    onClick={() => addToOrder(item)}
                    className="mt-auto bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 self-start"
                  >
                    Add to Order
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Bottom bar for store selection */}
      <div className="bg-green-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <p>For item availability</p>
            <button className="underline">Choose a store</button>
          </div>
          <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center">
            1
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;