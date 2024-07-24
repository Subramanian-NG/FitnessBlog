import React from 'react'
import SignIn from './signin'
import { auth } from '@/auth'

const AuthPage: React.FC = async () => {
  const session = await auth();
  return (
    <div className="auth-page container mx-auto p-4 flex justify-center items-center min-h-screen bg-gray-100">
      <SignIn />
    </div>
  )
}

export default AuthPage




