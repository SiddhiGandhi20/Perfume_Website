import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './ExclusiveDetails.css';

const ExclusiveDetails = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null); // State for the product
  const [quantity, setQuantity] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState("50");

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
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

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
  };

  if (!product) {
    return <p>Loading product details...</p>;
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
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </div>

          <div className="exclusive_action-buttons">
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

export default ExclusiveDetails;
