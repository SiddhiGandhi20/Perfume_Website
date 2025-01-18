import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

import './Exclusive.css';

const Exclusive = ({ cartItems, setCart }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/exclusive_perfumes');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Render star ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={i < rating ? solidStar : regularStar}
        style={{ color: i < rating ? '#FFD700' : '#ccc', margin: '0 2px' }}
      />
    ));
  };

  // Handle adding products to the cart
  const handleAddToCart = (event, product) => {
    event.stopPropagation(); // Prevent card click navigation

    if (!product || !product._id) {
      console.error('Invalid product:', product);
      alert('Failed to add product. Invalid product details.');
      return;
    }

    const existingProduct = cartItems.find((item) => item._id === product._id);

    const updatedCart = existingProduct
      ? cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cartItems, { ...product, quantity: 1 }];

    setCart(updatedCart);
    alert(`${product.name} has been added to your cart!`);
  };

  // Navigate to product details
  const handleCardClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="exclusive-collection">
      <h2>Exclusive Collection</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="products-container">
          {products.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => handleCardClick(product._id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <div className="product-rating">{renderStars(product.ratings)}</div>
              <button
                className="buy-btn"
                onClick={(event) => handleAddToCart(event, product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exclusive;
