import React from 'react';
import './Home.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>SHARE YOUR FOOD</h1>
        <h1>WITH NEIGHBORS IN NEED</h1>
        <h2>Join our community effort to minimize food waste</h2>
        <h2>and maximize community support.</h2>
        <div className="hero-buttons">
          <button onClick={() => setTimeout(() => {navigate('/viewitems')}, 100)}>Find Food Near You</button>
          <button onClick={() => setTimeout(() => {navigate('/uploaditems')}, 100)}>List Your Surplus</button>
        </div>
      </div>
      <div className="hero-image">
        <img src="/images/hero-section.png" alt="Decorative" />
      </div>
    </div>
  );
};

export default Home;