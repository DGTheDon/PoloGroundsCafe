import React, { useState } from 'react';
import { ArrowLeft, MapPin, Wand2, Info, Star, Plus, Minus, ChevronDown } from 'lucide-react';

const DrinkDetail = ({ drink, onBack, addToOrder }) => {
  const [size, setSize] = useState('Venti');
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState([]);
  const [showNutrition, setShowNutrition] = useState(false);

  const handleAddToOrder = () => {
    const customizedDrink = {
      ...drink,
      size,
      quantity,
      customizations,
    };
    addToOrder(customizedDrink);
  };

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const sizeOptions = ['Tall', 'Grande', 'Venti'];
  const customizationOptions = ['Extra Shot', 'Sugar-Free Syrup', 'Whipped Cream', 'Extra Ice'];

  return (
    <div className="flex flex-col min-h-screen bg-green-900 text-white">
      {/* Navigation */}
      <div className="p-4 border-b border-green-700">
        <div className="container mx-auto">
          <button onClick={onBack} className="flex items-center text-sm hover:text-green-300 transition duration-300">
            <ArrowLeft size={16} className="mr-2" />
            Menu / {drink.subCategory} / {drink.name}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Image and quick facts */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <img src={drink.image || "/api/placeholder/400/600"} alt={drink.name} className="w-full h-auto rounded-lg shadow-lg mb-6" />
            <div className="bg-green-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-green-300">Calories</p>
                  <p className="text-2xl font-bold">{drink.calories}</p>
                </div>
                <div>
                  <p className="text-green-300">Sugar</p>
                  <p className="text-2xl font-bold">{drink.sugar}</p>
                </div>
                <div>
                  <p className="text-green-300">Fat</p>
                  <p className="text-2xl font-bold">{drink.fat}</p>
                </div>
                <div>
                  <p className="text-green-300">Rating</p>
                  <p className="text-2xl font-bold flex items-center">
                    {drink.stars} <Star size={20} className="ml-1 text-yellow-400 fill-current" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Details and customization */}
          <div className="w-full lg:w-1/2 lg:pl-8">
            <h1 className="text-4xl font-bold mb-2">{drink.name}</h1>
            <p className="text-xl mb-6">{drink.description}</p>

            {/* Size selection */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Size options</h3>
              <div className="flex space-x-4">
                {sizeOptions.map((sizeOption) => (
                  <button
                    key={sizeOption}
                    onClick={() => setSize(sizeOption)}
                    className={`px-6 py-3 rounded-full transition duration-300 ${
                      size === sizeOption ? 'bg-green-600 text-white' : 'bg-green-800 text-green-300 hover:bg-green-700'
                    }`}
                  >
                    {sizeOption}
                  </button>
                ))}
              </div>
            </div>

            {/* Customizations */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Customizations</h3>
              <div className="grid grid-cols-2 gap-4">
                {customizationOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setCustomizations([...customizations, option])}
                    className="flex items-center justify-between px-4 py-2 bg-green-800 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    <span>{option}</span>
                    <Plus size={16} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity selector */}
            <div className="flex items-center mb-6">
              <button onClick={() => handleQuantityChange(-1)} className="p-2 bg-green-800 rounded-full hover:bg-green-700 transition duration-300">
                <Minus size={20} />
              </button>
              <span className="mx-4 text-2xl font-bold">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="p-2 bg-green-800 rounded-full hover:bg-green-700 transition duration-300">
                <Plus size={20} />
              </button>
            </div>

            {/* Add to Order button */}
            <button 
              onClick={handleAddToOrder}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-500 transition duration-300 text-lg font-semibold"
            >
              Add to Order - ${(drink.price * quantity).toFixed(2)}
            </button>

            {/* Nutrition information */}
            <div className="mt-8">
              <button 
                onClick={() => setShowNutrition(!showNutrition)}
                className="flex items-center justify-between w-full py-2 text-left text-green-300 hover:text-white transition duration-300"
              >
                <span className="text-lg font-semibold">Nutrition & Allergen Info</span>
                <ChevronDown size={20} className={`transform transition-transform duration-300 ${showNutrition ? 'rotate-180' : ''}`} />
              </button>
              {showNutrition && (
                <div className="mt-4 bg-green-800 p-4 rounded-lg">
                  <p className="mb-2">Detailed nutrition information and allergen details go here.</p>
                  <a href="#" className="text-green-300 hover:text-white transition duration-300">View full nutrition facts</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-green-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <p className="text-sm">For item availability</p>
            <button className="text-green-300 hover:text-white transition duration-300">Choose a store</button>
          </div>
          <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center">
            {quantity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkDetail;