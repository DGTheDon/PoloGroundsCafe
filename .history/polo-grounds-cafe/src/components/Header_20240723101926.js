import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ user, cartCount }) => {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="header-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex-shrink-0">
            <img src="/images/logo.png" alt="Polo Grounds Cafe Logo" className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:ml-6 md:flex md:space-x-8">
            <Link to="/menu" className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Menu</Link>
            <Link to="/rewards" className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Rewards</Link>
            <Link to="/gift-cards" className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Gift Cards</Link>
          </nav>
        </div>
        <div className="flex items-center">
          <Link to="/store-locator" className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium mr-2">Find a store</Link>
          {user ? (
            <>
              <Link to="/profile" className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
              <Link to="/logout" className="bg-green-600 text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium ml-2">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Sign in</Link>
              <Link to="/register" className="bg-green-600 text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium ml-2">Join now</Link>
            </>
          )}
          <div className="ml-4 flex items-center">
            <span className="bg-gray-100 p-2 rounded-full">
              🛒
              <span className="ml-1 text-sm font-medium text-gray-700">{cartCount}</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;