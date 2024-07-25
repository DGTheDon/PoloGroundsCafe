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
import './App.css';

function AppContent() {
  // State variables
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState({});
  const location = useLocation();

  // Effect to handle authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Function to update cart count
  const updateCartCount = (count) => {
    setCartCount(count);
  };

  // Function to add item to cart
  const addToCart = (item) => {
    setCart(prevCart => ({
      ...prevCart,
      [item.id]: (prevCart[item.id] || 0) + 1
    }));
    setCartCount(prevCount => prevCount + 1);
  };

  // Function to open modal (placeholder for now)
  const openModal = (title, description, price) => {
    // Implement actual modal functionality here if needed
    console.log(`Added to cart: ${title}, ${description}, $${price}`);
  };

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App flex flex-col min-h-screen">
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