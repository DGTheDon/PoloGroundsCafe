import React, { useState } from 'react';
import DrinkDetail from './DrinkDetail';

// Expanded menu items array with at least one item for each category
const menuItems = [
  { 
    id: 1, 
    name: 'Melon Burst Iced Energy', 
    description: 'VENTI ONLY: A sparkling boost of sugar-free energy, chilled to perfection. Refreshing flavors of melon and cucumber balanced with bright Passion Tango® tea, served over ice. The ultimate afternoon jump start. 180 mg caffeine.', 
    price: 4.50, 
    category: 'Drinks', 
    subCategory: 'Iced Energy',
    calories: 10,
    sugar: '0g',
    fat: '0g',
    stars: 200,
    image: '/api/placeholder/400/600'
  },
  {
    id: 2,
    name: 'Classic Cappuccino',
    description: 'A perfect balance of rich espresso, steamed milk, and a layer of velvety foam.',
    price: 3.75,
    category: 'Drinks',
    subCategory: 'Hot Coffees',
    calories: 120,
    sugar: '10g',
    fat: '4g',
    stars: 180,
    image: '/api/placeholder/400/600'
  },
  {
    id: 3,
    name: 'Iced Caramel Macchiato',
    description: 'Smooth espresso layered with vanilla-flavored syrup, milk, and caramel drizzle over ice.',
    price: 4.25,
    category: 'Drinks',
    subCategory: 'Cold Coffees',
    calories: 250,
    sugar: '35g',
    fat: '7g',
    stars: 220,
    image: '/api/placeholder/400/600'
  },
  {
    id: 4,
    name: 'Strawberry Açaí Refresher',
    description: 'Sweet strawberry flavors accented by passion fruit and açaí notes, served over ice.',
    price: 3.95,
    category: 'Drinks',
    subCategory: 'Starbucks Refreshers® Beverages',
    calories: 90,
    sugar: '20g',
    fat: '0g',
    stars: 190,
    image: '/api/placeholder/400/600'
  },
  {
    id: 5,
    name: 'Mocha Frappuccino',
    description: 'Coffee, milk, and ice blended with rich mocha sauce and topped with whipped cream.',
    price: 4.95,
    category: 'Drinks',
    subCategory: 'Frappuccino® Blended Beverages',
    calories: 370,
    sugar: '54g',
    fat: '15g',
    stars: 210,
    image: '/api/placeholder/400/600'
  },
  {
    id: 6,
    name: 'Peach Green Tea Lemonade',
    description: 'Green tea blended with peach flavor and lemonade, then served over ice.',
    price: 3.75,
    category: 'Drinks',
    subCategory: 'Iced Tea and Lemonade',
    calories: 60,
    sugar: '12g',
    fat: '0g',
    stars: 170,
    image: '/api/placeholder/400/600'
  },
  {
    id: 7,
    name: 'Chai Tea Latte',
    description: 'Black tea infused with cinnamon, clove, and other warming spices combined with steamed milk.',
    price: 4.25,
    category: 'Drinks',
    subCategory: 'Hot Teas',
    calories: 240,
    sugar: '42g',
    fat: '4.5g',
    stars: 185,
    image: '/api/placeholder/400/600'
  },
  {
    id: 8,
    name: 'Chocolate Smoothie',
    description: 'A creamy blend of chocolate, banana, and whey protein with ice.',
    price: 5.25,
    category: 'Drinks',
    subCategory: 'Milk, Juice & More',
    calories: 320,
    sugar: '34g',
    fat: '5g',
    stars: 195,
    image: '/api/placeholder/400/600'
  },
  {
    id: 9,
    name: 'Sparkling Water',
    description: 'Refreshing carbonated water with a hint of natural flavors.',
    price: 2.50,
    category: 'Drinks',
    subCategory: 'Bottled Beverages',
    calories: 0,
    sugar: '0g',
    fat: '0g',
    stars: 150,
    image: '/api/placeholder/400/600'
  },
];

const categories = ['Menu', 'Featured', 'Previous', 'Favorites'];
const drinkSubCategories = [
  'Iced Energy', 'Hot Coffees', 'Cold Coffees', 'Starbucks Refreshers® Beverages', 
  'Frappuccino® Blended Beverages', 'Iced Tea and Lemonade', 'Hot Teas', 'Milk, Juice & More',
  'Bottled Beverages'
];

const Menu = ({ openModal, updateCartCount, addToCart }) => {
  // State for managing selected category, subcategory, and drink
  const [selectedCategory, setSelectedCategory] = useState('Menu');
  const [selectedSubCategory, setSelectedSubCategory] = useState('Iced Energy');
  const [selectedDrink, setSelectedDrink] = useState(null);

  // Function to add an item to the order
  const addToOrder = (item) => {
    addToCart(item);
    updateCartCount(prevCount => prevCount + 1);
    openModal(item.name, `Added ${item.name} to your order`, item.price);
  };

  // Function to handle clicking on a drink to view details
  const handleDrinkClick = (drink) => {
    setSelectedDrink(drink);
  };

  // Function to go back to the menu from drink details
  const handleBackToMenu = () => {
    setSelectedDrink(null);
  };

  // If a drink is selected, show its details
  if (selectedDrink) {
    return <DrinkDetail drink={selectedDrink} onBack={handleBackToMenu} addToOrder={addToOrder} />;
  }

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
                  <h3 className="text-lg font-semibold cursor-pointer" onClick={() => handleDrinkClick(item)}>{item.name}</h3>
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