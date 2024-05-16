'use client'

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
// import { getServerSession } from 'next-auth/next';

function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);

  if (status === "loading") {
    return <div>Loading...</div>
  }

  const handleSignOut = async () => {
    router.push('/');
    await signOut();  
  }
  if (status === 'authenticated') {
    return (
      <div className='flex gap-2'>
        <img src={session?.user?.image} alt="image" width={40} height={40} className='rounded-full'/>
        <button onClick={() => handleSignOut()}><span className='bg-red-500 px-1 rounded-lg bg-opacity-50'><LogoutIcon fontSize='small' /></span></button>
      </div> 
    )  
  }
  const handleSignIn = async () => {
    await signIn();
  }
  return <button onClick={() => handleSignIn()}>Sign In</button>
}

export default SignInPage;