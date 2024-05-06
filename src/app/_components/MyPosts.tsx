'use client'

import React from 'react'
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import ReactHtmlParse from 'html-react-parser';

const MyPosts = ({posts}) => {
  const editPost = () => {
    console.log('edited');
  }
  return (
    <div>
    {
      posts ? posts.map(post => (
        <div key={uuidv4()} className='each-post'>
          <div className='w-full'>
            <h1 className='heading-post flex'><span>{post.title}</span>
              <div className='text-sm flex gap-2'>
                <div onClick={() => editPost()}>Edit</div>
                <div>Delete</div>
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