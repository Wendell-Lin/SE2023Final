import React from "react";
import { Link, useLocation } from "react-router-dom";
import CustomLink from "./Customlink";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(['username']);
  const isLoggedIn = !!cookies.username;
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  const logout = () => {
    removeCookie('username', { path: '/' });
    navigate("/");
  };

  if (hideNavbar) {
    return null;
  }

  return (
    <nav className="nav">
      <Link to="/" className="site-title">FeastForward</Link>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/viewitems">View Items</CustomLink>
        <CustomLink to="/uploaditems">Upload Items</CustomLink>
        {isLoggedIn ? (
          <>
            <CustomLink to="/profile">Profile</CustomLink>
            <Link to="/" onClick={logout}>Logout</Link>
          </>
        ) : (
          <>
            <CustomLink to="/login">Login</CustomLink>
            <CustomLink to="/register">Register</CustomLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;