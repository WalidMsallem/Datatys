import React, { FC } from 'react'
import { User } from '../types/user'

interface ProfileProps {
  user?: User;
}


const Profile: FC<ProfileProps> = ({ user }) => (
  <div>
    <h1>Profile Component</h1>
    <h2>
      email:
      {user?.email}
    </h2>
  </div>
);
 

export default Profile
