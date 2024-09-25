import React from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';  // Import the logout icon
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');  // Clear user data from localStorage
    navigate('/login');  // Redirect to the login page
  };

  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      startIcon={<LogoutIcon />}  // Add the logout icon
      sx={{
        backgroundColor: '#FFFFFF',  // White background
        color: '#FF0000',  // Red text color
        border: '1px solid #FF0000',  // Red border
        '&:hover': {
          backgroundColor: '#FF0000',  // Red background on hover
          color: '#FFFFFF',  // White text on hover
        },
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
