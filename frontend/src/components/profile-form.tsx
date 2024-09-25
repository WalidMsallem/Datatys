import React, { useState } from 'react'
import { useFormik } from 'formik'
import {
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material'
import { handleError } from '../utils/handleError'
import { updateProfile } from '../api/api-routes'
import { User } from '../types/user'
import Toast from './toast'

interface ProfileFormProps {
  user?: User
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  });

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      country: user?.country || '',
      city: user?.city || '',
      phoneNumber: user?.phoneNumber || '',
    },
    onSubmit: async (values) => {
      try {
        const userId = user!.id
        await updateProfile(userId, values)
        setErrorMessage(null)
        // alert('Profile updated successfully')
        setTimeout(() => {
          setToast({
            open: true,
            message: 'Profile updated successfully!',
            severity: 'success',
          });
        }, 500);
      } catch (error) {
        handleError(error, setErrorMessage)
      }
    },
  })

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          id="country"
          name="country"
          label="Country"
          value={formik.values.country}
          onChange={formik.handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          id="city"
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          margin="normal"
        />
        <Box textAlign="center" mt={2}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Update Profile
          </Button>
        </Box>
      </form>
      <Toast
          open={toast.open}
          message={toast.message}
          severity={toast.severity}
          onClose={handleToastClose}
        />
    </Box>
  )
}

export default ProfileForm
