import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // Here you would typically fetch the user's orders from your database
        // For now, we'll use dummy data
        setOrders([
          { id: 1, date: '2024-07-21', items: ['Latte', 'Croissant'], total: 8.50 },
          { id: 2, date: '2024-07-20', items: ['Cappuccino', 'Blueberry Muffin'], total: 7.75 },
        ]);
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
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to Polo Grounds Cafe, {user.email}!</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Your Recent Orders</h2>
          {orders.length > 0 ? (
            <ul>
              {orders.map(order => (
                <li key={order.id} className="mb-2 p-2 bg-amber-100 rounded">
                  <p>Date: {order.date}</p>
                  <p>Items: {order.items.join(', ')}</p>
                  <p>Total: ${order.total.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven't placed any orders yet.</p>
          )}
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
          <button className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition duration-300">
            Place New Order
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            View Full Order History
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;