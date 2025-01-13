import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Description */}
        <div className="footer-section">
          <h2 className="footer-logo">Your Logo</h2>
          <p className="footer-description">
            Bringing the best products and services right to your doorstep.
          </p>
        </div>

        {/* Links Section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="footer-contact">
            <li><i className="fas fa-map-marker-alt"></i> 123 Main Street, Your City</li>
            <li><i className="fas fa-phone-alt"></i> +1 (555) 123-4567</li>
            <li><i className="fas fa-envelope"></i> support@yourcompany.com</li>
          </ul>
        </div>

        {/* Subscription Section */}
        <div className="footer-section">
          <h3>Subscribe</h3>
          <p>Stay updated with our latest news and offers.</p>
          <form className="footer-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="footer-input"
            />
            <button type="submit" className="footer-button">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>

      {/* Copyright */}
      <div className="footer-copy">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
