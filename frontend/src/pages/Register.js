import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Register.css';

function Register() {
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsContent, setTermsContent] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [succeedMsg, setSucceedMsg] = useState('');
  const [succeedTitle, setSucceedTitle] = useState('');
  const [succeedSpan, setSucceedSpan] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailValid(
      /^[\w-.]+@ntu\.edu\.tw$/i.test(event.target.value)
    );
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  useEffect(() => {
    if (isModalOpen) {
      fetch('/agreement.txt')
        .then((response) => response.text())
        .then((text) => {
          setTermsContent(text);
        })
        .catch((error) => {
          console.error('Error fetching terms:', error);
          setTermsContent('Failed to load terms and conditions.');
        });
    }
  }, [isModalOpen]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (!emailValid) {
      showErrorModal('Oops', 'Please enter a valid NTU email address.');
      return;
    }

    if (!isTermsChecked) {
      showErrorModal('Oops', 'Please agree to the terms & policy');
      return;
    }

    try {
      const data = await authService.register(name, email, password, ['user']);
      showSucceedModal('Registration Successful', data.message, "Proceed to Login");
      navigate('/login');
    } catch (error) {
      let title = 'Error';
      let content = 'An unexpected error occurred.';
      
      if (error.response && error.response.status === 400) {
        title = 'Registration Failed';
        content = error.response.data.message || 'Email or Username already exists.';
      }
      setErrorTitle(title);
      setErrorMsg(content);
    }
  };

  const handleCheckboxChange = (event) => {
    setIsTermsChecked(event.target.checked);
  };

  const handleTermsLinkClick = (event) => {
    event.preventDefault();
    toggleModal();
  };

  const showErrorModal = (title, message) => {
    setErrorTitle(title);
    setErrorMsg(message);
  };

  const showSucceedModal = (title, message, span) => {
    setSucceedTitle(title);
    setSucceedMsg(message);
    setSucceedSpan(span);
  }

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Get Started Now</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            placeholder="Enter your name" 
            value={name}
            onChange={handleNameChange}
            required 
          />
          <label htmlFor="email">Email address</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Enter your NTU email" 
            value={email} 
            onChange={handleEmailChange}
            required 
          />
          
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            id="password" 
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required 
          />
          
          <div className="terms-and-policy">
          <input 
            type="checkbox" 
            id="terms" 
            onChange={handleCheckboxChange} 
            checked={isTermsChecked}
          />
          <label htmlFor="terms" className="custom-checkbox"></label>
          <span>I agree to the <span onClick={handleTermsLinkClick} className="terms-link">terms & policy</span></span>
          </div>
          {isModalOpen && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>免責條款</h2>
              <div className="terms-content" dangerouslySetInnerHTML={{ __html: termsContent }} />
              <button onClick={toggleModal}>Close</button>
            </div>
          </div>
          )}
          {errorMsg && (
            <div className="modal-backdrop">
              <div className="modal">
                <h2>{errorTitle}!</h2>
                <p>{errorMsg}</p>
                <button onClick={() => showErrorModal('', '')}>Close</button>
              </div>
            </div>
          )}
          {succeedMsg && (
            <div className="modal-backdrop">
              <div className="modal">
                <h2>{succeedTitle}</h2>
                <p>{succeedMsg}<span className="resend-link">{succeedSpan}</span></p>
                <button onClick={() => setTimeout(() => {navigate('/')}, 100)}>Close</button>
              </div>
            </div>
          )}
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