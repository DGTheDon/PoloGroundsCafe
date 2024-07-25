import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import OrderConfirmation from './components/OrderConfirmation';
import UserProfile from './components/UserProfile';
import Modal from './components/Modal';
import Sidebar from './components/Sidebar';  // Make sure this import exists
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '', price: 0 });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openModal = (title, description, price) => {
    setModalContent({ title, description, price });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Header user={user} cartCount={cartCount} />
        <div className="flex">
          <Sidebar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/menu" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/menu" />} />
              <Route path="/menu" element={<Menu openModal={openModal} updateCartCount={updateCartCount} />} />
              <Route path="/order-confirmation" element={user ? <OrderConfirmation /> : <Navigate to="/login" />} />
              <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
        {modalOpen && <Modal {...modalContent} onClose={closeModal} />}
      </div>
    </Router>
  );
}

export default App;