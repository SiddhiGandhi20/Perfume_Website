import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './WomenDetails.css';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WomenDetails = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get product ID from URL
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null); // State to store the fetched product
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const [recommendations, setRecommendations] = useState([]); // State to store recommended products

  // Fetch the product details by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/women_perfumes/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data); // Set the fetched product
      } catch (err) {
        setError(err.message); // Set error if request fails
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch product recommendations based on the product type
  useEffect(() => {
    const fetchRecommendations = async (productType) => {
      try {
        const response = await fetch(`http://localhost:5000/women_perfumes?type=${productType}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        const data = await response.json();

        // Filter out the current product if it exists
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
      fetchRecommendations(product.type); // Fetch recommendations based on the current product type
    }
  }, [product]);

  // Handle quantity click
  const handleQuantityClick = (size) => {
    setQuantity(size);
  };

  // Handle adding the product to the cart
  const handleAddToCart = (event) => {
    event.stopPropagation(); // Prevent event propagation

    // Check if the product already exists in the cart
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

  // Handle buy now action
  const handleBuyNow = () => {
    console.log(`Proceeding to buy ${quantity} of ${product.name}`);
    // Add functionality to proceed to checkout
  };

  // Handle recommendation click to show the clicked product details
  const handleRecommendationClick = (productId) => {
    console.log(`Navigating to product details for ID: ${productId}`);
    if (productId) {
      navigate(`/detailsW/${productId}`); // Navigate to the product details page
    } else {
      console.error("Product ID is missing");
    }
  };

  // Loading and error handling
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="women-details">
      <h2>{product.name}</h2>
      <div className="women_product-detail">
        <img
          src={product.image_url}
          alt={product.name}
          className="women_product-image-large"
        />
        <div className="women_product-info">
          <p className="women_product-price">
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p className="women_product-type">
            <strong>Type:</strong> {product.type}
          </p>
          <p className="women_product-keynotes">
            <strong>Keynotes:</strong> {product.keynotes}
          </p>
          <p className="women_product-description">
            <strong>Description:</strong> {product.description}
          </p>

          {/* Quantity Selector */}
          <div className="women_quantity-selector">
            <span className="women_quantity-label">Size (ML):</span>
            <div className="women_ml-buttons-wrapper">
              <button
                className={`ml-button ${quantity === 50 ? "active" : ""}`}
                onClick={() => handleQuantityClick(50)}
              >
                50ml
              </button>
              <button
                className={`ml-button ${quantity === 100 ? "active" : ""}`}
                onClick={() => handleQuantityClick(100)}
              >
                100ml
              </button>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="women_quantity-input-wrapper">
            <label htmlFor="women_quantity-input" className="women_quantity-label">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity-input"
              className="quantity-input"
              defaultValue="1"
              min="1"
            />
          </div>

          {/* Action Buttons */}
          <div className="women_action-buttons">
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
                onClick={() => 
                {
                  {
                    navigate(`/detailsW/${product._id}`);
                  }
                }
                }
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="rec-product-image"
                />
                <h3 className="rec-product-name">{product.name}</h3>
                <p className="rec-product-price">₹{product.price}</p>
                <p className="rec-product-rating">{renderStars(product.ratings)}</p>
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

export default WomenDetails;
