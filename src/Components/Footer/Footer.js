import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import paymentImg from "../Assets/payment-option.png"; // Import your payment image

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Side - Google Map */}
        <div className="footer-map">
          <h3>OUR SHOP</h3>
          <iframe
            title="Our Shop Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3801.205440138836!2d74.00172897494194!3d17.68775258325164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc239dba7d776c9%3A0x75c8e492a6698ad1!2sVijay%20Bag!5e0!3m2!1sen!2sin!4v1742370232716!5m2!1sen!2sin"
            width="100%"
            height="230"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <p>📞 09172921760</p>
          <p>📍 Shop No 1, Powai Naka, Satara, Maharashtra 415001</p>
        </div>

        {/* Shop Section */}
        <div className="footer-section">
          <h3>SHOP</h3>
          <ul>
            <li><Link to="/clutches">Popular in Bags</Link></li>
            <li><Link to="/shop#new-collections">New Collections</Link></li>
            <li><Link to="/wishlist">WishList</Link></li>
            <li><Link to="/cart">Cart Items</Link></li>
          </ul>
        </div>

        {/* Categories Section */}
        <div className="footer-section">
          <h3>CATEGORIES</h3>
          <ul>
            <li><Link to="/clutches">Clutches</Link></li>
            <li><Link to="/purses">Purses</Link></li>
            <li><Link to="/backpacks">Backpacks</Link></li>
            <li><Link to="/travelbags">Travel Bags</Link></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="footer-section-newsletter">
          <h3>NEWSLETTER</h3>
          <p>Subscribe to get notified about product launches, special offers, and company news.</p>
          <div className="news-input">
            <input type="email" placeholder="E-mail" />
            <button>Subscribe</button>
          </div>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
            <a href="https://wa.me/919172921760" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="currency-selector">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
            alt="India Flag"
            className="flag"
          />
          <span>INDIA (INR ₹)</span>
        </div>
        <p>© 2025 - POWERED BY BAGSHOPY</p>
        <div className="payment-img">
          <img src={paymentImg} alt="Accepted Payment Methods" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
