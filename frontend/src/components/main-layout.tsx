import React, { ReactNode } from 'react'
import { AppBar, Toolbar, Typography, Container } from '@mui/material'
import LogoutButton from './logout-button'  

interface LayoutProps {
  children: ReactNode
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#153376' }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: { xs: '0 16px', sm: '0 24px' }, 
          }}
        >
          <Typography variant="h6" component="div" sx={{ color: '#fff' }}>
            Datatys – Coding Test
          </Typography>
          <LogoutButton />
        </Toolbar>
      </AppBar>

      <Container>{children}</Container>
    </>
  )
}

export default MainLayout
