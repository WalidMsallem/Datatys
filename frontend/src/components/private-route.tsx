import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
