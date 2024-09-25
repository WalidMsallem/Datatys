import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const LogoutButton: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')  
    navigate('/login')  
  }

  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      sx={{
        bgcolor: '#4D4F5C',
        color: '#fff',
        padding: '6px 12px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
          bgcolor: '#6A6C75',
        },
      }}
    >
      <ExitToAppIcon sx={{ marginRight: '8px' }} />
      Logout
    </Button>
  )
}

export default LogoutButton
