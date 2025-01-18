import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import './Men.css';

const Men = ({ cartItems = [], setCart }) => { // Default value for cartItems
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/perfumes');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data); // Ensure data is an array before setting products
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={index < rating ? solidStar : regularStar}
      />
    ));
  };

  const handleAddToCart = (event, product) => {
    event.stopPropagation(); // Prevent click event from propagating

    if (!product || !product._id) {
      alert('Failed to add product. Invalid product details.');
      return;
    }

    const currentCartItems = Array.isArray(cartItems) ? cartItems : [];
    const existingProduct = currentCartItems.find((item) => item._id === product._id);

    const updatedCart = existingProduct
      ? currentCartItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...currentCartItems, { ...product, quantity: 1 }];

    setCart(updatedCart);
    alert(`${product.name} has been added to your cart!`);
  };

  const handleCardClick = (id) => {
    navigate(`/detailsM/${id}`);
  };

  return (
    <div className="men-collection">
      <h2>Men's Perfume Collection</h2>
      <div className="products-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => handleCardClick(product._id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={product.image_url || 'placeholder.jpg'}
                alt={product.name || 'Product Image'}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <p className="product-rating">{renderStars(product.ratings || 0)}</p>
              <button
                className="add-to-cart-btn"
                onClick={(event) => handleAddToCart(event, product)}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Men;
