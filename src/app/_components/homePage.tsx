/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client'


import React, { useRef } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import ReactHtmlParse from 'html-react-parser';
import { v4 as uuidv4 } from 'uuid';
import { likePost } from '../lib/actions';
import { uuid } from 'drizzle-orm/pg-core';

const HomePage = ({allposts, users, user, allLikedPosts}) => {
  const like_button = useRef(null);
  const handle_likes = async(post) => {
    //like_button.current.style.color === 'red' ? 'white' : 'red';
    const like_Post = await likePost(post);
    console.log(post.id, allLikedPosts, allposts);
  }
  return (
    <div>
      {
        allposts.map((post) => (
          <div key={uuidv4()} className='mb-10'>
            <div className="each-post mb-1">
              <div className="w-full">
                <h1 className="heading-post">
                  <div>{post.title}</div>
                  <div className="text-sm font-bold text-white"> 
                    <span className="text-yellow-200"> {users.map(
                    curr_user => curr_user.id === post.userId? <img key={uuidv4()} 
                    src={curr_user.image} alt="profile_pic" 
                    width={30} height={30} className='rounded-full'
                    /> : ""
                    )}</span>
                  </div>  
                </h1>
                <div className="body-post">{ReactHtmlParse(post.htmlContent)}</div>
              </div>              
            </div>
            <div className='flex px-2 gap-4 w-full'>
              <button ref={like_button} onClick={() => handle_likes(post)}>
                <FavoriteBorderIcon 
                className={allLikedPosts.some(x => x.postId === post?.id) ? 'text-red-600' : "text-white"} />
              </button>
              <TurnedInNotIcon />
              <div className='ml-auto text-xs font-thin italic'>~{post.createdAt.toString().slice(0, 15)}</div>
            </div> 
          </div>            
        ))
      }      
    </div>
  )
}

export default HomePage