import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
} from '@mui/material'
import { handleError } from '../utils/handleError'
import { getProfile, updateProfile } from '../api/api-routes'

interface User {
  name: string
  email: string
  country: string
  city: string
  phoneNumber: string
}

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const currentUser = JSON.parse(localStorage.getItem('user') || '')
  console.log('currentUser', currentUser)
  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = currentUser.id
        const userData = await getProfile(userId)
        setUser(userData)
      } catch (error) {
        handleError(error, setErrorMessage)
      } finally {
        setLoading(false)
      }
    }
    if (currentUser?.id) {
      fetchUserProfile()
    } else {
      alert('unvalid user')
    }
  }, [])

  // Formik for handling form state
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
        const userId = currentUser.id 
        await updateProfile(userId, values)
        setErrorMessage(null)
        alert('Profile updated successfully')
      } catch (error) {
        handleError(error, setErrorMessage)
      }
    },
  })

  if (loading) {
    return <CircularProgress />
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
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
        <Button color="primary" variant="contained" fullWidth type="submit">
          Update Profile
        </Button>
      </form>
    </Container>
  )
}

export default Profile

// import React, { FC } from 'react'
// import { User } from '../types/user'

// interface ProfileProps {
//   user?: User;
// }

// const Profile: FC<ProfileProps> = ({ user }) => (
//   <div>
//     <h1>Profile Component</h1>
//     <h2>
//       email:
//       {user?.email}
//     </h2>
//   </div>
// );

// export default Profile
