import React, { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiRoutes from '../api/routes';   
import {handleError} from '../utils/handleError';   

const LoginForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);  
  const navigate = useNavigate();   

  const formik = useFormik({
    initialValues: {
      emailOrName: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(apiRoutes.login, values);  
        console.log('Login successful:', response.data);
        localStorage.setItem('user', JSON.stringify(response.data.user ));  
        setErrorMessage(null);  // Clear any existing error message
        navigate('/profile');  // Redirect to profile after successful login
      } catch (error: any) {
        handleError(error, setErrorMessage);  // Use the reusable error handler to set error state
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}  {/* Display error message if present */}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="emailOrName"
          name="emailOrName"
          label="Email or Name"
          value={formik.values.emailOrName}
          onChange={formik.handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          margin="normal"
          required
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
