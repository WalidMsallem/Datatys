import axios from 'axios';
import apiRoutes from './routes';  // Import your routes

export const login = async (credentials: { emailOrName: string, password: string }) => {
  try {
    const response = await axios.post(apiRoutes.login, credentials);
    console.log('Login successful:', response.data);
    return response.data;
  } catch (error:any) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const getProfile = async (userId: string) => {
  try {
    const response = await axios.get(apiRoutes.getProfile(userId));
    return response.data;
  } catch (error:any) {
    console.error('Error fetching profile:', error.response?.data || error.message);
    throw  error;
  }
};
