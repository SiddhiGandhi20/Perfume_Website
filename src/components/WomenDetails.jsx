import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './WomenDetails.css';

const WomenDetails = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get product ID from URL
  const [quantity, setQuantity] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState("50"); // Default quantity to 1 // Quantity state for the selected product
  const [product, setProduct] = useState(null); // State to store the fetched product
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    // Fetch product from server by ID
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

  // If loading, display a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // If there's an error, display the error message
  if (error) {
    return <p>{error}</p>;
  }

  // If no product found, display a "Product not found" message
  if (!product) {
    return <p>Product not found</p>;
  }

  // Function to handle quantity selection
  const handleQuantityClick = (size) => {
    setQuantity(size);
  };

  // Function to handle adding to cart
  const handleAddToCart = (event) => {
    event.stopPropagation(); // Prevent propagation to parent `onClick`

    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      // If product is already in the cart, just update the quantity
      setCart(cart.map(item =>
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

  // Function to handle "Buy Now"
  const handleBuyNow = () => {
    console.log(`Proceeding to buy ${quantity} of ${product.name}`);
    // Add functionality to proceed to checkout or initiate purchase
  };

  return (
    <div className="women-details">
      {/* Product Name */}
      <h2 className="women_product-title">{product.name}</h2>

      <div className="women_product-detail">
        {/* Product Image */}
        <img
          src={product.image_url} // Assume imageUrl is a valid URL from the API
          alt={product.name}
          className="men_product-image-large"
        />

        {/* Product Information */}
        <div className="women_product-info">
          {/* Price */}
          <p className="women_product-price">
            <strong>Price:</strong> ₹{product.price}
          </p>

          {/* Type */}
          <p className="women_product-type">
            <strong>Type:</strong> {product.type}
          </p>

          {/* Keynotes */}
          <p className="women_product-keynotes">
            <strong>Keynotes:</strong> {product.keynotes}
          </p>
          
          {/* Description */}
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
    </div>
  );
};

export default WomenDetails;
