import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MenDetails.css';

const MenDetails = ({ cartItems, setCart }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null); // State to store product details
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
  const [selectedSize, setSelectedSize] = useState('50ml'); // Default size
  const [error, setError] = useState(null); // Error state to store error messages
  const [recommendations, setRecommendations] = useState([]); // State to store recommendations

  // Fetch product details by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/perfumes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error('Failed to fetch product details.');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch recommendations based on the product type
  useEffect(() => {
    const fetchRecommendations = async (productType) => {
      try {
        const response = await fetch(`http://localhost:5000/perfumes?type=${productType}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        const data = await response.json();
        if (product && product.id) {
          const filteredRecommendations = data.filter((recProduct) => recProduct.id !== product.id);
          setRecommendations(filteredRecommendations); // Set filtered recommendations
        } else {
          setRecommendations(data); // Set recommendations if no product found
        }
      } catch (err) {
        setError(err.message); // Set error if request fails
      }
    };

    if (product) {
      fetchRecommendations(product.type); // Fetch recommendations based on current product type
    }
  }, [product]);

  // If the product is not found, show a loading message or error
  if (!product) {
    return <p>Loading product details...</p>;
  }

  // Function to handle adding to cart
  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      size: selectedSize,
      quantity,
    };
  
    // Check if the product with the same size already exists in the cart
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.size === selectedSize
    );
  
    if (existingProductIndex !== -1) {
      // If product exists, update its quantity
      const updatedCart = [...cartItems];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // If product doesn't exist, add it to the cart
      setCart([...cartItems, cartItem]);
    }
  
    alert(`${product.name} (${selectedSize}) has been added to your cart!`);
  };
  

  // Function to handle "Buy Now"
  const handleBuyNow = () => {
    console.log(`Proceeding to buy ${quantity} of ${product.name} (${selectedSize})`);
    // Implement checkout functionality here
  };

  // Function to handle recommendation click
  const handleRecommendationClick = (id) => {
    navigate(`/product/${id}`); // Navigate to product details page
  };

  return (
    <div className="men-details">
      {/* Product Name */}
      <h2 className="men_product-title">{product.name}</h2>

      <div className="men_product-detail">
        {/* Product Image */}
        <img
          src={product.image_url} // Assume imageUrl is a valid URL from the API
          alt={product.name}
          className="men_product-image-large"
        />

        {/* Product Information */}
        <div className="men_product-info">
          {/* Price */}
          <p className="men_product-price">
            <strong>Price:</strong> ₹{product.price}
          </p>

          {/* Type */}
          <p className="men_product-type">
            <strong>Type:</strong> {product.type}
          </p>

          {/* Keynotes */}
          <p className="men_product-keynotes">
            <strong>Keynotes:</strong> {product.keynotes}
          </p>

          {/* Description */}
          <p className="men_product-description">
            <strong>Description:</strong> {product.description}
          </p>

          {/* Size Selector */}
          <div className="men_quantity-selector">
            <span className="men_quantity-label">Size:</span>
            <div className="men_ml-buttons-wrapper">
              <button
                className={`ml-button ${selectedSize === '50ml' ? 'active' : ''}`}
                onClick={() => setSelectedSize('50ml')}
              >
                50ml
              </button>
              <button
                className={`ml-button ${selectedSize === '100ml' ? 'active' : ''}`}
                onClick={() => setSelectedSize('100ml')}
              >
                100ml
              </button>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="men_quantity-input-wrapper">
            <label htmlFor="quantity-input" className="men_quantity-label">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity-input"
              className="quantity-input"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          {/* Action Buttons */}
          <div className="men_action-buttons">
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="recommendations-section">
        <h3>Recommended for You</h3>
        <div className="rec-products-container">
          {recommendations.map((product) => (
            <div
              key={product.id}
              className="rec-product-card"
              onClick={() => handleRecommendationClick(product.id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="rec-product-image"
              />
              <h3 className="rec-product-name">{product.name}</h3>
              <p className="rec-product-price">₹{product.price}</p>
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
    </div>
  );
};

export default MenDetails;
