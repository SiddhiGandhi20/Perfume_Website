import React, { useState } from "react";
import "./Account.css";

function Account() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState({ email: "", password: "", name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", name: "" });
    setErrors({});
  };

  const validateForm = () => {
    let formErrors = {};
    if (!emailRegex.test(formData.email)) {
      formErrors.email = "Invalid email format";
    }
    if (!passwordRegex.test(formData.password)) {
      formErrors.password = "Password must be at least 8 characters long and include a letter and a number";
    }
    if (!isLogin && formData.name.trim() === "") {
      formErrors.name = "Name is required for registration";
    }
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      alert(isLogin ? "Login successful!" : "Registration successful!");
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="account-container">
      <div className="form-container">
        <div className={isLogin ? "login-form active" : "register-form active"}>
          <h2>{isLogin ? "Login" : "Register"}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : isLogin ? "Login" : "Register"}
            </button>
          </form>
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span onClick={toggleForm}>{isLogin ? "Register" : "Login"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Account;
