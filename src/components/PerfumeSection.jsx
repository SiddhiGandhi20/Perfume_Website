import React, { useEffect } from 'react';
import './PerfumeSection.css'; // Importing the CSS file for styling
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importing AOS styles

function PerfumeSection() {
  // Initializing AOS animation
  useEffect(() => {
    AOS.init({
      duration: 1200, // Duration for the animation
      once: true, // Run animation once
    });
  }, []);

  const sections = [
    {
      title: 'Luxury Perfumes',
      description1:
        'Step into a world of sophistication and allure with our exclusive range of luxury perfumes. Each bottle is a masterpiece, crafted with the finest ingredients sourced from around the globe.',
      description2:
        'Encased in beautifully designed bottles, our perfumes are more than just fragrances—they are a statement of elegance and grace. Experience the harmony of carefully blended notes that create a symphony of scents.',
      image: 'luxury1.jpeg',
      animation: 'fade-up',
    },
    {
      title: 'Exotic Fragrances',
      description1:
        'Discover the allure of exotic fragrances inspired by the mysteries of the East. Our collection features bold, spicy, and enchanting notes designed to make you stand out.',
      description2:
        'Each perfume in this collection tells a story of adventure and passion, perfect for those who seek a touch of mystery and excitement.',
      image: 'exotic1.jpg',
      animation: 'fade-left',
    },
    {
      title: 'Fresh & Clean',
      description1:
        'Experience the crisp and invigorating scents of fresh and clean perfumes. Perfect for everyday wear, these fragrances are light, airy, and energizing.',
      description2:
        'Whether you’re starting your day or refreshing your mood, our fresh collection is the ideal companion for a bright, new perspective.',
      image: 'freshandclean.jpg',
      animation: 'fade-right',
    },
  ];

  return (
    <section className="perfume-section">
      {sections.map((section, index) => (
        <div
          key={index}
          className="perfume-container"
          data-aos={section.animation} // Apply AOS animation dynamically
          data-aos-delay={index % 2 === 0 ? '100' : '200'} // Optional delay for better effect
          style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}
        >
          <div className="perfume-info">
            <h2 className="perfume-title">{section.title}</h2>
            <p className="perfume-description">{section.description1}</p>
            <p className="perfume-description">{section.description2}</p>
            <button className="buy-button">Buy Now</button>
          </div>
          <div className="perfume-image">
            <img src={section.image} alt={section.title} className="perfume-img-large" />
          </div>
        </div>
      ))}
    </section>
  );
}

export default PerfumeSection;
