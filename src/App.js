import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './Components/FirebaseAuth/firebase.js'; // Firebase import
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Wishlist from './Pages/WishList';
import PlaceOrder from './Pages/PlaceOrder';
import Login from './Components/FirebaseAuth/login.js';
import Register from './Components/FirebaseAuth/register.js';
import Footer from './Components/Footer/Footer';

import clutch_banner from './Components/Assets/clutch_banner.png';
import handbag_banner from './Components/Assets/Handbag_banner.png';
import backpack_banner from './Components/Assets/backpack_banner.jpeg';
import travelbag_banner from './Components/Assets/travelbag_banner.jpeg';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation(); // Get current route

  useEffect(() => {
    // Check Firebase authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // Set to true if user exists, otherwise false
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  // Hide Navbar and Footer if on Login or Register page
  const hideNavbarFooter = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/clutches" element={<ShopCategory banner={clutch_banner} category="clutch" />} />
        <Route path="/purses" element={<ShopCategory banner={handbag_banner} category="purse" />} />
        <Route path="/backpacks" element={<ShopCategory banner={backpack_banner} category="backpack" />} />
        <Route path="/travelbags" element={<ShopCategory banner={travelbag_banner} category="travelbag" />} />
        <Route path="/product/:productId" element={<Product />} />

        {isLoggedIn ? (
          <>
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/cart" element={<Navigate to="/login" />} />
            <Route path="/wishlist" element={<Navigate to="/login" />} />
            <Route path="/place-order" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>

      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
