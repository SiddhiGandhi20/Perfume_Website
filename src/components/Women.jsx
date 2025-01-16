import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Women.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const Women = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch data from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/women_perfumes');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data); // Update products state with fetched data
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
    event.stopPropagation(); // Prevent propagation to parent `onClick`

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

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
            key={product.id}
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
            <p className="product-rating">{renderStars(product.rating)}</p>
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
