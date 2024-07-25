import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ user, cartCount, onSignOut }) => {
  return (
    <header className="bg-amber-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Polo Grounds Cafe</Link>
        <nav className="flex items-center">
          <Link to="/menu" className="mr-4 hover:text-amber-200">Menu</Link>
          {user ? (
            <>
              <Link to="/profile" className="mr-4 hover:text-amber-200">Profile</Link>
              <button onClick={onSignOut} className="mr-4 hover:text-amber-200">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 hover:text-amber-200">Login</Link>
              <Link to="/register" className="mr-4 hover:text-amber-200">Register</Link>
            </>
          )}
          <div className="relative">
            <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartCount}
            </span>
            🛒
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;