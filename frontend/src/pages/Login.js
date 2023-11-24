import React from 'react';
import './Login.css';

function Login() {
  const handleLogin = (event) => {
    event.preventDefault();
  };

  const handleForgotPassword = () => {
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Welcome back!</h1>
        <h2>Enter your Credentials to access your account</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Enter your email" required />
          
          <div className="password-container">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" required />
            <a href="#forgot-password" className="forgot-password-link" onClick={handleForgotPassword}>forgot password</a>
          </div>
          
          <div className="remember">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="custom-checkbox"></label>
            <label htmlFor="remember">Remember for 30 days</label>
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