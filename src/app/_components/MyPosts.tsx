/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client'

import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import ReactHtmlParse from 'html-react-parser';
import { deletePostFromUser, likePost } from '../lib/actions';
import { useRouter } from 'next/navigation';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const dynamic = 'force-dynamic';

const MyPosts = ({posts}) => {
  const router = useRouter()
  const handle_likes = async(post) => {
    await likePost(post);
    console.log('lol');
  }
  const handle_delete = async(post) => {
   await deletePostFromUser(post); 
   console.log('deleted: ', post.id);
    // router.push("/my-posts");
    router.refresh()
  }
  return (
  <div className='w-96 lg:w-full mx-auto'>
    {
      posts.length > 0 ? posts.map(post => (
        <div key={uuidv4()} className='mb-10'>
          <div className='each-post mb-2'>
            <div className='w-full'>
              <h1 className='heading-post flex'><span>{post.title}</span>
                <div className='text-sm my-auto'>
                  <div className='cursor-pointer hover:text-red-600 h-max' onClick={() => handle_delete(post)}>Delete</div>
                </div>
              </h1>
              <div className='body-post'>{ReactHtmlParse(post.htmlContent)}</div>
            </div>
          </div>
          <div className='flex px-2 gap-4 w-full'>
            {/* <button onClick={() => handle_likes(post)}><FavoriteBorderIcon /></button> */}
            <div className='ml-auto text-xs font-thin italic'>~{post.createdAt.toString().slice(0, 15)}</div>
          </div> 
        </div>        
      )) : "No posts yet."
    }
  </div>
  )
}

export default MyPosts