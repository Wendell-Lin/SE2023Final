import React from 'react';
import './Login.css';

function Login() {
  const handleLogin = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Welcome back!</h1>
        <p>Enter your Credentials to access your account</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Enter your email" required />
          
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" required />
          
          <div className="remember">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" className="custom-checkbox"></label>
            <label htmlFor="terms">Remember for 30 days</label>
          </div>
          
          <button type="submit">Login</button>
        </form>
        <div className="login-footer">
          Don’t have an account? <a href="/register">Sign Up</a>
        </div>
      </div>
      <div className="login-image">
        <img src="/images/log-decorative.png" alt="Decorative" />
      </div>
    </div>
  );
}

export default Login;