import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ cartCount }) => {
  return (
    <footer className="bg-green-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <p>&copy; 2024 Polo Grounds Cafe. All rights reserved.</p>
          </div>
          <div>
            <Link to="/menu" className="hover:underline">Menu</Link>
            <span className="mx-2">|</span>
            <Link to="/gift-cards" className="hover:underline">Gift Cards</Link>
            {cartCount > 0 && (
              <>
                <span className="mx-2">|</span>
                <span>Cart: {cartCount}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;