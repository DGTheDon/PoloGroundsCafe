import React, { useState } from 'react';
import { ArrowLeft, MapPin, Wand2, Info } from 'lucide-react';

const DrinkDetail = ({ drink, onBack, addToOrder }) => {
  const [size, setSize] = useState('Venti');
  const [customizations, setCustomizations] = useState([]);

  const handleAddToOrder = () => {
    const customizedDrink = {
      ...drink,
      size,
      customizations,
    };
    addToOrder(customizedDrink);
  };

  return (
    <div className="flex flex-col min-h-screen bg-dark-green text-white">
      {/* Navigation */}
      <div className="p-4 border-b border-green-700">
        <div className="container mx-auto">
          <button onClick={onBack} className="flex items-center text-sm">
            <ArrowLeft size={16} className="mr-2" />
            Menu / Iced Energy / {drink.name}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img src={drink.image || "/api/placeholder/400/600"} alt={drink.name} className="w-full h-auto rounded-lg shadow-lg" />
          </div>

          {/* Right: Details */}
          <div className="w-full md:w-1/2 md:pl-8">
            <h1 className="text-4xl font-bold mb-2">{drink.name}</h1>
            <p className="text-xl mb-4">{drink.description}</p>
            <p className="text-lg mb-6">{drink.calories} calories</p>

            <div className="mb-8">
              <button className="bg-dark-green border border-white text-white px-6 py-3 rounded-full flex items-center hover:bg-green-800 transition duration-300">
                <MapPin size={18} className="mr-2" />
                Select a store to view availability
              </button>
            </div>

            <div className="mb-8">
              <button 
                onClick={() => setCustomizations([...customizations, 'Custom'])}
                className="bg-dark-green border border-white text-white px-6 py-3 rounded-full flex items-center hover:bg-green-800 transition duration-300"
              >
                <Wand2 size={18} className="mr-2" />
                Customize
              </button>
            </div>

            <div className="bg-darker-green p-6 rounded-lg mb-8">
              <p className="text-sm mb-2">{drink.stars}★ item</p>
              <p className="mb-4">{drink.description}</p>
              <p className="text-sm">{drink.calories} calories, {drink.sugar} sugar, {drink.fat} fat <Info size={16} className="inline ml-1" /></p>
              <button className="text-green-300 underline mt-2 hover:text-green-100 transition duration-300">Full nutrition & ingredients list</button>
            </div>

            {/* Size selection */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Size options</h3>
              <div className="flex space-x-4">
                {['Tall', 'Grande', 'Venti'].map((sizeOption) => (
                  <button
                    key={sizeOption}
                    onClick={() => setSize(sizeOption)}
                    className={`px-4 py-2 rounded-full ${size === sizeOption ? 'bg-green-600' : 'bg-dark-green border border-white'}`}
                  >
                    {sizeOption}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleAddToOrder}
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300"
            >
              Add to Order
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-darker-green text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <p className="text-sm">For item availability</p>
            <button className="underline text-green-300 hover:text-green-100 transition duration-300">Choose a store</button>
          </div>
          <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center">
            1
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkDetail;