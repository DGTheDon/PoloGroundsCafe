import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <img src="/images/logo.png" alt="Polo Grounds Cafe Logo" className="logo" />
        <nav>
          <a href="/menu">Menu</a>
          <a href="/rewards">Rewards</a>
          <a href="/gift-cards">Gift Cards</a>
        </nav>
        <div className="cta-buttons">
          <a href="/store-locator" className="find-store">Find a store</a>
          <a href="/signin" className="sign-in">Sign in</a>
          <a href="/join" className="join-now">Join now</a>
          <div id="cart-icon">
            🛒
            <span id="cart-count">0</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;