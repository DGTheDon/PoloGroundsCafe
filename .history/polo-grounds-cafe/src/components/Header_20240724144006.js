import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const Header = ({ user, cartCount }) => {
  const location = useLocation();

  console.log('Header rendering, user:', user, 'cartCount:', cartCount);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center">
          {/* Square logo container */}
          <Link to="/" className="mr-8">
            <div className="h-12 w-12 bg-gray-200 flex items-center justify-center">
              {/* Replace with your actual logo */}
              <img src="polo-grounds-cafe/src/components/pologroundscafelogo.png" alt="Polo Grounds Cafe Logo" className="max-h-full max-w-full" />
            </div>
          </Link>
          
          {/* Navigation links */}
          <nav className="hidden md:flex space-x-6">
            {['MENU', 'REWARDS', 'GIFT CARDS'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-800 hover:text-green-700 font-semibold relative"
              >
                {item}
                {/* Green rectangle under the active page */}
                {location.pathname === `/${item.toLowerCase().replace(' ', '-')}` && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-green-700 transition-all duration-300"></div>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right-side actions */}
        <div className="flex items-center space-x-4">
          {/* Store locator */}
          <Link to="/store-locator" className="flex items-center text-gray-800 hover:text-green-700">
            <MapPin className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">Find a store</span>
          </Link>

          {/* Authentication buttons */}
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

          {/* Cart icon */}
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