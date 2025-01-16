import React from 'react';
import './Cart.css';

const Cart = ({ cartItems = [], setCart }) => {
  // Calculate total price for the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent reducing quantity below 1
    setCart(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove an item from the cart
  const removeItem = (id) => {
    setCart(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <div className="cart-items">
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>{`₹${item.price}`}</p>
                  </div>
                </div>
                <div className="cart-item-right">
                  <div className="quantity-control">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-price">
                    <p>{`₹${item.price * item.quantity}`}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="remove-btn">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ₹{calculateTotal()}</h2>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
