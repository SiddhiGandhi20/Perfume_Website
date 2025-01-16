import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './WomenSection.css'; // Importing the CSS file for styling

function WomenSection() {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Duration for the animation
    });
  }, []);

  const collections = [
    {
      title: 'Floral Essence',
      description1:
        'Our Floral Essence collection brings you the most delicate and enchanting floral notes, perfect for women who love fresh, soft, and feminine fragrances.',
      description2:
        'Designed for elegance and grace, these perfumes are ideal for daily wear and special occasions, leaving behind a beautiful and romantic trail.',
      image: 'womensection1.jpg',
      animation: 'fade-right',
    },
    {
      title: 'Woody Elegance',
      description1:
        'Experience the richness of nature with our Woody Elegance collection. These perfumes blend earthy and woody notes with subtle floral undertones, giving a sophisticated and grounded fragrance.',
      description2:
        'Perfect for confident women who love bold, long-lasting scents that stand out and make a statement.',
      image: 'womensection2.jpg',
      animation: 'fade-left',
    },
    {
      title: 'Oriental Allure',
      description1:
        'Step into a world of exotic spices and warm notes with our Oriental Allure collection. These perfumes are perfect for women who want something unique, bold, and captivating.',
      description2:
        'With deep, rich notes of amber, vanilla, and musk, these fragrances are designed to leave a lasting impression and evoke mystery.',
      image: 'womensection3.jpg',
      animation: 'fade-right',
    },
  ];

  return (
    <section className="women-perfumes-collection">
      {collections.map((collection, index) => (
        <div
          key={index}
          className="women-perfumes-container"
          data-aos={collection.animation} // Apply AOS animation dynamically
          data-aos-delay={index % 2 === 0 ? '200' : '400'} // Optional delay for better effect
          style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}
        >
          <div className="women-perfumes-info">
            <h2 className="women-perfumes-title">{collection.title}</h2>
            <p className="women-perfumes-description">{collection.description1}</p>
            <p className="women-perfumes-description">{collection.description2}</p>
            <button className="women-perfumes-buy-button">Shop Now</button>
          </div>
          <div className="women-perfumes-image">
            <img src={collection.image} alt={collection.title} className="women-perfumes-img-large" />
          </div>
        </div>
      ))}
    </section>
  );
}

export default WomenSection;
