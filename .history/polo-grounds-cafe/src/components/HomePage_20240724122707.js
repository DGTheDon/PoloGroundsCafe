import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <main className="flex-grow">
        {/* Crave-worthy pairings section */}
        <section className="relative h-96 bg-teal-200 text-green-800">
          <div className="container mx-auto h-full flex items-center">
            <div className="w-1/2">
              <img src="/api/placeholder/600/400" alt="Food pairings" className="rounded-lg shadow-lg" />
            </div>
            <div className="w-1/2 pl-12">
              <h2 className="text-4xl font-bold mb-4">Crave-worthy pairings</h2>
              <p className="mb-6 text-xl">Including our new, best-ever iced coffee. Restrictions apply.</p>
              <Link to="/menu" className="bg-green-800 text-white px-6 py-2 rounded-full text-lg hover:bg-green-700 inline-flex items-center">
                Learn more <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Personal cups for good section */}
        <section className="py-16 bg-green-100">
          <div className="container mx-auto flex items-center">
            <div className="w-1/2 pr-12">
              <h2 className="text-3xl font-bold mb-4 text-green-800">Personal cups for good</h2>
              <p className="mb-6 text-xl text-green-700">Your choice is a positive and responsible one—because bringing your clean reusable cup helps our planet.</p>
              <Link to="/sustainability" className="text-green-800 underline font-semibold hover:text-green-600">
                Learn more
              </Link>
            </div>
            <div className="w-1/2">
              <div className="bg-white p-8 rounded-full w-64 h-64 mx-auto flex items-center justify-center">
                <Coffee size={100} className="text-green-700" />
              </div>
            </div>
          </div>
        </section>

        {/* Our treat to you section */}
        <section className="py-16 bg-green-800 text-white">
          <div className="container mx-auto flex items-center">
            <div className="w-1/2">
              <img src="/api/placeholder/400/600" alt="Starbucks drink" className="rounded-lg shadow-lg" />
            </div>
            <div className="w-1/2 pl-12">
              <h2 className="text-4xl font-bold mb-4">Our treat to you</h2>
              <p className="mb-6 text-xl">Join Polo Grounds Rewards and savor our gift to you: a free drink with qualifying purchase during your first week. Valid for one-time use.*</p>
              <Link to="/rewards" className="bg-white text-green-800 px-6 py-2 rounded-full text-lg hover:bg-green-100 inline-flex items-center">
                Join now <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Sunny-day essentials section */}
        <section className="py-16 bg-purple-600 text-white">
          <div className="container mx-auto flex items-center">
            <div className="w-1/2 pr-12">
              <h2 className="text-4xl font-bold mb-4">Sunny-day essentials</h2>
              <p className="mb-6 text-xl">Flavorful creations sure to brighten any summer day.</p>
              <Link to="/menu" className="bg-white text-purple-600 px-6 py-2 rounded-full text-lg hover:bg-purple-100 inline-flex items-center">
                Order now <ArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="w-1/2">
              <div className="flex justify-between">
                <img src="/api/placeholder/150/300" alt="Iced tea" className="rounded-lg shadow-lg" />
                <img src="/api/placeholder/150/300" alt="Iced coffee" className="rounded-lg shadow-lg" />
                <img src="/api/placeholder/150/300" alt="Frappuccino" className="rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-4 text-center text-sm">
        <p>*Valid only for new Polo Grounds Rewards members for 7 days from sign up. Offer good at participating stores for a handcrafted menu-sized beverage with eligible purchase ($8 max value). Taxes not included. Excludes alcohol, Polo Grounds Card and Polo Grounds Card reloads. Limit one per member. Cannot be combined with other offers or discounts. Product availability varies by store. Excludes delivery services. Sign up from 8/16/2024 - 9/16/2024 to be eligible.</p>
      </footer>
    </div>
  );
};

export default HomePage;