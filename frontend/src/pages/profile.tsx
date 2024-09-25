import React, { useEffect, useState } from 'react'
import MainLayout from '../components/main-layout'
import Profile from '../components/profile'
import AvatarUpload from '../components/avatar-upload'
import { handleError } from '../utils/handleError'
import { getProfile } from '../api/api-routes'
import { User } from '../types/user'
import { CircularProgress } from '@mui/material'

function ProfilePage() {
  const [loadingUser, setLoadingUser] = useState(true)
  // const [fetchUserErrorMessage, setErrorMessage] = useState<string | null>(null)
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
        <>
          <AvatarUpload user={user} />
          <Profile user={user} />
        </>
      )}
    </MainLayout>
  )
}

export default ProfilePage
