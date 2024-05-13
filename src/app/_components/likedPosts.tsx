'use client'

import React from 'react'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReactHtmlParse from 'html-react-parser';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { likePost, unlikePost } from '../lib/actions';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
const LikedPosts = ({allposts, users, allLikedPosts}) => {
  // Like logic
  const session = useSession();  
  const router = useRouter()
  const handle_likes = async(post: Post) => {
    if (session.status !== 'authenticated') {
      router.push('/api/auth/signin');
      return;
    }
    const currLikeButton = document.getElementById(post.id);
    const likes_div = document.getElementById(`like_div${post.id}`)
    if (currLikeButton === null || likes_div === null) {
      return 'no button';
    }
    if (currLikeButton.style.color === 'white') {
      currLikeButton.style.color = 'red';
      likes_div.innerHTML = Number(likes_div.innerHTML) + 1
      await likePost(post);
      console.log(likes_div.innerHTML);
    } else{
      currLikeButton.style.color = 'white';
      if (Number(likes_div.innerHTML) - 1 === 0) {
        likes_div.innerHTML = '';
        await unlikePost(post);
        return '0 likes';
      }
      likes_div.innerHTML = Number(likes_div.innerHTML) - 1;     
      await unlikePost(post);
    }
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
                    curr_user => curr_user.id === post.userId? 
                    <Link key={uuidv4()} href={`/profile/${encodeURIComponent(curr_user.id)}`}>
                     <img key={uuidv4()} 
                      onClick={() => router.push(`${curr_user.id}`)}
                      src={curr_user.image} alt="profile_pic" 
                      width={30} height={30} className='rounded-full'
                      />
                    </Link>
                    : ""
                    )}</span>
                  </div> 
                </h1>
                <div className="body-post">{ReactHtmlParse(post.htmlContent)}</div>
              </div>              
            </div>
            <div className='flex px-2 gap-4 w-full'>
                <div id={`like_div${post.id}`}>{post.numberoflikes > 0 ? post.numberoflikes : ''}</div>
                <button onClick={() => handle_likes(post)}>
                  <FavoriteBorderIcon id={post?.id} key={uuidv4()}
                  style={{ color: allLikedPosts?.some(x => x.postId === post?.id) ? 'red' : 'white' }} />
                </button>
              <div className='ml-auto text-xs font-thin italic'>~{post.createdAt.toString().slice(0, 15)}</div>
            </div>  
          </div>            
        ))
      }        
    </div>
  )
}

export default LikedPosts