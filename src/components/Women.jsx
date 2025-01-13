import React from 'react';
import './Women.css';

const Women = () => {
  const products = [
    {
      id: 1,
      name: 'Mystic Bloom by Essence',
      price: 2250,
      imageUrl: 'women1.jpg',
      rating: 5,
    },
    {
      id: 2,
      name: 'Blush Petals by Femina',
      price: 3000,
      imageUrl: 'women2.jpg',
      rating: 4,
    },
    {
      id: 3,
      name: 'Velvet Rose by Luxe',
      price: 1999,
      imageUrl: 'women3.jpg',
      rating: 4,
    },
    {
      id: 4,
      name: 'Golden Dusk by Bella',
      price: 1599,
      imageUrl: 'women4.jpg',
      rating: 5,
    },
    {
      id: 5,
      name: 'Jasmine Noir by Florelle',
      price: 1899,
      imageUrl: 'women5.jpg',
      rating: 3,
    },
    {
      id: 6,
      name: 'Euphoria by Elle',
      price: 1000,
      imageUrl: 'women6.jpg',
      rating: 4,
    },
  ];

  return (
    <div className="women-collection">
      <h2>Women's Perfume Collection</h2>
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.price}</p>
            <p className="product-rating">Rating: {product.rating} stars</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Women;
