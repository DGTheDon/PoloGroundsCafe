import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Menu from './components/Menu';
import Modal from './components/Modal';
import OrderConfirmation from './components/OrderConfirmation';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '', price: 0 });
  const [cartCount, setCartCount] = useState(0);

  const openModal = (title, description, price) => {
    setModalContent({ title, description, price });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
    closeModal();
  };

  return (
    <Router>
      <div className="App">
        <Header cartCount={cartCount} />
        <main>
          <Sidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/menu" element={<Menu openModal={openModal} />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </main>
        {modalOpen && <Modal {...modalContent} onClose={closeModal} onAddToCart={addToCart} />}
      </div>
    </Router>
  );
};

export default App;