/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client'

import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import ReactHtmlParse from 'html-react-parser';
import { deletePostFromUser } from '../lib/actions';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

const MyPosts = ({posts}) => {
  const router = useRouter()
  const editPost = () => {
    console.log('edited');
  }
  const handle_delete = async(post) =>{
   const deletePost = await deletePostFromUser(post); 
   console.log('deleted: ', post.id);
    // router.push("/my-posts");
    router.refresh()
  }
  return (
    <div>
    {
      posts ? posts.map(post => (
        <div key={uuidv4()} className='each-post'>
          <div className='w-full'>
            <h1 className='heading-post flex'><span>{post.title}</span>
              <div className='text-sm my-auto'>
                <div className='cursor-pointer hover:text-red-600 h-max' onClick={() => handle_delete(post)}>Delete</div>
              </div>
            </h1>
            <div className='body-post'>{ReactHtmlParse(post.htmlContent)}</div>
          </div>
        </div>
      )) : "No posts yet."
    }
  </div>
  )
}

export default MyPosts