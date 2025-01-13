import React from 'react';
import './Men.css';

const Men = () => {
  const products = [
    {
      id: 1,
      name: 'Velvet Nights by Noir',
      price: 2250,
      imageUrl: 'men1.jpg',
      rating: 5,
    },
    {
      id: 2,
      name: 'Royal Ember by Imperium',
      price: 3000,
      imageUrl: 'men2.jpg',
      rating: 4,
    },
    {
      id: 3,
      name: 'Cedar Woods by Timber',
      price: 1999,
      imageUrl: 'men3.jpg',
      rating: 4,
    },
    {
      id: 4,
      name: 'Violet Thunder by Empyrean',
      price: 1599,
      imageUrl: 'men4.jpg',
      rating: 5,
    },
    {
      id: 5,
      name: 'Noble Drift by Atlas',
      price: 1899,
      imageUrl: 'men5.jpg',
      rating: 3,
    },
    {
      id: 6,
      name: 'Eternal Mist by Templar',
      price: 1000,
      imageUrl: 'men6.jpg',
      rating: 4,
    },
  ];

  return (
    <div className="men-collection">
      <h2>Exclusive Men's Perfume Collection</h2>
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

export default Men;
