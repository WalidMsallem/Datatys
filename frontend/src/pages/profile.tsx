import React from 'react'
import MainLayout from '../components/main-layout'
import Profile from '../components/profile'

function ProfilePage() {
  return (
    <MainLayout>
      <Profile user={{
            id: 1,
            name: "string",
            email: "string",
            country: "string",
            city: "string",
            phoneNumber: "string",
            profilePictureUrl: "string",
      }}   />
    </MainLayout>
  )
}

export default ProfilePage
