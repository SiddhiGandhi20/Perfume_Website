import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <ul className="left">
        <li>
        <Link to="/buyperfumes">EXCLUSIVE</Link>
        </li>
        <li>
        <Link to="/women">WOMEN</Link>
        </li>
        <li>
        <Link to="/men">MEN</Link>
        </li>
      </ul>
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2>AROMA</h2>
          <p>PERFUMES</p>
        </Link>
      </div>
      <ul className="right">
        <li>
        <Link to="/about">ABOUT US</Link>
        </li>
        <li>
        <Link to="/contactus">CONTACT US</Link>
        </li>
          <li>
          <Link to="/cart">CART</Link>
        </li>
        <li>
        <Link to="/account">ACCOUNT</Link>
        </li>
       

      </ul>
    </nav>
  );
}

export default Navbar;
