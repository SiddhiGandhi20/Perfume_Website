import React from 'react';
import './Exclusive.css';

const Exclusive = () => {
  const products = [
    {
      id: 1,
      name: 'Luxe Haven by Aureus',
      price: 2250,
      imageUrl: 'exe1.jpg',
      rating: 5,
    },
    {
      id: 2,
      name: 'Cool Blue Perfume',
      price: 3000,
      imageUrl: 'exe2.jpg',
      rating: 4,
    },
    {
      id: 3,
      name: 'Dark Fantasy by Verra',
      price: 1999,
      imageUrl: 'exe3.jpg',
      rating: 3,
    },
    {
        id: 4,
        name: 'Delightful by Seneta',
        price: 1599,
        imageUrl: 'exe4.jpg',
        rating: 3,
      },
      {
        id: 5,
        name: 'Green Adventure',
        price: 1899,
        imageUrl: 'exe5.jpg',
        rating: 3,
      },
      {
        id: 6,
        name: 'Eternity by Belle',
        price: 1000,
        imageUrl: 'exe6.jpg',
        rating: 3,
      }
  ];

  return (
    <div className="exclusive-collection">
      <h2>Exclusive Collection</h2>
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

export default Exclusive;