import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Menu from './components/Menu';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState({});

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
    // Implement modal functionality here
    console.log(`Added to cart: ${title}, ${description}, $${price}`);
  };

  return (
    <Router>
      <div className="App">
        <Header cartCount={cartCount} />
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
      </div>
    </Router>
  );
}

export default App;