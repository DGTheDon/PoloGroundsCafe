import React from 'react';
import { ArrowLeft, MapPin, Wand2 } from 'lucide-react';

const DrinkDetail = ({ drink, onBack, addToOrder }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-dark-green text-white p-4">
        <div className="container mx-auto">
          <button onClick={onBack} className="flex items-center">
            <ArrowLeft className="mr-2" />
            Menu / Iced Energy / {drink.name}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow bg-dark-green text-white">
        <div className="container mx-auto py-8 px-4 flex">
          {/* Left: Image */}
          <div className="w-1/2">
            <img src={drink.image || "/api/placeholder/400/600"} alt={drink.name} className="w-full h-auto" />
          </div>

          {/* Right: Details */}
          <div className="w-1/2 pl-8">
            <h1 className="text-4xl font-bold mb-2">{drink.name}</h1>
            <p className="text-xl mb-4">{drink.description}</p>
            <p className="text-lg mb-6">{drink.calories} calories</p>

            <div className="mb-8">
              <button className="bg-dark-green border border-white text-white px-6 py-3 rounded-full flex items-center">
                <MapPin className="mr-2" />
                Select a store to view availability
              </button>
            </div>

            <div className="mb-8">
              <button className="bg-dark-green border border-white text-white px-6 py-3 rounded-full flex items-center">
                <Wand2 className="mr-2" />
                Customize
              </button>
            </div>

            <div className="bg-darker-green p-6 rounded-lg mb-8">
              <p className="text-sm mb-2">{drink.stars} item</p>
              <p className="mb-4">{drink.description}</p>
              <p className="text-sm">{drink.calories} calories, {drink.sugar}g sugar, {drink.fat}g fat</p>
              <button className="text-green-300 underline mt-2">Full nutrition & ingredients list</button>
            </div>

            <button 
              onClick={() => addToOrder(drink)}
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700"
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

export default DrinkDetail;