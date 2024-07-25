import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <header className="bg-amber-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Polo Grounds Cafe</h1>
          <nav>
            <Link to="/menu" className="text-white hover:text-amber-200 mr-4">Menu</Link>
            <button onClick={handleLogout} className="text-white hover:text-amber-200">Logout</button>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Welcome, {user.email}!</h2>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link to="/menu" className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition duration-300">
              Place New Order
            </Link>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
              View Order History
            </button>
          </div>
        </div>
      </main>
      
      <footer className="bg-amber-800 text-white py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Polo Grounds Cafe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;