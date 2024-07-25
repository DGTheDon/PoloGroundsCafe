import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>Drinks</h2>
      <ul>
        <li><a href="#iced-energy">Iced Energy</a></li>
        <li><a href="#hot-coffees">Hot Coffees</a></li>
        <li><a href="#cold-coffees">Cold Coffees</a></li>
        <li><a href="#refreshers">Polo Grounds Refreshers™</a></li>
        <li><a href="#iced-teas">Iced Teas</a></li>
        <li><a href="#hot-teas">Hot Teas</a></li>
        <li><a href="#frappuccinos">Frappuccino® Blended Beverages</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;