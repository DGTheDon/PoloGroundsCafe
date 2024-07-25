import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-amber-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Polo Grounds Cafe</h1>
          <nav>
            <Link to="/login" className="text-white hover:text-amber-200">Login</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-10 p-4">
        <h2 className="text-4xl font-bold mb-4">Welcome to Polo Grounds Cafe</h2>
        <p className="mb-6">Experience the rich history and flavors of our neighborhood cafe.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Artisanal Coffee</h3>
            <p>Savor our expertly roasted, locally sourced coffee beans.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Fresh Pastries</h3>
            <p>Indulge in our daily selection of freshly baked goods.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Community Hub</h3>
            <p>Join us for events and meet your neighbors in a cozy atmosphere.</p>
          </div>
        </div>

        <button className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition duration-300">
          Order Now
        </button>
      </main>

      <footer className="bg-amber-800 text-white py-4 mt-10">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Polo Grounds Cafe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;