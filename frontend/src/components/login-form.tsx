import React, { useState } from 'react'
import { useFormik } from 'formik'
import { TextField, Button,   Typography, Alert, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import apiRoutes from '../api/routes'
import { handleError } from '../utils/handleError'

const LoginForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      emailOrName: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(apiRoutes.login, values)
        console.log('Login successful:', response.data)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        setErrorMessage(null)  
        navigate('/profile')  
      } catch (error: any) {
        handleError(error, setErrorMessage)  
      }
    },
  })

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"  
    >
      <Box
        sx={{
          width: { xs: '90%', sm: '400px' },  
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Login
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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
          <Button color="primary" variant="contained" fullWidth type="submit" 
             sx={{
                bgcolor: '##153376',
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default LoginForm
