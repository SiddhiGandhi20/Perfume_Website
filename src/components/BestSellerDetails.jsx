import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './BestSellerDetails.css';

const BestSellerDetails = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]); // Related products state
  const [quantity, setQuantity] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState("50");

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/bestseller/${id}`);
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

  // Fetch related products
  useEffect(() => {
    if (product) {
      const fetchRelatedProducts = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/bestseller?type=${product.type}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch related products');
          }
          const data = await response.json();
          setRelatedProducts(data);
        } catch (error) {
          console.error('Error fetching related products:', error);
        }
      };

      fetchRelatedProducts();
    }
  }, [product]);

  const handleAddToCart = (event) => {
    event.stopPropagation();
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

  const handleCardClick = (id) => {
    navigate(`/detailsB/${id}`);
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="bestseller-details">
      <h2 className="bestseller_product-title">{product.name}</h2>

      <div className="bestseller_product-detail">
        <img
          src={product.image_url}
          alt={product.name}
          className="bestseller_product-image-large"
        />

        <div className="bestseller_product-info">
          <p className="bestseller_product-price">
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p className="bestseller_product-type">
            <strong>Type:</strong> {product.type}
          </p>
          <p className="bestseller_product-description">
            <strong>Description:</strong> {product.description}
          </p>

          <div className="bestseller_quantity-input-wrapper">
            <label htmlFor="quantity-input" className="bestseller_quantity-label">
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

          <div className="bestseller_action-buttons">
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-now">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="related-products-section">
        <h3>Related Products</h3>
        <div className="related-products-container">
          {relatedProducts.map((related) => (
            <div
              key={related.id}
              className="related-product-card"
              onClick={() => handleCardClick(related._id)}
            >
              <img
                src={related.image_url}
                alt={related.name}
                className="related-product-image"
              />
              <h4 className="related-product-name">{related.name}</h4>
              <p className="related-product-price">₹{related.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellerDetails;
