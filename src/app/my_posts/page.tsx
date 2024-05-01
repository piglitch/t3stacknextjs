import React from 'react'
import { auth } from '~/auth'
import { db } from '~/server/db';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

const Page = async() => {
  const session = await auth();
  console.log("route1", session);
  const user = session?.user;
  const images = await db.query.posts.findMany({
    where: (posts, {eq}) => (user?.id ? eq(posts?.userId, user.id) : undefined),
  });
  
  return (
    <div>
      {
        session?.user ? (
          <div>
            {
              images ? images.map(image => (
                <div key={uuidv4()}><Image src={image?.url} alt="posts" height={80} width={480} /></div>
              )) : "No posts yet."
            }
          </div>
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