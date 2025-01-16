import React, { useEffect }  from 'react';
import './ExclusiveSection.css';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; // Importing the CSS file for styling

function ExclusiveSection() {
    useEffect(() => {
      AOS.init({
        duration: 1200, // Duration for the animation
      });
    }, []);
  const collections = [
    {
      title: 'Limited Edition Perfumes',
      description1:
        'Unveil the exclusivity of our Limited Edition perfumes. These rare creations are designed for those who appreciate the extraordinary, offering an experience unlike any other.',
      description2:
        'With only a select number of bottles available, owning one is a privilege. Indulge in the finest blends, available only for a short time.',
      image: 'exclusive2.png', // Ensure images are correctly placed
      animation: 'fade-right',
    },
    {
      title: 'Signature Scents',
      description1:
        'Discover our Signature Scents collection—fragrances that are as unique as you are. These perfumes are crafted to leave an unforgettable impression.',
      description2:
        'Each scent is a testament to individuality, designed to express your personal essence with every spritz.',
      image: 'perfumes3.png',
      animation: 'fade-up',
    },
    {
      title: 'VIP Selection',
      description1:
        'Step into a world of luxury with our VIP Selection. Created for the most discerning customers, these perfumes offer an unparalleled sensory experience.',
      description2:
        'Immerse yourself in fragrances that are as rare and special as you are, with notes curated from the finest ingredients available.',
      image: 'luxury3.png',
      animation: 'fade-left',
    },
  ];

  return (
    <section className="exclusive-collection">
      {collections.map((collection, index) => (
        <div
          key={index}
          className="exclusive-container"
          data-aos={collection.animation} // Apply AOS animation dynamically
          data-aos-delay={index % 2 === 0 ? '200' : '400'} // Optional delay for better effect
          style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}
        >
          <div className="exclusive-info">
            <h2 className="exclusive-title">{collection.title}</h2>
            <p className="exclusive-description">{collection.description1}</p>
            <p className="exclusive-description">{collection.description2}</p>
            <button className="exclusive-buy-button">Shop Now</button>
          </div>
          <div className="exclusive-image">
            <img
              src={collection.image}
              alt={collection.title}
              className="exclusive-img-large"
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default ExclusiveSection;
