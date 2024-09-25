import React from 'react'
import Profile from '../components/profile'

function ProfilePage() {
  return (
    <div className="container">
      <Profile user={{
            id: 1,
            name: "string",
            email: "string",
            country: "string",
            city: "string",
            phoneNumber: "string",
            profilePictureUrl: "string",
      }}   />
    </div>
  )
}

export default ProfilePage
