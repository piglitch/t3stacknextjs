/* eslint-disable @typescript-eslint/prefer-for-of */
import React from 'react'
import { auth } from '~/auth';
import { db } from '~/server/db';
import { v4 as uuidv4 } from 'uuid';
import useState from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReactHtmlParse from 'html-react-parser';
import LikedPosts from '../_components/likedPosts';

const page = async() => {
  let allposts = [];
  const session = auth()
  const user = session?.user;
  const users = await db.query.users.findMany();
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
    <div className="w-80 md:w-2/3 mx-auto">
      <LikedPosts allposts={allposts} users={users} allLikedPosts={allLikedPosts} />
    </div>
  )
}

export default page