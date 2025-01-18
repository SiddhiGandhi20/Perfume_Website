import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ExclusiveDetails.css';

const ExclusiveDetails = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null); // State for product details
  const [quantity, setQuantity] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState("50");
  const [loading, setLoading] = useState(true); // Loading state
  const [recommendations, setRecommendations] = useState([]); // State for recommendations

  // Fetch product data from server
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/exclusive_perfumes/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);

        // Fetch recommendations based on the product's type
        const recommendationResponse = await fetch(
          `http://localhost:5000/exclusive_perfumes?type=${data.type}&limit=4`
        );
        if (recommendationResponse.ok) {
          const recommendationData = await recommendationResponse.json();
          setRecommendations(recommendationData.filter((rec) => rec.id !== id));
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/not-found'); // Redirect to a "Product Not Found" page
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = (event) => {
    event.stopPropagation(); // Prevent propagation to parent `onClick`
    if (!product) return;

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + parseInt(quantity) }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: parseInt(quantity) }]);
    }

    alert(`${product.name} has been added to your cart!`);
  };

  const handleQuantityClick = (quantity) => {
    setSelectedQuantity(quantity);
  };

  const handleBuyNow = () => {
    console.log(`Proceeding to buy ${quantity} of ${product?.name}`);
    // Add navigation to checkout here
  };

  const handleViewDetails = (productId) => {
    navigate(`/exclusive/${productId}`);
  };

  if (loading) {
    return <div className="loading-spinner"></div>; // Show a spinner while loading
  }

  if (!product) {
    return <p>Error loading product details. Please try again later.</p>;
  }

  return (
    <div className="exclusive-details">
      <h2 className="exclusive_product-title">{product.name}</h2>

      <div className="exclusive_product-detail">
        <img
          src={product.image_url}
          alt={product.name}
          className="exclusive_product-image-large"
        />

        <div className="exclusive_product-info">
          <p className="exclusive_product-price">
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p className="exclusive_product-type">
            <strong>Type:</strong> {product.type}
          </p>
          <p className="exclusive_product-keynotes">
            <strong>Keynotes:</strong> {product.keynotes}
          </p>
          <p className="exclusive_product-description">
            <strong>Description:</strong> {product.description}
          </p>

          <div className="exclusive_quantity-selector">
            <span className="exclusive_quantity-label">Size (ML):</span>
            <div className="exclusive_ml-buttons-wrapper">
              <button
                className={`ml-button ${selectedQuantity === "50" ? "active" : ""}`}
                onClick={() => handleQuantityClick("50")}
              >
                50ml
              </button>
              <button
                className={`ml-button ${selectedQuantity === "100" ? "active" : ""}`}
                onClick={() => handleQuantityClick("100")}
              >
                100ml
              </button>
            </div>
          </div>

          <div className="exclusive_quantity-input-wrapper">
            <label htmlFor="quantity-input" className="exclusive_quantity-label">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity-input"
              className="quantity-input"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
            />
          </div>

          <div className="exclusive_action-buttons">
            <button
              className="add-to-cart"
              onClick={handleAddToCart}
              disabled={!product}
            >
              Add to Cart
            </button>
            <button
              className="buy-now"
              onClick={handleBuyNow}
              disabled={!product}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Recommendation Section */}
      <div className="recommendations-section">
  <h3>Recommended for You</h3>
  <div className="rec-products-container">
    {recommendations.map((product) => (
      <div
        key={product.id}
        className="rec-product-card"
        onClick={() =>
        {
          navigate(`/details/${product._id}`);
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
        {/* <p className="rec-product-rating">{renderStars(product.ratings)}</p> */}
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

export default ExclusiveDetails;
