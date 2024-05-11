/* eslint-disable @typescript-eslint/prefer-for-of */
import React from 'react'
import { auth } from '~/auth';
import { db } from '~/server/db';
import { v4 as uuidv4 } from 'uuid';
import useState from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReactHtmlParse from 'html-react-parser';

const page = async() => {
  let allposts = [];
  const session = auth()
  const user = session?.user;
  const allLikedPosts = await db.query.likes.findMany({
    where: (allLikedPosts, {eq}) => (user?.id ? eq(allLikedPosts?.userId, user.id) : undefined)
  });

  for (let index = 0; index < allLikedPosts.length; index++) {
    const postid = allLikedPosts[index]?.postId;
    const this_post = await db.query.posts.findFirst({
      orderBy: (model, {desc}) => desc(model?.createdAt),
      where: (allposts, {eq}) => (allposts?.id ? eq(allposts?.id, postid) : undefined)
    });
    allposts.push(this_post)
    console.log(allposts);
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
                </h1>
                <div className="body-post">{ReactHtmlParse(post.htmlContent)}</div>
              </div>              
            </div>
            <div className='flex px-2 gap-4 w-full'>
              {/* <button onClick={() => handle_likes(post)}>
                <FavoriteBorderIcon id={post?.id} key={uuidv4()}
                className={allLikedPosts?.some(x => x.postId === post?.id) ? 'text-red-600' : "text-white"} />
              </button> */}
              <div className='ml-auto text-xs font-thin italic'>~{post.createdAt.toString().slice(0, 15)}</div>
            </div> 
          </div>            
        ))
      }      
    </div>
  )
}

export default page