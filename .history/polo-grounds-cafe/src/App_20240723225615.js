import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '', price: 0 });
  const location = useLocation();

  useEffect(() => {
    console.log('Route changed:', location.pathname);
  }, [location]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  const addToCart = (item) => {
    setCart(prevCart => ({
      ...prevCart,
      [item.id]: (prevCart[item.id] || 0) + 1
    }));
    setCartCount(prevCount => prevCount + 1);
  };

  const openModal = (title, description, price) => {
    setModalContent({ title, description, price });
    setModalOpen(true);
    console.log(`Added to cart: ${title}, ${description}, $${price}`);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App flex flex-col min-h-screen">
      <Header user={user} cartCount={cartCount} />
      <main className="flex-grow pt-16"> {/* Kept the pt-16 for spacing */}
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/profile" element={<UserProfile user={user} />} />
          <Route path="/gift-cards" element={<GiftCards />} />
        </Routes>
      </main>
      <Footer cartCount={cartCount} />
      {modalOpen && <Modal {...modalContent} onClose={closeModal} />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;