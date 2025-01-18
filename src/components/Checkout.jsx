import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePay } from '@fortawesome/free-brands-svg-icons'; // For brand icons like Google Pay and Paytm
import {faCreditCard} from '@fortawesome/free-solid-svg-icons';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import './Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const [paymentMethod, setPaymentMethod] = useState('');

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleConfirmPayment = () => {
    alert('Payment confirmed!');
  };

  return (
    <div className="container">
      {/* Left Side: Payment Form */}
      <div className="left-side">
        <h2><FontAwesomeIcon icon={faCreditCard} className="me-2" /> Payment Page</h2>

        {/* Personal Details Form */}
        <div className="checkout-summary">
          <h4>Enter Your Details</h4>
          <form id="payment-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" className="form-control" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-control" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" className="form-control" required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" className="form-control" required />
            </div>
          </form>
        </div>

        {/* Payment Methods */}
        <div className="payment-methods mt-4">
          <h4>Select Payment Method</h4>

          <div className="payment-method">
            <input 
              type="radio" 
              id="googlePay" 
              name="paymentMethod" 
              value="Google Pay" 
              onChange={() => handlePaymentMethodChange('Google Pay')}
            />
            <label htmlFor="googlePay">
              <FontAwesomeIcon icon={faGooglePay} className="payment-icon" /> Google Pay
            </label>
          </div>

          <div className="payment-method">
            <input 
              type="radio" 
              id="phonePe" 
              name="paymentMethod" 
              value="PhonePe" 
              onChange={() => handlePaymentMethodChange('PhonePe')}
            />
            <label htmlFor="phonePe">
              <FontAwesomeIcon icon={faMobileAlt} className="payment-icon" /> PhonePe
            </label>
          </div>

          <div className="payment-method">
            <input 
              type="radio" 
              id="paytm" 
              name="paymentMethod" 
              value="Paytm" 
              onChange={() => handlePaymentMethodChange('Paytm')}
            />
            <label htmlFor="paytm">
              <FontAwesomeIcon icon={faPaypal} className="payment-icon" /> Paytm
            </label>
          </div>

          <div className="payment-method">
            <input 
              type="radio" 
              id="cashOnDelivery" 
              name="paymentMethod" 
              value="Cash on Delivery" 
              onChange={() => handlePaymentMethodChange('Cash on Delivery')}
            />
            <label htmlFor="cashOnDelivery">
              <FontAwesomeIcon icon={faTruck} className="payment-icon" /> Cash on Delivery
            </label>
          </div>

          <div className="payment-method">
            <input 
              type="radio" 
              id="creditCard" 
              name="paymentMethod" 
              value="Credit/Debit Card" 
              onChange={() => handlePaymentMethodChange('Credit/Debit Card')}
            />
            <label htmlFor="creditCard">
              <FontAwesomeIcon icon={faCreditCard} className="payment-icon" /> Credit/Debit Card
            </label>
          </div>
        </div>

        {/* Credit/Debit Card Form */}
        {paymentMethod === 'Credit/Debit Card' && (
          <div className="card-details-form">
            <h5>Enter Card Details</h5>
            <form id="card-form">
              <div className="form-group">
                <label htmlFor="card-number">Card Number</label>
                <input type="text" id="card-number" className="form-control" placeholder="1234 5678 1234 5678" required />
              </div>
              <div className="form-group">
                <label htmlFor="expiry-date">Expiry Date</label>
                <input type="month" id="expiry-date" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" className="form-control" placeholder="123" required />
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Right Side: Cart Summary */}
      <div className="right-side">
        <div className="checkout-summary">
          <h4>Order Summary</h4>
          <div id="order-details">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <div className="item-details">
                  <span>{item.name}</span><br/>
                  <span> Quantity: {item.quantity}</span>
                </div>
                <div className="item-price">
                  ₹{(parseFloat(item.price) * parseInt(item.quantity, 10)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="total-section">
            <span>Total:</span>
            <span id="total-amount" className="total-amount">
              ₹{calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>

        {/* Confirm Payment Button */}
        <div className="text-center btn-container">
          <button onClick={handleConfirmPayment} className="btn btn-primary btn-lg w-100">
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
