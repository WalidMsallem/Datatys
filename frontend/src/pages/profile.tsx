import React, { useEffect, useState } from 'react'
import MainLayout from '../components/main-layout'
import AvatarUpload from '../components/avatar-upload'
import { handleError } from '../utils/handleError'
import { getProfile } from '../api/api-routes'
import { User } from '../types/user'
import { CircularProgress } from '@mui/material'
import ProfileForm from '../components/profile-form'
import { Box } from '@mui/system'

function ProfilePage() {
  const [loadingUser, setLoadingUser] = useState(true)
  const [user, setUser] = useState<User | undefined>(undefined)

  const currentUser = JSON.parse(localStorage.getItem('user') || '')
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = currentUser.id
        const userData = await getProfile(userId)
        setUser(userData)
      } catch (error) {
        handleError(error)
      } finally {
        setLoadingUser(false)
      }
    }
    if (currentUser?.id) {
      fetchUserProfile()
    } else {
      alert('unvalid user')
    }
  }, [])

  return (
    <MainLayout>
      {loadingUser ? (
        <CircularProgress />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Box
            sx={{
              width: { xs: '90%', sm: '600px' }, 
              p: 4,
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
          >
            <AvatarUpload user={user} />
            <ProfileForm user={user} />
          </Box>
        </Box>
      )}
    </MainLayout>
  )
}

export default ProfilePage
