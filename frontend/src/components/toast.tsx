import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ToastProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  duration?: number;   
  onClose: () => void;  
}

const Toast: React.FC<ToastProps> = ({ open, message, severity, duration = 3000, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
