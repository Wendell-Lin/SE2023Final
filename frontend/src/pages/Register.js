import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [isTermsChecked, setIsTermsChecked] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (!isTermsChecked) {
      alert('Please agree to the terms & policy');
      return;
    }
  };

  const handleCheckboxChange = (event) => {
    setIsTermsChecked(event.target.checked);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Get Started Now</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" required />
          
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Enter your email" required />
          
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" required />
          
          <div className="terms-and-policy">
          <input 
            type="checkbox" 
            id="terms" 
            onChange={handleCheckboxChange} 
            checked={isTermsChecked}
          />
          <label htmlFor="terms" className="custom-checkbox"></label>
          <label htmlFor="terms">I agree to the terms & policy</label>
          </div>
          <button type="submit">Sign up</button>
        </form>
        <div className="signin-redirect">
          Have an account? <a href="/login">Sign In</a>
        </div>
      </div>
      <div className="register-image">
        <img src="/images/log-decorative.png" alt="Decorative" />
      </div>
    </div>
  );
}

export default Register;