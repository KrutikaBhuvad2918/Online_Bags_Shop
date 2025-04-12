import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import Cartlogo from '../Assets/cartlogo.png';
import SearchIcon from '../Assets/search.jpg';
import HeartIcon from '../Assets/heart-icon.jpg';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext.js';
import { auth } from "../FirebaseAuth/firebase.js"; // Import Firebase auth
import { handleLogout } from "../FirebaseAuth/profile.js";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [showSearch, setShowSearch] = useState(false);
  const { getTotalCartItems, searchQuery, setSearchQuery } = useContext(ShopContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        alert(`Welcome, ${currentUser.displayName || "to our Bagshop"}!`);
      }
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src='' alt='' />
        <p>BAGSHOP</p>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className='overlay-search-bar'>
          <input 
            type="text" 
            className='search-bar' 
            placeholder="Search bags..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <ul className='nav-menu'>
        <li onClick={() => setMenu("shop")}><Link style={{ textDecoration: 'none', color: 'black' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : null}</li>
        <li onClick={() => setMenu("clutches")}><Link style={{ textDecoration: 'none', color: 'black' }} to='/clutches'>Clutches</Link>{menu === "clutches" ? <hr /> : null}</li>
        <li onClick={() => setMenu("purses")}><Link style={{ textDecoration: 'none', color: 'black' }} to='/purses'>Purses</Link>{menu === "purses" ? <hr /> : null}</li>
        <li onClick={() => setMenu("backpacks")}><Link style={{ textDecoration: 'none', color: 'black' }} to='/backpacks'>BackPack</Link>{menu === "backpacks" ? <hr /> : null}</li>
        <li onClick={() => setMenu("travelbags")}><Link style={{ textDecoration: 'none', color: 'black' }} to='/travelbags'>TravelBag</Link>{menu === "travelbags" ? <hr /> : null}</li>
      </ul>

      {/* Search Icon */}
      <div className="nav-search-container">
        <img 
          src={SearchIcon} 
          alt="Search" 
          className='search-icon' 
          onClick={() => setShowSearch(!showSearch)} 
        />
      </div>

      <div className="nav-login-cart">
        {user ? (
          <>
            <span className="user-name">Hi, {user.displayName || user.email.split('@')[0]}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to='/login'><button>Login</button></Link>
        )}
        <Link to="/wishlist"><img className='cart' src={HeartIcon} alt=''/></Link>
        <Link to='/cart'><img className='cart' src={Cartlogo} alt='' /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
}

export default Navbar;
