import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  return (
    <div className="login-container">
      {/* <nav className="nav-links">
        <a href="#" className="home-link">Home</a> <span className="separator">|</span>
        <a href="#" className="account-link"> Account</a>
      </nav> */}

      <div className={`login-box ${isForgotPassword ? "move-up" : "move-down"}`}>
        {!isForgotPassword ? (
          <>
            <h2 className="login-title">LOGIN</h2>
            <p className="login-subtitle">Enter your email and password to login:</p>
            <form>
              {/* Email Field */}
              <div className="input-group">
                <label className={`floating-label ${email ? "filled" : ""}`}>E-mail</label>
                <input 
                  type="email" 
                  className={`input-field ${email ? "bold-text" : ""}`} 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>

              {/* Password Field */}
              <div className="input-group">
                <label className={`floating-label ${password ? "filled" : ""}`}>Password</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className={`input-field ${password ? "bold-text" : ""}`} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span 
                  className="toggle-password" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <a href="#" className="forgot-password" onClick={() => setIsForgotPassword(true)}>Forgot your password?</a>
              <button className="login-button">LOGIN</button>
            </form>
            <p className="signup-text">
              Don't have an account? <a href="#" className="signup-link">Sign up</a>
            </p>
          </>
        ) : (
          // FORGOT PASSWORD FORM
          <>
            <h2 className="login-title">RECOVER PASSWORD</h2>
            <p className="login-subtitle">Enter your email to recover your password:</p>
            <form>
              {/* Email Field */}
              <div className="input-group">
                <label className={`floating-label ${email ? "filled" : ""}`}>E-mail</label>
                <input 
                  type="email" 
                  className={`input-field ${email ? "bold-text" : ""}`} 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>

              <button className="login-button">RECOVER</button>
            </form>
            <p className="signup-text">
              <a href="#" onClick={() => setIsForgotPassword(false)}>Remember your password? Back to login</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
