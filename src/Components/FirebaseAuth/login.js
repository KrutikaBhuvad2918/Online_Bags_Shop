import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", general: "" }); // Reset errors before checking

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required!" }));
      return;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required!" }));
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in Successfully", { position: "top-center" });
    } catch (error) {
      console.log(error.message);
      setErrors((prev) => ({ ...prev, general: "Incorrect email or password!" }));
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 login-bg">
      <div className="card card-color" style={{ width: "400px" }}>
        <div className="card-body">
          <h3 className="card-title text-white text-center mb-4">Login</h3>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="text-danger mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <p className="text-danger mt-1">{errors.password}</p>}
            </div>

            {/* General Error Message */}
            {errors.general && <p className="text-danger text-center mt-2">{errors.general}</p>}

            {/* Submit Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>

            {/* Forgot Password and Registration Link */}
            <div className="d-flex justify-content-between mt-3">
              <p className="mb-0 text-white">
                New user? <a href="/register" className="text-white">Register Here</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
