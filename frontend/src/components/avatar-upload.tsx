import React, { useState } from 'react'
import { Avatar, Box, CircularProgress, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { uploadProfilePicture } from '../api/api-routes'
import { User } from '../types/user'
import Toast from './toast'

const Input = styled('input')({
  display: 'none',
})
interface AvatarUploadProps {
  user?: User
}

const BE_BASE_URL = process.env.BE_BASE_URL || 'http://localhost:3000'

const AvatarUpload: React.FC<AvatarUploadProps> = ({ user }) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(
    user?.profilePicture ?? null
  )
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  })

  const handleToastClose = () => {
    setToast({ ...toast, open: false })
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        setLoading(true)
        const response = await uploadProfilePicture(user!.id, formData)
        setLoading(false)
        setTimeout(() => {
          setToast({
            open: true,
            message: 'Profile picture updated successfully!',
            severity: 'success',
          })
        }, 500)
        setProfilePicture(response.fileName)
      } catch (error) {
        console.error('Error uploading profile picture:', error)
        setTimeout(() => {
          setToast({
            open: true,
            message: 'Error uploading profile picture',
            severity: 'error',
          })
        }, 500)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
      <Typography variant="h6" gutterBottom>
        Profile Picture
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <label htmlFor="profile-picture-upload">
          <Input
            accept="image/*"
            id="profile-picture-upload"
            type="file"
            onChange={handleFileChange}
          />
          <Avatar
            src={
              profilePicture
                ? `${BE_BASE_URL}/profile-pictures/${profilePicture}`
                : ''
            }
            alt="Profile Picture"
            sx={{
              cursor: 'pointer',
              width: { xs: 120, sm: 150 }, // Adjust avatar size for mobile and desktop
              height: { xs: 120, sm: 150 },
              marginBottom: 2,
            }}
          />
        </label>
      )}

      <Typography variant="body2" color="textSecondary">
        Click on the avatar to upload a new profile picture.
      </Typography>

      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleToastClose}
      />
    </Box>
  )
}

export default AvatarUpload
