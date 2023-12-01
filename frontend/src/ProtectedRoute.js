import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies(['user', 'accessToken']);
  const location = useLocation();

  const isLoggedIn = () => {
    return cookies.user && cookies.accessToken;
  };

  return isLoggedIn() ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;