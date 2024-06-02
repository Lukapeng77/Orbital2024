
import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Placeholder for authentication check
  return !!localStorage.getItem('userToken');
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;


