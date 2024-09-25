import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');  // Clear user data from localStorage
    navigate('/login');  // Redirect to the login page
  };

  return (
    <Button onClick={handleLogout} color="secondary" variant="contained">
      Logout
    </Button>
  );
};

export default LogoutButton;
