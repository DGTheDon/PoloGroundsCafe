import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Polo Grounds Cafe</h1>
      <p className="mb-4">Enjoy our artisanal coffee and delicious pastries!</p>
      <button className="bg-green-500 text-white px-4 py-2 rounded">Order Now</button>
      <Link to="/login" className="ml-4 text-blue-500 hover:underline">Login</Link>
    </div>
  );
};

export default HomePage;