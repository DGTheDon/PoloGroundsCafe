import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <header className="bg-amber-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Polo Grounds Cafe</h1>
          <nav>
            <Link to="/login" className="text-white hover:text-amber-200 mr-4">Login</Link>
            <Link to="/register" className="text-white hover:text-amber-200">Register</Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Welcome to Polo Grounds Cafe</h2>
          <p className="text-xl mb-8">Enjoy our artisanal coffee and delicious pastries!</p>
          <Link to="/menu" className="bg-amber-600 text-white px-6 py-3 rounded-full text-lg hover:bg-amber-700 transition duration-300">
            View Our Menu
          </Link>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Artisanal Coffee</h3>
            <p>Savor our expertly roasted, locally sourced coffee beans.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Fresh Pastries</h3>
            <p>Indulge in our daily selection of freshly baked goods.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Cozy Atmosphere</h3>
            <p>Enjoy your favorites in our warm and inviting cafe setting.</p>
          </div>
        </section>
      </main>
      
      <footer className="bg-amber-800 text-white py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Polo Grounds Cafe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;