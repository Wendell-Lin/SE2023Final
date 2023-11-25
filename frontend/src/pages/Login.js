import React, { useState, useEffect } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  const fakeUsersDB = [
    {
      email: 'admin@ntu.edu.tw',
      password: '123',
      name: 'admin'
    }
  ];

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const user = fakeUsersDB.find(u => u.email === email);
    if (!user) {
      setModalTitle('Oops');
      setModalContent('The email address you entered does not exist.');
      setIsModalOpen(true);
    }
    else if (user.password !== password) {
      setModalTitle('Oops');
      setModalContent('The password you entered is incorrect.');
      setIsModalOpen(true);
    }
    else {
      setModalTitle('Welcome');
      setModalContent(`Hello, ${user.name}!`);
    }
  };

  const handleForgotPassword = () => {
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Welcome back!</h1>
        <h2>Enter your Credentials to access your account</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email address</label>
          <input 
          type="email" 
          id="email" 
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required 
          />
          
          <div className="password-container">
            <label htmlFor="password">Password</label>
            <input 
            type="password" 
            id="password" 
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required 
            />
            <a href="#forgot-password" className="forgot-password-link" onClick={handleForgotPassword}>forgot password</a>
          </div>

          {isModalOpen && (
            <div className="modal-backdrop">
              <div className="modal">
                <h2>{modalTitle}</h2>
                <p>{modalContent}</p>
                <button onClick={toggleModal}>Close</button>
              </div>
            </div>
          )}
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