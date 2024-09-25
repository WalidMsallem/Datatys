import axios from 'axios'
import apiRoutes from './routes'  

export const login = async (credentials: {
  emailOrName: string
  password: string
}) => {
  try {
    const response = await axios.post(apiRoutes.login, credentials)
    return response.data
  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message)
    throw error
  }
}

export const getProfile = async (userId: string) => {
  try {
    const response = await axios.get(apiRoutes.getProfile(userId))
    return response.data
  } catch (error: any) {
    console.error(
      'Error fetching profile:',
      error.response?.data || error.message
    )
    throw error
  }
}

export const updateProfile = async (userId: number, profileData: any) => {
  try {
    const response = await axios.put(apiRoutes.updateProfile, {
      ...profileData,
      id: userId,
    })
    return response.data
  } catch (error: any) {
    console.error(
      'Error updating profile:',
      error.response?.data || error.message
    )
    throw error
  }
}

export const uploadProfilePicture = async (userId: number, formData: FormData) => {
    try {
      const response = await axios.post(apiRoutes.uploadProfilePicture(userId), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error uploading profile picture:', error.response?.data || error.message);
      throw error;
    }
  };