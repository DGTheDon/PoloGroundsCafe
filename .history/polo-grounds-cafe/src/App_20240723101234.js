import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
const Menu = React.lazy(() => import('./components/Menu'));

function AppContent() {
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
  };

  const openModal = (title, description, price) => {
    console.log(`Added to cart: ${title}, ${description}, $${price}`);
    // Implement actual modal functionality here
  };

  return (
    <div className="App flex flex-col min-h-screen">
      <Header cartCount={cartCount} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/menu" 
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Menu 
                  openModal={openModal} 
                  updateCartCount={updateCartCount} 
                  addToCart={addToCart} 
                />
              </Suspense>
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