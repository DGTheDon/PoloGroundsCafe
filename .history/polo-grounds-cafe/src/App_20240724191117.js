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
import CartPage from './components/CartPage';
import OrderConfirmation from './components/OrderConfirmation';
import UserProfile from './components/UserProfile';
import GiftCards from './components/GiftCards';
import './App.css';

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState({});
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

  const addToCart = (item) => {
    setCartItems(prevCart => {
      const updatedCart = { ...prevCart };
      if (updatedCart[item.id]) {
        updatedCart[item.id] = {
          ...updatedCart[item.id],
          quantity: updatedCart[item.id].quantity + 1
        };
      } else {
        updatedCart[item.id] = { ...item, quantity: 1 };
      }
      return updatedCart;
    });
  };

  const removeItemFromCart = (itemId) => {
    setCartItems(prevCart => {
      const updatedCart = { ...prevCart };
      delete updatedCart[itemId];
      return updatedCart;
    });
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItemFromCart(itemId);
    } else {
      setCartItems(prevCart => ({
        ...prevCart,
        [itemId]: { ...prevCart[itemId], quantity: newQuantity }
      }));
    }
  };

  const clearEntireCart = () => {
    setCartItems({});
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App flex flex-col min-h-screen">
      <Header user={user} cartCount={getCartCount()} />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/menu" 
            element={
              <Menu 
                addToCart={addToCart}
              />
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/cart" 
            element={
              <CartPage 
                cartItems={cartItems}
                removeItemFromCart={removeItemFromCart}
                updateCartItemQuantity={updateCartItemQuantity}
                clearEntireCart={clearEntireCart}
              />
            } 
          />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/profile" element={<UserProfile user={user} />} />
          <Route path="/gift-cards" element={<GiftCards />} />
        </Routes>
      </main>
      <Footer cartCount={getCartCount()} />
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