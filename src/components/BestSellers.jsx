import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import './BestSellers.css';

const Bestsellers = () => {
  const [cart, setCart] = useState([]);
  const products = [
    {
      id: 1,
      name: 'Golden Essence by Luxora',
      price: 2500,
      imageUrl: 'best1.png',
      rating: 5,
    },
    {
      id: 2,
      name: 'Ocean Breeze by Aqua',
      price: 2800,
      imageUrl: 'best2.png',
      rating: 4,
    },
    {
      id: 3,
      name: 'Mystic Forest',
      price: 2200,
      imageUrl: 'best3.png',
      rating: 4,
    },
    {
      id: 4,
      name: 'Citrus Bloom by Flora',
      price: 1800,
      imageUrl: 'best4.png',
      rating: 3,
    },
    {
      id: 5,
      name: 'Amber Nights by Mystique',
      price: 2000,
      imageUrl: 'best5.png',
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FontAwesomeIcon key={i} icon={solidStar} />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={regularStar} />);
      }
    }
    return stars;
  };
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} has been added to your cart!`);
  }

  return (
    <div>
      <div className="bestsellers-collection">
        <h2>Bestselling Collection</h2>
        <div className="bestsellers-container">
          {products.map((product) => (
            <div key={product.id} className="bestseller-card">
              <img src={product.imageUrl} alt={product.name} className="bestseller-image" />
              <h3 className="bestseller-name">{product.name}</h3>
              <p className="bestseller-price">₹{product.price}</p>
              <p className="bestseller-rating">{renderStars(product.rating)}</p>
              <button 
                className="add-to-cart-btn" 
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;
