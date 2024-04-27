
import { signIn } from 'next-auth/react';
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';



async function SignInPage() {
  const session = await getServerSession(options)
  console.log(session);
  return (
    <div>
      {
        session ? (
          <img src={session?.user?.image} alt="image" width={40} className='rounded-full'/>
        ) : (
          <button><a href="/auth/signin">Sign In</a></button>
        )
      }
    </div>
  )
}

export default SignInPage;