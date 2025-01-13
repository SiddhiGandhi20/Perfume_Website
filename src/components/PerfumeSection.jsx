import React from 'react';
import './PerfumeSection.css'; // Importing the CSS file for styling

function PerfumeSection() {
  return (
    <section className="perfume-section">
      <div className="perfume-container">
        <div className="perfume-info">
          <h2 className="perfume-title">Luxury Perfumes</h2>
          <p className="perfume-description">
            Step into a world of sophistication and allure with our exclusive range of luxury perfumes. 
            Each bottle is a masterpiece, crafted with the finest ingredients sourced from around the globe. 
            Our fragrances are designed to captivate your senses, leaving a lasting impression wherever you go.
             Whether you prefer floral, woody, oriental, or fresh scents, our collection has something to suit every personality and occasion.
          </p>
          <p className="perfume-description">
            Encased in beautifully designed bottles, our perfumes are more than just fragrances—they are a 
            statement of elegance and grace. Experience the harmony of carefully blended notes that create a symphony
             of scents, evoking memories and emotions with every spritz. Indulge in the ultimate luxury and let our 
             perfumes become a part of your signature style.
          </p>
          <button className="buy-button">Buy Now</button>
        </div>
        <div className="perfume-image">
          <img src="luxury1.jpeg" alt="Luxury Perfume" className="perfume-img-large" />
        </div>
      </div>
    </section>
  );
}

export default PerfumeSection;
