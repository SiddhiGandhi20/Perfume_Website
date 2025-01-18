import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Women.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const Women = ({ cart = [], setCart }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/women_perfumes');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={i <= rating ? solidStar : regularStar}
        />
      );
    }
    return stars;
  };

  const handleAddToCart = (event, product) => {
    event.stopPropagation();

    if (!product || !product._id) {
      alert('Invalid product details. Unable to add to cart.');
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);

      if (existingProduct) {
        // Update quantity if product exists in the cart
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new product to the cart
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    alert(`${product.name} has been added to your cart!`);
  };

  const handleCardClick = (id) => {
    navigate(`/detailsW/${id}`);
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="women-collection">
      <h2>Women's Perfume Collection</h2>
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
            <p className="product-rating">{renderStars(product.ratings)}</p>
            <button
              className="add-to-cart-btn"
              onClick={(event) => handleAddToCart(event, product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Women;
