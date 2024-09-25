import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Button,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { uploadProfilePicture } from '../api/api-routes' // Import the upload function
import apiRoutes from '../api/routes'
import axios from 'axios'
import { User } from '../types/user'

const Input = styled('input')({
  display: 'none',
})

interface AvatarUploadProps {
  user?: User
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ user }) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(
    user?.profilePicture ?? null
  )
  const [loading, setLoading] = useState(false)

  console.log('user', user)
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        setLoading(true)
        const response = await uploadProfilePicture(user!.id, formData) // Use the API function here
        setLoading(false)
        // alert('Profile picture uploaded successfully!')
        setProfilePicture(response.fileName) // Preview the new image
      } catch (error) {
        console.error('Error uploading profile picture:', error)
        alert('Error uploading profile picture')
      } finally {
        setLoading(false)
      }
    }
  }
  return (
    <Box textAlign="center" mt={4}>
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
            src={profilePicture ? `http://localhost:3000/profile-pictures/${profilePicture}` : ''}
            alt="Profile Picture"
            sx={{ width: 120, height: 120, cursor: 'pointer' }}
          />
        </label>
      )}

      <Typography variant="body2" color="textSecondary">
        Click on the avatar to upload a new profile picture.
      </Typography>
    </Box>
  )
}

export default AvatarUpload
