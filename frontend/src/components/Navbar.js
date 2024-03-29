import React from "react";
import { Link, useLocation } from "react-router-dom";
import CustomLink from "./Customlink";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const isLoggedIn = !!cookies.user;
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  const logout = () => {
    removeCookie('user', { path: '/' });
    removeCookie('username', { path: '/' });
    removeCookie('userEmail', { path: '/' });
    removeCookie('accessToken', { path: '/' });
    navigate("/");
  };

  const handleItemClick = (path) => (e) => {
    if (!isLoggedIn) {
        e.preventDefault();
        navigate('/');
    } else {
        navigate(path);
    }
  };

  if (hideNavbar) {
    return null;
  }

  return (
    <nav className="nav">
      <Link to="/" className="site-title">FeastForward</Link>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/viewitems" onLinkClick={handleItemClick('/viewitems')}>View Items</CustomLink>
        <CustomLink to="/uploaditems" onLinkClick={handleItemClick('/uploaditems')}>Upload Items</CustomLink>
        {isLoggedIn ? (
          <>
            <CustomLink to="/profile">Profile</CustomLink>
            <Link to="/" onClick={logout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="register-btn">Register</Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;