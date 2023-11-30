import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import authService from '../services/authService';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user', 'userDetails']);
  const [remember, setRemember] = useState(false);

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

  const handleRememberChange = (event) => {
    setRemember(event.target.checked);
  }

  const handleLogin = (event) => {
    event.preventDefault();
    setModalTitle('');
    setModalContent('');
    try {
      const user = authService.login(email, password);
      const expires = remember ? 30 : 1;
      setTimeout(() => {
        setCookie('user', 'user details', { path: '/', expires: new Date(Date.now() + 86400 * 1000 * expires) });
        navigate('/');
      }, 300);
    }
    catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          setModalTitle('Missing Credentials');
          setModalContent('Email and password are required.');
        } else if (status === 401) {
          setModalTitle('Authentication Failed');
          setModalContent('Email or password is not correct.');
        } else if (status === 404) {
          setModalTitle('Not Found');
          setModalContent('The requested resource was not found.');
        } else {
          setModalTitle('Error');
          setModalContent('An unexpected error occurred.');
        }
      } else {
        setModalTitle('Network Error');
        setModalContent('Unable to connect to the server.');
      }
      setIsModalOpen(true);
    }
  };

  const handleResetEmailChange = (event) => {
    setResetEmail(event.target.value);
  };

  const handleForgotPasswordClick = (event) => {
    event.preventDefault();
    setShowForgotPassword(true);
    setModalTitle('Forgot Password');
    setModalContent('');
    setIsModalOpen(true);
  };

  const handleRequestReset = () => {
    const user = fakeUsersDB.find(u => u.email === resetEmail);
    if (user) {
      setModalTitle('Success');
      setModalContent('A link to reset your password has been sent to your email.');
    } else {
      setModalTitle('Error');
      setModalContent('No account found with that email address.');
    }
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
            <a href="#forgot-password" className="forgot-password-link" onClick={handleForgotPasswordClick}>forgot password</a>
          </div>

          {isModalOpen && (
            <div className="modal-backdrop">
              <div className="modal">
                {loginStatus ? (
                  <>
                    <h2>{modalTitle}</h2>
                    <p>{modalContent}</p>
                  </>
                ) : (
                  <>
                    <h2>{modalTitle}</h2>
                    <p>{modalContent}</p>
                    <button onClick={toggleModal}>Close</button>
                  </>
                )
                }
              </div>
            </div>
          )}

          {isModalOpen && (
            <div className="modal-backdrop">
              <div className="modal">
                <h2>{modalTitle}</h2>
                {showForgotPassword ? (
                  <>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={resetEmail}
                      onChange={handleResetEmailChange}
                      required
                    />
                    <button onClick={handleRequestReset}>Send Reset Email</button>
                  </>
                ) : (
                  <p>{modalContent}</p>
                )}
                <button onClick={() => {
                  setIsModalOpen(false);
                  setShowForgotPassword(false);
                }}>Close</button>
              </div>
            </div>
          )}
          <div className="remember">
            <input 
              type="checkbox" 
              id="remember"
              checked={remember}
              onChange={handleRememberChange}
            />
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