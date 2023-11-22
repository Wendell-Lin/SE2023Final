import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [isTermsChecked, setIsTermsChecked] = useState(true);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailValid(
      /^[\w-\.]+@ntu\.edu\.tw$/i.test(event.target.value)
    );
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (!emailValid) {
      alert('Please enter a valid NTU email address.');
      return;
    }

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
          <label htmlFor="terms">I agree to the <span onClick={toggleModal} className="terms-link">terms & policy</span></label>
          </div>
          {isModalOpen && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>免責條款</h2>
              <p>歡迎來到 Feast Forward，我們的目標是通過分享剩餘食物來減少食物浪費。在使用我們的網站及其服務之前，請仔細閱讀以下免責條款：</p>
              <ul>
                <li>Feast Forward 提供一個平台，用於個人和組織之間贈與剩餘食物。請注意，我們不製造、儲存或直接處理這些食品。因此，我們無法保證贈與的食品符合特定的品質標準或衛生要求。我們強烈建議贈與者和接收者遵守當地食品安全與衛生法規。</li>
                <li>使用我們的網站即表示您同意遵守我們的使用條款，包括但不限於遵守所有適用的法律規範。</li>
                <li>對於通過我們的網站贈與或接收的食品所可能引起的任何健康問題或其他相關問題，Feast Forward 管理員概不負責。使用者應自行承擔所有風險。</li>
              </ul>
              <p>本免責條款可能會不定期更新。我們鼓勵您定期查看本條款，以保持對任何變更的了解。</p>
              <button onClick={toggleModal}>Close</button>
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