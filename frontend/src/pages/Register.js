import React, { useState, useEffect } from 'react';
import marked from 'marked';
import './Register.css';

function Register() {
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsContent, setTermsContent] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailValid(
      /^[\w-.]+@ntu\.edu\.tw$/i.test(event.target.value)
    );
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (!emailValid) {
      showErrorModal('Please enter a valid NTU email address.');
      return;
    }

    if (!isTermsChecked) {
      showErrorModal('Please agree to the terms & policy');
      return;
    }
  };

  const handleCheckboxChange = (event) => {
    setIsTermsChecked(event.target.checked);
  };

  const handleTermsLinkClick = (event) => {
    event.preventDefault();
    toggleModal();
  };

  const showErrorModal = (message) => {
    setError(message);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Get Started Now</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" required />
          
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
          <input type="password" id="password" placeholder="Password" required />
          
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
          {error && (
            <div className="modal-backdrop">
              <div className="modal">
                <h2>{error}</h2>
                <button onClick={() => setError('')}>Close</button>
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