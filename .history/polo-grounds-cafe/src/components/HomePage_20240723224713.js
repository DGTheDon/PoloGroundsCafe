import React from 'react';
import { Coffee, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="relative h-96 bg-green-700 text-white">
          <img src="/api/placeholder/1200/400" alt="Featured Drink" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Our treat to you</h2>
              <p className="mb-4">Join Polo Grounds Rewards and savor our gift to you: a free drink with qualifying purchase during your first week.</p>
              <button className="bg-white text-green-800 px-6 py-2 rounded-full text-lg hover:bg-green-100">Join now</button>
            </div>
          </div>
        </section>

        <section className="py-12 bg-green-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-green-800">Meet the Polo Grounds Pairings Menu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img src="/api/placeholder/300/200" alt="Coffee and Croissant" className="w-full h-48 object-cover rounded mb-4" />
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-green-800">Latte & Croissant</span>
                  <span className="text-green-700 font-bold">STARTING AT $5</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img src="/api/placeholder/300/200" alt="Cold Brew and Sandwich" className="w-full h-48 object-cover rounded mb-4" />
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-green-800">Cold Brew & Sandwich</span>
                  <span className="text-green-700 font-bold">STARTING AT $6</span>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="bg-green-600 text-white px-6 py-2 rounded-full text-lg hover:bg-green-700">Learn more</button>
            </div>
          </div>
        </section>

        <section className="py-12 bg-green-100">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-green-800">Personal cups for good</h2>
            <p className="mb-6 text-green-700">Your choice is a positive and responsible one—because bringing your clean reusable cup helps our planet.</p>
            <div className="flex justify-center">
              <Coffee size={48} className="text-green-700" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-50 py-8">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <h3 className="font-bold mb-2 text-green-800">About Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-600 hover:text-green-700">Our Company</a></li>
              <li><a href="#" className="text-green-600 hover:text-green-700">Our Coffee</a></li>
              <li><a href="#" className="text-green-600 hover:text-green-700">Stories and News</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-green-800">Careers</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-600 hover:text-green-700">Culture and Values</a></li>
              <li><a href="#" className="text-green-600 hover:text-green-700">Alumni Community</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-green-800">Social Impact</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-600 hover:text-green-700">People</a></li>
              <li><a href="#" className="text-green-600 hover:text-green-700">Planet</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-green-800">For Business Partners</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-600 hover:text-green-700">Landlord Support Center</a></li>
              <li><a href="#" className="text-green-600 hover:text-green-700">Suppliers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-green-800">Order and Pickup</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-600 hover:text-green-700">Order on the App</a></li>
              <li><a href="#" className="text-green-600 hover:text-green-700">Order on the Web</a></li>
              <li><a href="#" className="text-green-600 hover:text-green-700">Delivery</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-8 flex justify-between items-center">
          <div className="flex space-x-4">
            <a href="#" className="text-green-600 hover:text-green-700"><Facebook size={24} /></a>
            <a href="#" className="text-green-600 hover:text-green-700"><Twitter size={24} /></a>
            <a href="#" className="text-green-600 hover:text-green-700"><Instagram size={24} /></a>
            <a href="#" className="text-green-600 hover:text-green-700"><Youtube size={24} /></a>
          </div>
          <p className="text-sm text-green-600">&copy; 2024 Polo Grounds Cafe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;