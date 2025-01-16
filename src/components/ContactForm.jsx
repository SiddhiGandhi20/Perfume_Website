import React from 'react';
import './ContactForm.css';

const ContactForm = () => {
  // perfume details including Google Maps iframe links
  const perfumes = [
    {
      name: "Perfume Store",
      phone: "+1 234 567 890",
      googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60650.76050340016!2d74.549191813571!3d18.178993108218236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc3a03bdb59287f%3A0x36e4fb47fb8d8a9d!2sBaramati%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1736506616553!5m2!1sen!2sin",
    }
  ];

  return (
    <div className="contact-form-container">
      <div className="form-wrapper">
        <h2>Contact Us</h2>
        <form action="#">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Perfume Locator Section */}
      <div className="perfume-locator">
        <div className="perfume-locator-map">
          {perfumes.map((perfume) => (
            <div key={perfume.name} className="perfume-entry">
              <h4>{perfume.name}</h4>
              <iframe
                src={perfume.googleMapsUrl}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title={`Google Maps - ${perfume.name}`}
              ></iframe>
              <p>{perfume.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
