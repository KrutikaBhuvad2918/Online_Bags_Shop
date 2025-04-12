import React from 'react';
import './Offers.css';
import bannerImage from '../Assets/home-bag.jpg'; // Use your image path

const Banner = () => {
  return (
    <div className="banner">
      <img src={bannerImage} alt="Banner" className="banner-image" />
      <div className="banner-overlay">
        <h1>UNCOVER THE LIFESTYLE OF ONE BAG.</h1>
        <p>
          Explore the simplicity and convenience of the One Bag lifestyle, designed for minimalists. 
          Learn how to pack efficiently, travel light, and enjoy freedom on your adventure.
        </p>
      </div>
    </div>
  );
};

export default Banner;
