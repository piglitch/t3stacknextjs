'use client'

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
// import { getServerSession } from 'next-auth/next';

function SignInPage() {
  const { data: session, status } = useSession();
  console.log(session);

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === 'authenticated') {
    return (
      <div className='flex gap-2'>
        <img src={session?.user?.image} alt="image" width={40} height={40} className='rounded-full'/>
        <button onClick={() => signOut()}><span className='bg-red-500 px-1 rounded-lg bg-opacity-50'><LogoutIcon fontSize='small' /></span></button>
      </div> 
    )  
  }
  const handleSignIn = async () => {
    await signIn();
  }
  return <button onClick={() => handleSignIn()}>Sign In</button>
}

export default SignInPage;