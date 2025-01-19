import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePay, faPaypal } from '@fortawesome/free-brands-svg-icons'; 
import { faCreditCard, faMobileAlt, faTruck } from '@fortawesome/free-solid-svg-icons';
import './Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert('Please select a payment method before confirming.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      alert(`Payment confirmed using ${paymentMethod}!`);
    }, 2000);
  };

  return (
    <div className="container">
      <div className="left-side">
        <h2>
          <FontAwesomeIcon icon={faCreditCard} className="me-2" /> Payment Page
        </h2>

        <div className="checkout-summary">
          <h4>Enter Your Details</h4>
          <form id="payment-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" className="form-control" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-control" placeholder="example@mail.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" className="form-control" placeholder="1234567890" required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" className="form-control" placeholder="123 Street, City, Country" required />
            </div>
          </form>
        </div>

        <div className="payment-methods mt-4">
          <h4>Select Payment Method</h4>
          {[
            { id: 'googlePay', label: 'Google Pay', icon: faGooglePay },
            { id: 'phonePe', label: 'PhonePe', icon: faMobileAlt },
            { id: 'paytm', label: 'Paytm', icon: faPaypal },
            { id: 'cashOnDelivery', label: 'Cash on Delivery', icon: faTruck },
            { id: 'creditCard', label: 'Credit/Debit Card', icon: faCreditCard },
          ].map(({ id, label, icon }) => (
            <div className="payment-method" key={id}>
              <input
                type="radio"
                id={id}
                name="paymentMethod"
                value={label}
                onChange={() => handlePaymentMethodChange(label)}
                aria-label={`Payment method ${label}`}
              />
              <label htmlFor={id}>
                <FontAwesomeIcon icon={icon} className="payment-icon" /> {label}
              </label>
            </div>
          ))}
        </div>

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

      <div className="right-side">
        <div className="checkout-summary">
          <h4>Order Summary</h4>
          <div id="order-details">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <div className="item-details">
                  <span>{item.name}</span>
                  <br />
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

        <div className="text-center btn-container">
          <button
            onClick={handleConfirmPayment}
            className="btn btn-primary btn-lg w-100"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Confirm Payment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
