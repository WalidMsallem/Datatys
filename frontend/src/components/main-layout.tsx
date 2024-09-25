import React,{ ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import LogoutButton from './logout-button';  // Import the logout button

interface LayoutProps {
    children: ReactNode;   
  }

const MainLayout: React.FC<LayoutProps>  = ({ children }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          Datatys – Coding Test
          </Typography>
          <LogoutButton />   
        </Toolbar>
      </AppBar>
      
      <Container>
        {children}   
      </Container>
    </div>
  );
};

export default MainLayout;
