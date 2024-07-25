import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import OrderConfirmation from './components/OrderConfirmation';
import UserProfile from './components/UserProfile';
import GiftCards from './components/GiftCards';
import Modal from './components/Modal';
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

  const addToCart = (item) => {
    setCartCount(prevCount => prevCount + 1);
    // Additional cart logic can be added here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header user={user} cartCount={cartCount} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/menu" 
              element={
                <Menu 
                  openModal={openModal} 
                  updateCartCount={updateCartCount} 
                  addToCart={addToCart}
                />
              } 
            />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/profile" element={<UserProfile user={user} />} />
            <Route path="/gift-cards" element={<GiftCards />} />
          </Routes>
        </main>
        <Footer cartCount={cartCount} />
        {modalOpen && <Modal {...modalContent} onClose={closeModal} />}
      </div>
    </Router>
  );
}

export default App;