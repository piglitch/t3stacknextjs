import React from 'react'
import { auth } from '~/auth'
import { db } from '~/server/db';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import ReactHtmlParse from 'html-react-parser';

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
          <div>
            {
              posts ? posts.map(post => (
                <div key={uuidv4()} className='each-post'>
                  <div className='w-full'>
                    <h1 className='heading-post flex'><span>{post.title}</span>
                      <div className='text-sm flex gap-2'>
                        <div>Edit</div>
                        <div>Delete</div>
                      </div>
                    </h1>
                    <div className='body-post'>{ReactHtmlParse(post.htmlContent)}</div>
                  </div>
                </div>
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