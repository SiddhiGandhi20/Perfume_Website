import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import './Men.css';

const Men = ({ cart, setCart }) => {
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
        setProducts(data); // Assuming the response is an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
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
    
    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // If product is already in the cart, just update the quantity
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // If product is not in the cart, add it with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }

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
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Men;
