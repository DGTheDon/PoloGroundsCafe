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
import RewardsPage from './components/RewardsPage'; // Add this import
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState({});

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
    console.log(`Added to cart: ${title}, ${description}, $${price}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header user={user} cartCount={cartCount} />
      <main className="flex-grow">
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
          <Route path="/rewards" element={<RewardsPage />} /> {/* Add this line */}
        </Routes>
      </main>
      <Footer />
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