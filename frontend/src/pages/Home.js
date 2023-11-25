import React, { useEffect } from 'react';
import './Home.css';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const isLoggedIn = !!cookies.user;
  useEffect(() => {
    if (cookies.user) {
      const userCookie = cookies.user;
      const expires = new Date(userCookie.expires);
      const now = new Date();
      if (now > expires) {
        removeCookie('user', { path: '/' });
        isLoggedIn = false;
        navigate('/login');
      }
    }
  }, [cookies, removeCookie]);

  return (
    <div className="hero">
      <div className="hero-text">
        <h1>SHARE YOUR FOOD</h1>
        <h1>WITH NEIGHBORS IN NEED</h1>
        <h2>Join our community effort to minimize food waste</h2>
        <h2>and maximize community support.</h2>
        <div className="hero-buttons">
          {isLoggedIn ? (
            <>
              <button onClick={() => setTimeout(() => {navigate('/viewitems')}, 100)}>Find Food Near You</button>
              <button onClick={() => setTimeout(() => {navigate('/uploaditems')}, 100)}>List Your Surplus</button>
            </>
          ) : (
            <>
              <button onClick={() => setTimeout(() => {navigate('/login')}, 100)}>Login to Find Food</button>
              <button onClick={() => setTimeout(() => {navigate('/register')}, 100)}>Register to List Your Surplus</button>
            </>
          )
          } 
        </div>
      </div>
      <div className="hero-image">
        <img src="/images/hero-section.png" alt="Decorative" />
      </div>
    </div>
  );
};

export default Home;