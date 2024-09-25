const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000'; 

const apiRoutes = {
  login: `${BASE_URL}/user/login`,
  getProfile: (userId: string) => `${BASE_URL}/user/profile/${userId}`,
  updateProfile: `${BASE_URL}/user/update`,
  uploadProfilePicture:(userId:number)=> `${BASE_URL}/user/${userId}/upload-profile-picture`,
};

export default apiRoutes;
