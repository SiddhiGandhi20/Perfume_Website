import React, { useEffect } from 'react';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; // Import AOS styles
import './MenSection.css'; // Importing the CSS file for styling

function MenSection() {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Duration for the animation
    });
  }, []);

  const collections = [
    {
      title: 'Aromatic Spice',
      description1:
        'The Aromatic Spice collection combines the richness of spicy notes with a fresh, aromatic twist, designed for men who enjoy bold and dynamic fragrances.',
      description2:
        'These perfumes offer a perfect balance of warmth and freshness, making them ideal for both casual and formal settings.',
      image: 'mensection1.jpg',
      animation: 'fade-up',
    },
    {
      title: 'Leather & Musk',
      description1:
        'Indulge in the depth of our Leather & Musk collection, where intense leather notes are paired with musky undertones for a fragrance that is powerful and rugged.',
      description2:
        'This collection is perfect for men who appreciate bold, long-lasting scents that convey strength, masculinity, and sophistication.',
      image: 'mensection2.jpg',
      animation: 'fade-up',
    },
    {
      title: 'Citrus Fresh',
      description1:
        'Revitalize your senses with our Citrus Fresh collection. These perfumes blend vibrant citrus notes with a refreshing, energizing touch, perfect for active and energetic men.',
      description2:
        'Light and invigorating, these fragrances are ideal for daytime wear, leaving a trail of fresh, zesty aroma.',
      image: 'mensection3.jpg',
      animation: 'fade-up',
    },
  ];

  return (
    <section className="men-perfumes-collection">
      {collections.map((collection, index) => (
        <div
          key={index}
          className="men-perfumes-container"
          data-aos={collection.animation} // Apply AOS animation dynamically
          data-aos-delay={index % 2 === 0 ? '200' : '400'} // Optional delay for better effect
          style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}
        >
          <div className="men-perfumes-info">
            <h2 className="men-perfumes-title">{collection.title}</h2>
            <p className="men-perfumes-description">{collection.description1}</p>
            <p className="men-perfumes-description">{collection.description2}</p>
            <button className="men-perfumes-buy-button">Shop Now</button>
          </div>
          <div className="men-perfumes-image">
            <img src={collection.image} alt={collection.title} className="men-perfumes-img-large" />
          </div>
        </div>
      ))}
    </section>
  );
}

export default MenSection;
