import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ user, cartCount, onSignOut }) => {
  return (
    <header>
      <div className="header-container">
        <img src="/images/logo.png" alt="Polo Grounds Cafe Logo" className="logo" />
        <nav>
          <Link to="/menu">Menu</Link>
          <Link to="/rewards">Rewards</Link>
          <Link to="/gift-cards">Gift Cards</Link>
        </nav>
        <div className="cta-buttons">
          <Link to="/store-locator" className="find-store">Find a store</Link>
          {user ? (
            <>
              <Link to="/profile" className="sign-in">Profile</Link>
              <button onClick={onSignOut} className="join-now">Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="sign-in">Sign in</Link>
              <Link to="/register" className="join-now">Join now</Link>
            </>
          )}
          <div id="cart-icon">
            🛒
            <span id="cart-count">{cartCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;