import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-300">Our Company</a></li>
              <li><a href="#" className="hover:text-green-300">Our Coffee</a></li>
              <li><a href="#" className="hover:text-green-300">Stories and News</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Careers</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-300">Culture and Values</a></li>
              <li><a href="#" className="hover:text-green-300">Alumni Community</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Social Impact</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-300">People</a></li>
              <li><a href="#" className="hover:text-green-300">Planet</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">For Business Partners</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-300">Landlord Support Center</a></li>
              <li><a href="#" className="hover:text-green-300">Suppliers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Order and Pickup</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-300">Order on the App</a></li>
              <li><a href="#" className="hover:text-green-300">Order on the Web</a></li>
              <li><a href="#" className="hover:text-green-300">Delivery</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-green-300"><Facebook size={24} /></a>
            <a href="#" className="hover:text-green-300"><Twitter size={24} /></a>
            <a href="#" className="hover:text-green-300"><Instagram size={24} /></a>
            <a href="#" className="hover:text-green-300"><Youtube size={24} /></a>
          </div>
          <p className="text-sm">&copy; 2024 Polo Grounds Cafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;