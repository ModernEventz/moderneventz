// pages/contact.js
"use client"
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server or email
    alert('Thank you for contacting us!');
  };

  return (
<>   
 <Header />
    <div className="contact-page">
       
      {/* Header Section */}
      <section className="header">
        <h1>Advertisement</h1>
        <p>We’d love to hear from you! Reach out to us for inquiries or assistance in case you want to adverise on our platform.</p>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              required
            ></textarea>
          </div>

          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info">
        <h2>Our Contact Information</h2>
        <p>Phone: (233) 544 828479</p>
        <p>Email: info@moderneventsgh.com</p>
        <p>Address: osbborn junction,kumasi, Ghana</p>
      </section>

  

    

      <style jsx>{`
        .contact-page {
          padding: 2rem;
        }
        .header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .contact-form, .contact-info, .social-media {
          margin-bottom: 2rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
        }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          background-color: #0070f3;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #005bb5;
        }
        .contact-info, .social-media {
          text-align: center;
        }
        .social-media ul {
          list-style: none;
          padding: 0;
        }
        .social-media ul li {
          display: inline-block;
          margin-right: 1rem;
        }
        .social-media ul li a {
          text-decoration: none;
          color: #0070f3;
        }
        .footer {
          text-align: center;
          margin-top: 3rem;
          color: #666;
        }
      `}</style>
    </div>

      {/* Footer */}
      <Footer />
    </>

  );
};

export default Contact;
