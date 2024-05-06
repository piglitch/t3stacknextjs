import React from 'react'
import { auth } from '~/auth'
import { db } from '~/server/db';
import MyPosts from '../_components/MyPosts';

const Page = async() => {
  const session = await auth();
  console.log("route1", session);
  const user = session?.user;
  const posts = await db.query.posts.findMany({
    where: (posts, {eq}) => (user?.id ? eq(posts?.userId, user.id) : undefined),
  });
  
  return (
    <div className='max-w-5xl min-w-96 mx-auto'>
      {
        session?.user ? (
          <MyPosts posts={posts} />
        ) : (
          <div>
            You are not signed in.
          </div>
        )
      }
    </div>  
  )
}

export default Page