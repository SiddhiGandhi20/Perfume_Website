import React from "react";
import "./About.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to Aroma Bliss</h1>
        <p>Discover the art of fragrance with our exquisite collection of perfumes.</p>
      </section>

      {/* Vision Section */}
      <section className="vision-mission-container">
            <div className="mission-content">
                <h2>Our Mission</h2>
                <p>
                Our mission is to craft personalized fragrances that evoke emotion and enhance daily life, combining luxury and sustainability for an elevated experience.
                </p>
            </div>

                <img src="vision.jpg" alt="Vision and Mission" className="center-image" />

            <div className="vision-content">
                <h2>Our Vision</h2>
                <p>
                At Aroma Bliss, we envision becoming a global leader in fragrances, offering unique, high-quality scents that reflect individual personalities and create lasting impressions.
                </p>
            </div>
        </section>

      {/* Story Section */}
      <section className="story-container">
        <div className="story-content">
            <img src="left.jpg" alt="Left Image" className="story-image left-image" />
            <div className="story-text">
            <h2>Our Story</h2>
            <p>
                Founded in 2020, Aroma Bliss started with a passion for crafting unique
                scents that resonate with individuality. Our journey is fueled by a love
                for art, nature, and timeless elegance. Every fragrance is created with
                the finest ingredients, ensuring each bottle encapsulates the essence of
                luxury and tranquility. Our mission is to provide more than just scents
                — we offer an experience that ignites memories and elevates the senses.
            </p>
            </div>
            <img src="right.jpg" alt="Right Image" className="story-image right-image" />
        </div>
    </section>



      {/* Perfume Categories Section */}
      <div className="categories-container">
        <h2>Perfume Categories</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="card-front">
              <img src="floral.jpg" alt="Floral" className="category-image" />
              <p>Floral</p>
            </div>
            <div className="card-back">
              <img src="floral.jpg" alt="Floral Back" className="card-back-image" />
              <div className="card-back-text">
                <h3>Floral Perfumes</h3>
              </div>
            </div>
          </div>
          <div className="category-card">
            <div className="card-front">
              <img src="woody.jpg" alt="Woody" className="category-image" />
              <p>Woody</p>
            </div>
            <div className="card-back">
              <img src="woody.jpg" alt="Woody Back" className="card-back-image" />
              <div className="card-back-text">
                <h3>Woody Perfumes</h3>
              </div>
            </div>
          </div>
          <div className="category-card">
            <div className="card-front">
              <img src="oriental.jpg" alt="Oriental" className="category-image" />
              <p>Oriental</p>
            </div>
            <div className="card-back">
              <img src="oriental.jpg" alt="Oriental Back" className="card-back-image" />
              <div className="card-back-text">
                <h3>Oriental Perfumes</h3>
                
              </div>
            </div>
          </div>
          <div className="category-card">
            <div className="card-front">
              <img src="citrus.jpg" alt="Citrus" className="category-image" />
              <p>Citrus</p>
            </div>
            <div className="card-back">
              <img src="citrus.jpg" alt="Citrus Back" className="card-back-image" />
              <div className="card-back-text">
                <h3>Citrus Perfumes</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
