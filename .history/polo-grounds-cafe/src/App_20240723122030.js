import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';  // Import Menu normally

function AppContent() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState({});
  const location = useLocation();

  useEffect(() => {
    console.log('Route changed:', location.pathname);
  }, [location]);

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
    // Implement actual modal functionality here
  };

  return (
    <div className="App flex flex-col min-h-screen">
      <Header user={user} cartCount={cartCount} />
      <main className="flex-grow pt-16"> {/* Keep the pt-16 for spacing */}
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
        </Routes>
      </main>
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