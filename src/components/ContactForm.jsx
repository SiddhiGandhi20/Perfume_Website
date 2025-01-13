import React from 'react';
import './ContactForm.css';

function ContactForm() {
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
    </div>
  );
}

export default ContactForm;
