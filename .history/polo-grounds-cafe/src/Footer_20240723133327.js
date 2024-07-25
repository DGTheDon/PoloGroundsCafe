import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ cartCount }) => {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link to="/our-company">Our Company</Link></li>
              <li><Link to="/our-coffee">Our Coffee</Link></li>
              <li><Link to="/stories">Stories and News</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Careers</h3>
            <ul className="space-y-2">
              <li><Link to="/culture">Culture and Values</Link></li>
              <li><Link to="/alumni">Alumni Community</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Social Impact</h3>
            <ul className="space-y-2">
              <li><Link to="/people">People</Link></li>
              <li><Link to="/planet">Planet</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">For Business Partners</h3>
            <ul className="space-y-2">
              <li><Link to="/landlord">Landlord Support Center</Link></li>
              <li><Link to="/suppliers">Suppliers</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-green-900 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <p>For item availability</p>
            <button className="underline">Choose a store</button>
          </div>
          {cartCount > 0 && (
            <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center">
              {cartCount}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;