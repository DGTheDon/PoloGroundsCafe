import React from 'react';
import { Coffee } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="relative h-screen bg-green-700 text-white">
          <img src="/api/placeholder/1200/800" alt="Featured Drink" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-4">Welcome to Polo Grounds Cafe</h2>
              <p className="text-xl mb-6">Experience the finest coffee and treats in town</p>
              <button className="bg-white text-green-800 px-8 py-3 rounded-full text-lg hover:bg-green-100 transition duration-300">
                Explore Our Menu
              </button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-green-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-green-800">Our Commitment to Quality</h2>
            <p className="mb-8 text-green-700 max-w-2xl mx-auto">
              At Polo Grounds Cafe, we're dedicated to serving you the finest coffee and food,
              sourced responsibly and prepared with care.
            </p>
            <div className="flex justify-center">
              <Coffee size={64} className="text-green-700" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;