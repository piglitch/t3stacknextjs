'use client'

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react'
// import { getServerSession } from 'next-auth/next';
import { auth } from '../../auth';
import Image from 'next/image';

function SignInPage() {
  const { data: session, status } = useSession();
  console.log(session);

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === 'authenticated') {
    return (
      <div>
        <img src={session?.user?.image} alt="image" width={40} height={40} className='rounded-full'/>
        <button onClick={() => signOut()}><span className='text-sm'>Sign Out</span></button>
      </div> 
    )  
  }
  const handleSignIn = async () => {
    await signIn("github", { callbackUrl: "/" });
  }
  return <button onClick={() => handleSignIn()}>Sign In</button>
}

export default SignInPage;