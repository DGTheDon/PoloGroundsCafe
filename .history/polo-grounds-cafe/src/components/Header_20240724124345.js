import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const Header = ({ user, cartCount }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-8">
            <img src="/path-to-your-logo.png" alt="Polo Grounds Cafe Logo" className="h-12 w-auto" />
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/menu" className="text-gray-800 hover:text-green-700 font-semibold">MENU</Link>
            <Link to="/rewards" className="text-gray-800 hover:text-green-700 font-semibold">REWARDS</Link>
            <Link to="/gift-cards" className="text-gray-800 hover:text-green-700 font-semibold">GIFT CARDS</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/store-locator" className="flex items-center text-gray-800 hover:text-green-700">
            <MapPin className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">Find a store</span>
          </Link>
          {user ? (
            <Link to="/profile" className="bg-white text-gray-800 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">
              Profile
            </Link>
          ) : (
            <>
              <Link to="/login" className="bg-white text-gray-800 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100">
                Sign in
              </Link>
              <Link to="/register" className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800">
                Join now
              </Link>
            </>
          )}
          {cartCount > 0 && (
            <div className="relative">
              <Link to="/cart" className="text-gray-800 hover:text-green-700">
                🛒
                <span className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;